/// <reference path="./plugin-runtime.d.ts" />
import { render } from 'preact';
import { useState, useCallback } from 'preact/hooks';

async function shell(cmd: string): Promise<string> {
  const result = await $u.shell(cmd);
  return result.output.trim();
}

function Button({
  children,
  onClick,
  disabled,
}: {
  children: preact.ComponentChildren;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      class="inline-flex items-center justify-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function App() {
  const [loading, setLoading] = useState(false);

  const goHome = useCallback(async () => {
    setLoading(true);
    try {
      await shell('input keyevent HOME');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div class="p-2">
      <Button onClick={goHome} disabled={loading}>
        {loading ? 'Going...' : 'Home'}
      </Button>
    </div>
  );
}

render(<App />, document.getElementById('app')!);
