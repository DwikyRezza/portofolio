export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-12 bg-white">
      {/* Left Panel: Scrollable Content Stream */}
      <main className="col-span-7 min-h-screen">{children}</main>

      {/* Right Panel: Sticky Detail Inspector */}
      <aside className="sticky top-0 col-span-5 h-screen border-l border-black bg-white">
        <div className="flex h-full flex-col gap-8 overflow-y-auto px-8 py-16">
          {/* Status Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              Detail Inspector
            </p>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black">
              <span className="h-2 w-2 bg-glide-teal" />
              Active
            </span>
          </div>

          {/* [01] Overview */}
          <section className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              [01] Overview
            </p>
            <p className="text-base font-medium leading-snug text-black">
              INDONESIA // SURABAYA &amp; SIDOARJO COMPONENT REGION
            </p>
          </section>

          {/* [02] Challenge */}
          <section className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              [02] Challenge
            </p>
            <p className="text-sm leading-relaxed text-zinc-600">
              DISTRIBUTED ENGINEERING COLLABORATION AND SYSTEM ENTROPY REDUCTION
            </p>
          </section>

          {/* [03] Architecture */}
          <section className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              [03] Architecture
            </p>
            <p className="text-sm leading-relaxed text-zinc-600">
              EXPLICIT FILE-LOCAL REASONING, DECOUPLED FRONTEND AND INFRASTRUCTURE LOGIC
            </p>
          </section>

          {/* [04] Metrics */}
          <section className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              [04] Metrics
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-zinc-200 pt-6">
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-black tracking-tight text-black">2023</p>
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  Year Enrolled
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-black tracking-tight text-black">12-COL</p>
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  Grid System
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-black tracking-tight text-black">v1.5</p>
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  Governance Kernel
                </p>
              </div>
            </div>
          </section>

          {/* [05] Stack */}
          <section className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              [05] Stack
            </p>
            <p className="font-mono text-sm leading-relaxed text-black">
              DART // FLUTTER // PYTHON // YOLOv8 // TYPESCRIPT // NEXT.JS
            </p>
          </section>
        </div>
      </aside>
    </div>
  );
}
