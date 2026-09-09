/// <reference path="./plugin-runtime.d.ts" />
import { render } from 'preact';
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import { Trash2, Square, RefreshCw } from 'lucide-preact';

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

async function doLaunch(component: string): Promise<string> {
  const r = await shell(`am start -n ${component}`);
  return r && r.toLowerCase().includes('error') ? `启动失败: ${r}` : `已启动 ${component}`;
}

function shortName(component: string): string {
  return component;
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

function App() {
  const [pkg, setPkg] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [confirmUninstall, setConfirmUninstall] = useState(false);
  const [launchItems, setLaunchItems] = useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const pollingRef = useRef(false);

  const pollOnce = useCallback(async (): Promise<string> => {
    const p = await getCurrentPackage();
    setPkg(p);
    if (p) {
      setLaunchItems(await listLauncherActivities(p));
    } else {
      setLaunchItems([]);
    }
    return p;
  }, []);

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
          if (!cancelled) setLaunchItems(items);
        } else {
          setLaunchItems([]);
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

  const handleStop = useCallback(() => {
    setConfirmUninstall(false);
    setAutoRefresh(false);
  }, []);

  return (
    <div>
      <div class="break-all rounded-md bg-slate-50 p-2 font-mono text-sm text-slate-800">
        {pkg || '未检测到前台应用'}
      </div>

      {launchItems.length > 0 && (
        <div class="mb-3">
          <div class="mb-1 text-xs font-medium text-slate-500">启动入口</div>
          <ul class="space-y-1">
            {launchItems.map((component) => (
              <li key={component}>
                <button
                  class="w-full cursor-pointer rounded-md bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                  title={component}
                  onClick={() => {
                    handleStop();
                    launchItem(component);
                  }}
                  disabled={busy}
                >
                  {component.slice(component.indexOf('/') + 1)}
                </button>
              </li>
            ))}
          </ul>
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
