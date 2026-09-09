/// <reference path="./plugin-runtime.d.ts" />
import { render } from 'preact';
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import {
  Trash2,
  Square,
  RefreshCw,
  Copy,
  Check,
  Eraser,
  Package,
  Component,
  Tag,
  Star,
} from 'lucide-preact';

async function shell(cmd: string): Promise<string> {
  const result = await $u.shell(cmd);
  return result.output.trim();
}

const FOCUS_RE = /mCurrentFocus=Window\{.*?\s+([^\s]+)\/([^\s]+)\}/;
const RESUMED_RE = /mResumedActivity: ActivityRecord\{.*?\s+([^\s]+)\/([^\s]+)\s.*?\}/;
const TOP_RE = /ACTIVITY ([^\s]+)\/([^/\s]+) \w+ pid=(\d+)/g;

function normalize(
  pkg: string,
  activity: string,
): {
  pkg: string;
  activity: string;
} {
  const a = activity.startsWith('.') ? `${pkg}${activity}` : activity;
  return { pkg, activity: a };
}

async function getCurrentApp(): Promise<{ pkg: string; activity: string }> {
  // 1. mCurrentFocus
  const windowOut = await shell('dumpsys window windows');
  const focusM = windowOut.match(FOCUS_RE);
  if (focusM) return normalize(focusM[1], focusM[2]);

  // 2. mResumedActivity: 获取当前前台包的包名
  let resumedPkg = '';
  const activitiesOut = await shell('dumpsys activity activities');
  const resumedM = activitiesOut.match(RESUMED_RE);
  if (resumedM) resumedPkg = resumedM[1];

  // 3. dumpsys activity top: 逐条匹配，命中包名即返回，否则取最后一条
  const topOut = await shell('dumpsys activity top');
  const matches = [...topOut.matchAll(TOP_RE)];
  for (const m of matches) {
    if (m[1] === resumedPkg) return normalize(m[1], m[2]);
  }
  const last = matches[matches.length - 1];
  if (last) return normalize(last[1], last[2]);
  return { pkg: '', activity: '' };
}

async function listLauncherActivities(pkg: string): Promise<string[]> {
  const out = await shell(
    `cmd package query-activities --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER ${pkg}`,
  );
  return out
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.includes('/') && !l.includes('='));
}

async function getAppVersion(pkg: string): Promise<{ name: string; code: string } | null> {
  const out = await shell(`dumpsys package ${pkg}`);
  const name = out.match(/versionName=([^\s]+)/);
  const code = out.match(/versionCode=(\d+)/);
  if (!name && !code) return null;
  return { name: name?.[1] ?? '', code: code?.[1] ?? '' };
}

async function doLaunch(component: string): Promise<string> {
  const r = await shell(`am start -n ${component}`);
  return r && r.toLowerCase().includes('error') ? `启动失败: ${r}` : '';
}

async function stopApp(pkg: string): Promise<string> {
  await shell(`am force-stop ${pkg}`);
  return '';
}

async function uninstallApp(pkg: string): Promise<string> {
  const out = await shell(`pm uninstall ${pkg}`);
  const msg = out || '(无输出)';
  return msg.toLowerCase().includes('success') || msg.includes('Success')
    ? `卸载成功: ${pkg}`
    : `卸载失败: ${msg}`;
}

async function clearDataApp(pkg: string): Promise<string> {
  const out = await shell(`pm clear ${pkg}`);
  const msg = out || '(无输出)';
  return msg.toLowerCase().includes('success') || msg.includes('Success') ? '' : `清空失败: ${msg}`;
}

function Button({
  children,
  onClick,
  disabled,
  danger,
  armed,
  ariaLabel,
}: {
  children: preact.ComponentChildren;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  armed?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      class={`inline-flex cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-white disabled:pointer-events-none disabled:opacity-40 ${
        armed
          ? danger
            ? 'bg-red-700 hover:bg-red-600'
            : 'bg-amber-500 hover:bg-amber-400'
          : danger
            ? 'bg-red-600 hover:bg-red-500'
            : 'bg-slate-900 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600'
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

function CopyButton({
  text,
  copied,
  onCopy,
}: {
  text: string;
  copied: boolean;
  onCopy: (text: string) => void;
}) {
  return (
    <button
      aria-label="复制"
      class="inline-flex shrink-0 cursor-pointer items-center rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      onClick={(e) => {
        e.stopPropagation();
        onCopy(text);
      }}
    >
      {copied ? <Check class="h-3.5 w-3.5 text-emerald-500" /> : <Copy class="h-3.5 w-3.5" />}
    </button>
  );
}

function SaveButton({
  saved,
  onToggle,
  filled,
}: {
  saved: boolean;
  onToggle: () => void;
  filled?: boolean;
}) {
  const showFilled = filled ?? saved;
  return (
    <button
      aria-label={saved ? '取消保存' : '保存'}
      class="inline-flex shrink-0 cursor-pointer items-center rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {showFilled ? (
        <Star class="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ) : (
        <Star class="h-3.5 w-3.5" />
      )}
    </button>
  );
}

const SAVED_KEY = 'current-app.savedActivities';

function loadSaved(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function App() {
  const [pkg, setPkg] = useState('');
  const [activity, setActivity] = useState('');
  const [version, setVersion] = useState<{ name: string; code: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [confirmUninstall, setConfirmUninstall] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [launchItems, setLaunchItems] = useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [copied, setCopied] = useState('');
  const [savedItems, setSavedItems] = useState<string[]>(loadSaved);
  const pollingRef = useRef(false);
  const lastPkgRef = useRef('');

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems));
    } catch {
      // ignore storage failures
    }
  }, [savedItems]);

  const toggleSave = useCallback((component: string) => {
    setSavedItems((prev) =>
      prev.includes(component) ? prev.filter((c) => c !== component) : [...prev, component],
    );
  }, []);

  const loadAppInfo = useCallback(async (p: string) => {
    const [items, ver] = await Promise.all([listLauncherActivities(p), getAppVersion(p)]);
    setLaunchItems(items);
    setVersion(ver);
  }, []);

  const pollOnce = useCallback(async (): Promise<string> => {
    const { pkg: p, activity: a } = await getCurrentApp();
    lastPkgRef.current = p;
    setPkg(p);
    setActivity(a);
    if (p) {
      await loadAppInfo(p);
    } else {
      setLaunchItems([]);
      setVersion(null);
    }
    return p;
  }, [loadAppInfo]);

  const refresh = useCallback(async () => {
    setBusy(true);
    setStatus('');
    try {
      const p = await pollOnce();
      if (!p) setStatus('未检测到前台应用');
    } catch (e) {
      setStatus(`检测失败: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  }, [pollOnce]);

  useEffect(() => {
    if (!autoRefresh) return;
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    const poll = async () => {
      if (pollingRef.current) return;
      pollingRef.current = true;
      try {
        const { pkg: p, activity: a } = await getCurrentApp();
        if (cancelled) return;
        setActivity(a);
        if (p === lastPkgRef.current) return;
        lastPkgRef.current = p;
        setPkg(p);
        if (p) {
          const items = await listLauncherActivities(p);
          const ver = await getAppVersion(p);
          if (cancelled) return;
          setLaunchItems(items);
          setVersion(ver);
        } else {
          setLaunchItems([]);
          setVersion(null);
        }
      } catch {
        // ignore transient failures during auto refresh
      } finally {
        pollingRef.current = false;
      }
    };

    poll();
    timer = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [autoRefresh]);

  useEffect(() => {
    if (!confirmClear) return;
    const t = window.setTimeout(() => setConfirmClear(false), 4000);
    return () => window.clearTimeout(t);
  }, [confirmClear]);

  useEffect(() => {
    if (!confirmUninstall) return;
    const t = window.setTimeout(() => setConfirmUninstall(false), 4000);
    return () => window.clearTimeout(t);
  }, [confirmUninstall]);

  const run = useCallback(
    async (fn: (p: string) => Promise<string>) => {
      if (!pkg) return;
      setBusy(true);
      setStatus('');
      try {
        setStatus(await fn(pkg));
      } catch (e) {
        setStatus(`操作失败: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setBusy(false);
        setConfirmUninstall(false);
        setConfirmClear(false);
      }
    },
    [pkg],
  );

  const launchItem = useCallback(async (component: string) => {
    setBusy(true);
    setStatus('');
    try {
      setStatus(await doLaunch(component));
    } catch (e) {
      setStatus(`操作失败: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  }, []);

  const noPkg = !pkg;

  const copyText = useCallback(async (text: string) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ok = document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (ok) {
      setCopied(text);
      window.setTimeout(() => setCopied(''), 1500);
    } else {
      setStatus('复制失败');
    }
  }, []);

  const handleStop = useCallback(() => {
    setConfirmUninstall(false);
    setConfirmClear(false);
    setAutoRefresh(false);
  }, []);

  return (
    <div>
      <div class="flex items-center gap-1">
        <div class="flex min-w-0 flex-1 items-center gap-1.5 break-all font-mono text-sm text-slate-800 dark:text-slate-100">
          <Package class="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <span>{pkg || '未检测到前台应用'}</span>
        </div>
        {pkg && <CopyButton text={pkg} copied={copied === pkg} onCopy={copyText} />}
      </div>

      {pkg && activity && (
        <div class="mt-1 flex items-center gap-1">
          <div class="flex min-w-0 flex-1 items-center gap-1.5 break-all font-mono text-xs text-slate-600 dark:text-slate-300">
            <Component class="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span>{activity}</span>
          </div>
          <CopyButton text={activity} copied={copied === activity} onCopy={copyText} />
        </div>
      )}

      {version && (
        <div class="mt-1 flex items-center gap-1">
          <div class="flex min-w-0 flex-1 items-center gap-1.5 break-all font-mono text-xs text-slate-600 dark:text-slate-300">
            <Tag class="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span>
              {version.name} ({version.code})
            </span>
          </div>
          <CopyButton
            text={`${version.name} (${version.code})`}
            copied={copied === `${version.name} (${version.code})`}
            onCopy={copyText}
          />
        </div>
      )}

      {launchItems.length > 0 && (
        <div class="mt-3">
          <div class="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            启动入口
            <span class="ml-1 font-normal text-slate-400 dark:text-slate-500">点击即可启动</span>
          </div>
          <ul class="space-y-1">
            {launchItems.map((component) => (
              <li key={component}>
                <div class="flex items-center gap-1">
                  <button
                    class="min-w-0 flex-1 cursor-pointer rounded-md bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    title={component}
                    onClick={() => {
                      handleStop();
                      launchItem(component);
                    }}
                    disabled={busy}
                  >
                    <span class="break-all">{component.slice(component.indexOf('/') + 1)}</span>
                  </button>
                  <SaveButton
                    filled={false}
                    saved={savedItems.includes(component)}
                    onToggle={() => toggleSave(component)}
                  />
                  <CopyButton text={component} copied={copied === component} onCopy={copyText} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div class="mt-4 mb-2 flex items-center justify-between">
        <div class="flex gap-2">
          <Button
            ariaLabel="强制停止应用"
            onClick={() => {
              handleStop();
              run(stopApp);
            }}
            disabled={busy || noPkg}
          >
            <Square class="h-4 w-4 fill-current" />
          </Button>
          <Button
            ariaLabel="卸载应用"
            danger
            armed={confirmUninstall}
            onClick={() => {
              setConfirmClear(false);
              setAutoRefresh(false);
              if (confirmUninstall) {
                setConfirmUninstall(false);
                run(uninstallApp);
              } else {
                setConfirmUninstall(true);
              }
            }}
            disabled={busy || noPkg}
          >
            <Trash2 class="h-4 w-4" />
            {confirmUninstall && '确认?'}
          </Button>
          <Button
            ariaLabel="清空应用数据"
            armed={confirmClear}
            onClick={() => {
              setConfirmUninstall(false);
              setAutoRefresh(false);
              if (confirmClear) {
                setConfirmClear(false);
                run(clearDataApp);
              } else {
                setConfirmClear(true);
              }
            }}
            disabled={busy || noPkg}
          >
            <Eraser class="h-4 w-4" />
            {confirmClear && '确认?'}
          </Button>
        </div>
        <button
          aria-label={autoRefresh ? '停止自动刷新' : '开启自动刷新并刷新'}
          class={`inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 disabled:opacity-50 ${
            autoRefresh
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
          onClick={() => {
            if (autoRefresh) {
              setAutoRefresh(false);
            } else {
              setAutoRefresh(true);
              refresh();
            }
          }}
          disabled={busy}
        >
          <RefreshCw
            class={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`}
            style={autoRefresh ? { animationDuration: '2s' } : undefined}
          />
        </button>
      </div>

      {savedItems.length > 0 && (
        <div class="mt-3">
          <div class="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            已保存
            <span class="ml-1 font-normal text-slate-400 dark:text-slate-500">点击即可启动</span>
          </div>
          <ul class="space-y-1">
            {savedItems.map((component) => (
              <li key={component}>
                <div class="flex items-center gap-1">
                  <button
                    class="min-w-0 flex-1 cursor-pointer rounded-md bg-amber-50 px-3 py-2 text-left text-xs text-slate-700 hover:bg-amber-100 disabled:opacity-50 dark:bg-amber-950 dark:text-slate-200 dark:hover:bg-amber-900"
                    title={component}
                    onClick={() => {
                      handleStop();
                      launchItem(component);
                    }}
                    disabled={busy}
                  >
                    <span class="block truncate">{component}</span>
                  </button>
                  <SaveButton saved onToggle={() => toggleSave(component)} />
                  <CopyButton text={component} copied={copied === component} onCopy={copyText} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status && (
        <div class="mt-3 break-all rounded-md bg-slate-100 p-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {status}
        </div>
      )}
    </div>
  );
}

render(<App />, document.getElementById('app')!);
