/// <reference path="./plugin-runtime.d.ts" />
import { render } from 'preact';
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import { Trash2, Square, RefreshCw, Copy, Check } from 'lucide-preact';

async function shell(cmd: string): Promise<string> {
  const result = await $u.shell(cmd);
  return result.output.trim();
}

const PKG_RE = /(?:mCurrentFocus|mFocusedApp)=.*?\bu\d+\s+([\w.]+)\//;

async function getCurrentPackage(): Promise<string> {
  const out = await shell('dumpsys window | grep -E "mCurrentFocus|mFocusedApp"');
  const m = out.match(PKG_RE);
  return m ? m[1] : '';
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
  return r && r.toLowerCase().includes('error') ? `启动失败: ${r}` : `已启动 ${component}`;
}

async function stopApp(pkg: string): Promise<string> {
  await shell(`am force-stop ${pkg}`);
  return `已强制停止 ${pkg}`;
}

async function uninstallApp(pkg: string): Promise<string> {
  const out = await shell(`pm uninstall ${pkg}`);
  const msg = out || '(无输出)';
  return msg.toLowerCase().includes('success') || msg.includes('Success')
    ? `卸载成功: ${pkg}`
    : `卸载失败: ${msg}`;
}

function Button({
  children,
  onClick,
  disabled,
  danger,
  ariaLabel,
}: {
  children: preact.ComponentChildren;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      class={`inline-flex cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-white disabled:pointer-events-none disabled:opacity-40 ${
        danger ? 'bg-red-600 hover:bg-red-500' : 'bg-slate-900 hover:bg-slate-700'
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
      class="inline-flex shrink-0 cursor-pointer items-center rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
      onClick={(e) => {
        e.stopPropagation();
        onCopy(text);
      }}
    >
      {copied ? <Check class="h-3.5 w-3.5 text-emerald-500" /> : <Copy class="h-3.5 w-3.5" />}
    </button>
  );
}

function App() {
  const [pkg, setPkg] = useState('');
  const [version, setVersion] = useState<{ name: string; code: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [confirmUninstall, setConfirmUninstall] = useState(false);
  const [launchItems, setLaunchItems] = useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [copied, setCopied] = useState('');
  const pollingRef = useRef(false);

  const loadAppInfo = useCallback(async (p: string) => {
    const [items, ver] = await Promise.all([listLauncherActivities(p), getAppVersion(p)]);
    setLaunchItems(items);
    setVersion(ver);
  }, []);

  const pollOnce = useCallback(async (): Promise<string> => {
    const p = await getCurrentPackage();
    setPkg(p);
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
        const p = await getCurrentPackage();
        if (cancelled) return;
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
    setAutoRefresh(false);
  }, []);

  return (
    <div>
      <div class="flex items-center gap-1">
        <div class="min-w-0 flex-1 break-all rounded-md bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800">
          {pkg || '未检测到前台应用'}
        </div>
        {pkg && <CopyButton text={pkg} copied={copied === pkg} onCopy={copyText} />}
      </div>

      {launchItems.length > 0 && (
        <div class="mt-3">
          <div class="mb-1 text-xs font-medium text-slate-500">
            启动入口<span class="ml-1 font-normal text-slate-400">点击即可启动</span>
          </div>
          <ul class="space-y-1">
            {launchItems.map((component) => (
              <li key={component}>
                <div class="flex items-center gap-1">
                  <button
                    class="min-w-0 flex-1 cursor-pointer rounded-md bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                    title={component}
                    onClick={() => {
                      handleStop();
                      launchItem(component);
                    }}
                    disabled={busy}
                  >
                    <span class="break-all">{component.slice(component.indexOf('/') + 1)}</span>
                  </button>
                  <CopyButton text={component} copied={copied === component} onCopy={copyText} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {version && (
        <div class="mt-3">
          <div class="mb-1 text-xs font-medium text-slate-500">版本号</div>
          <div class="flex items-center gap-1">
            <div class="min-w-0 flex-1 break-all rounded-md bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
              {version.name} ({version.code})
            </div>
            <CopyButton
              text={`${version.name} (${version.code})`}
              copied={copied === `${version.name} (${version.code})`}
              onCopy={copyText}
            />
          </div>
        </div>
      )}

      <div class="mt-4 mb-2 flex items-center justify-between">
        <div class="flex gap-2">
          <Button
            ariaLabel="卸载应用"
            danger
            onClick={() => {
              handleStop();
              setConfirmUninstall(true);
            }}
            disabled={busy || noPkg}
          >
            <Trash2 class="h-4 w-4" />
          </Button>
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
        </div>
        <button
          aria-label={autoRefresh ? '停止自动刷新' : '开启自动刷新并刷新'}
          class={`inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 disabled:opacity-50 ${
            autoRefresh
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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

      {confirmUninstall && (
        <div class="rounded-md border border-red-200 bg-red-50 p-2">
          <p class="mb-2 text-xs text-red-700">
            确认卸载 <span class="font-mono font-semibold">{pkg}</span> 吗？
          </p>
          <div class="flex gap-2">
            <Button
              danger
              onClick={() => {
                setAutoRefresh(false);
                run(uninstallApp);
              }}
              disabled={busy}
            >
              确认卸载
            </Button>
            <Button onClick={() => setConfirmUninstall(false)} disabled={busy}>
              取消
            </Button>
          </div>
        </div>
      )}

      {status && (
        <div class="mt-3 break-all rounded-md bg-slate-100 p-2 text-xs text-slate-600">
          {status}
        </div>
      )}
    </div>
  );
}

render(<App />, document.getElementById('app')!);
