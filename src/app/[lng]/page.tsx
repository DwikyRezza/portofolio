export default function Page() {
  return (
    <div className="flex flex-col gap-12 px-12 py-16">
      {/* Identity Header */}
      <header className="flex flex-col gap-4 border-b border-black pb-8">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          Identity Manifesto
        </p>
        <h1 className="text-4xl font-black tracking-tight text-black md:text-6xl">
          MUHAMMAD DWIKY YANUAREZZA
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          UNDERGRADUATE INFORMATION TECHNOLOGY STUDENT AT TELKOM UNIVERSITY
          SURABAYA
        </p>
      </header>

      {/* Manifesto Blocks */}
      <div className="flex flex-col gap-8">
        <article className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            System Architecture
          </p>
          <p className="max-w-prose text-base leading-relaxed text-zinc-600">
            Treat every module boundary as a load-bearing contract. Coupling is
            admitted openly and paid for in compile time, not deferred to
            runtime. State transitions stay deterministic; side effects are
            quarantined to the layer that owns them. The 12-column grid is a
            constraint, not a decoration; structural determinism outranks
            visual freedom.
          </p>
        </article>

        <article className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Computer Vision
          </p>
          <p className="max-w-prose text-base leading-relaxed text-zinc-600">
            Detection pipelines are bounded by thermal throttling and queue
            depth long before model size becomes the wall. YOLOv8 inference on
            edge hardware trades peak accuracy for sustained frame rate.
            Quantization collapses batch normalization layers; preprocessing
            absorbs the precision loss upstream so the detector never receives
            a degraded frame.
          </p>
        </article>

        <article className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Mobile Persistence
          </p>
          <p className="max-w-prose text-base leading-relaxed text-zinc-600">
            Background processes are reclaimed by the operating system without
            negotiation. Every navigation is a serialization checkpoint and
            every restore must complete inside one frame on the main isolate.
            State that cannot survive process death was never owned;
            persistence is the only source of truth the runtime will not
            silently revoke.
          </p>
        </article>

        <article className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Engineering Ethos
          </p>
          <p className="max-w-prose text-base leading-relaxed text-zinc-600">
            No claim ships on narrative. Every assertion resolves to a
            measurable constraint: a latency budget, a memory ceiling, a frame
            time floor. Marketing language is filed as a defect. This portfolio
            reads as a system log, not a brochure.
          </p>
        </article>
      </div>
    </div>
  );
}
