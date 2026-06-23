"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextType from "@/components/animations/TextType";
import LogoLoop from "@/components/animations/LogoLoop";
import Particles from "@/components/animations/Particles";

const navItems = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];

const projectPreviews = [
  {
    name: "CoreBusiness",
    signal: "ERP runtime",
    lines: ["orders.sync()", "tenant ledger", "role matrix"],
  },
  {
    name: "Network IDS",
    signal: "packet anomaly",
    lines: ["flow window", "signature delta", "alert queue"],
  },
  {
    name: "Smart Village",
    signal: "civic platform",
    lines: ["resident data", "service desk", "geo reports"],
  },
  {
    name: "IoT Monitoring",
    signal: "edge telemetry",
    lines: ["sensor mesh", "MQTT stream", "threshold map"],
  },
  {
    name: "Inventory System",
    signal: "stock control",
    lines: ["SKU ledger", "warehouse bin", "audit trail"],
  },
  {
    name: "Data Analytics",
    signal: "decision layer",
    lines: ["batch model", "KPI surface", "trend compare"],
  },
];

// Orbit configuration — elliptical path.
//
// Why elliptical instead of circular?
// With the pivot at right:-380px, the visible horizontal arc spans
// cos(θ) < -0.515 → ~121° to 239° (118° window). A circular orbit at
// r=680 would displace cards ±589 px vertically at those angles —
// far outside any viewport. Splitting into separate x/y radii lets us
// push cards deep enough into the column while clamping vertical travel.
//
//   ORBIT_RX = 520 → at θ=180°, card left edge sits ~252 px from right
//              column edge (well inside, fully readable).
//   ORBIT_RY = 250 → max vertical displacement ±250 px from pivot center,
//              keeping all cards comfortably within the viewport height.
const ORBIT_RX   = 520; // horizontal semi-axis (px)
const ORBIT_RY   = 250; // vertical semi-axis   (px)
const ORBIT_STEPS = 120;
const CARD_W = 224;
const CARD_H = 144;
const NUM_CARDS = projectPreviews.length; // 6 cards

// Choreographed 3-card grouping (60° stagger, clockwise motion):
//
//   index 0 → startDeg 240° — "exit"  card, bottom of arc, fading out
//   index 1 → startDeg 180° — "apex"  card, leftmost point, fully visible
//   index 2 → startDeg 120° — "entry" card, top of arc,    fading in
//   index 3 → startDeg  60° — hidden on eastern arc (next in queue)
//   index 4 → startDeg   0° — hidden on eastern arc
//   index 5 → startDeg -60° — hidden on eastern arc
//
// At any instant exactly 3 cards lie within the 121°–239° visible window.
// The top/bottom gradient fades in OrbitalProjectShowcase soften entry/exit.
function buildOrbitKeyframes(index: number) {
  const startDeg = 240 - index * 60;
  const x: number[] = [];
  const y: number[] = [];

  for (let step = 0; step <= ORBIT_STEPS; step++) {
    const angleDeg = startDeg - (step / ORBIT_STEPS) * 360;
    const angleRad = (angleDeg * Math.PI) / 180;
    // Elliptical keyframes: x and y use independent semi-axes.
    x.push(Math.cos(angleRad) * ORBIT_RX - CARD_W / 2);
    y.push(Math.sin(angleRad) * ORBIT_RY - CARD_H / 2);
  }

  return { x, y };
}

const loopLogos = [
  { node: <span className="font-mono text-sm text-white/72">NEXT.JS</span> },
  { node: <span className="font-mono text-sm text-white/72">FLUTTER</span> },
  { node: <span className="font-mono text-sm text-white/72">PYTHON</span> },
  { node: <span className="font-mono text-sm text-white/72">TYPESCRIPT</span> },
  { node: <span className="font-mono text-sm text-white/72">FIREBASE</span> },
  { node: <span className="font-mono text-sm text-white/72">SUPABASE</span> },
  { node: <span className="font-mono text-sm text-white/72">GSAP</span> },
  { node: <span className="font-mono text-sm text-white/72">FRAMER MOTION</span> },
];


function FloatingNavbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[90%] max-w-5xl -translate-x-1/2">
      <motion.nav
        className="grid grid-cols-[1fr_auto_1fr] items-center rounded-full border border-zinc-800/80 bg-[#0b0b0b] px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:px-5"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <a
          href="#home"
          className="justify-self-start whitespace-nowrap pl-2 font-mono text-sm font-semibold text-white"
        >
          dwiky.dev
        </a>

        <div
          className="hidden items-center rounded-full bg-white/[0.03] p-1 md:flex"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={item === "HOME" ? "#home" : `#${item.toLowerCase()}`}
              className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                hoveredItem === item ? "text-white" : "text-zinc-400"
              }`}
              onMouseEnter={() => setHoveredItem(item)}
            >
              {hoveredItem === item ? (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10">{item}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="justify-self-end rounded-full border border-white/10 px-3 py-2 font-mono text-[11px] font-semibold text-zinc-300 transition duration-200 hover:border-white/20 hover:text-white"
        >
          OPEN
        </a>
      </motion.nav>
    </header>
  );
}

function ProjectPreview({
  project,
  index,
}: {
  project: (typeof projectPreviews)[number];
  index: number;
}) {
  const orbit = buildOrbitKeyframes(index);

  return (
    // Cards start at (0,0) = pivot center; x/y offsets drive their position.
    // `rotate: 0` is explicitly locked throughout the animation so they
    // always face the user upright regardless of arc position.
    <motion.div
      className="absolute overflow-hidden rounded-md border border-white/16 bg-zinc-950/88 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      style={{ width: CARD_W, height: CARD_H, top: 0, left: 0 }}
      animate={{
        x: orbit.x,
        y: orbit.y,
        rotate: 0,
      }}
      transition={{
        duration: 48,
        repeat: Infinity,
        ease: "linear",
        // Prevent Framer Motion from ever tweening `rotate` so it stays
        // absolutely fixed at 0 even while x/y animate.
        rotate: { duration: 0 },
      }}
    >
      <div className="flex h-8 items-center justify-between border-b border-white/10 bg-white/[0.04] px-3">
        <span className="h-1.5 w-10 rounded-full bg-white/18" />
        <span className="font-mono text-[10px] text-white/38">secure.local</span>
      </div>
      <div className="flex h-[calc(100%-2rem)] flex-col justify-between p-4">
        <div>
          <p className="font-mono text-[10px] uppercase text-cyan-200/70">
            {project.signal}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
            {project.name}
          </h3>
        </div>
        <div className="space-y-1.5">
          {project.lines.map((line) => (
            <div key={line} className="flex items-center gap-2">
              <span className="h-px w-5 bg-cyan-200/35" />
              <span className="font-mono text-[11px] text-white/54">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function OrbitalProjectShowcase() {
  return (
    // `overflow-hidden` clips cards that travel outside the column bounds,
    // ensuring no horizontal scroll bleeds into the page layout.
    <div className="relative h-full w-full overflow-hidden">
      {/* Left fade — blends the column edge with the hero background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-[#050505] to-transparent" />
      {/* Top / bottom fades — softly clip cards entering and leaving view */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

      {/*
        Orbit pivot — positioned well beyond the right edge of the viewport
        (~720 px from the column's right boundary) so only the west-facing
        semi-circle arc is ever visible inside the column.
      */}
      <div
        className="absolute top-1/2 h-0 w-0"
        style={{ right: "-380px" }}
      >
        {/* Identity badge — centered on the pivot point */}
        <div className="absolute left-[-72px] top-[-72px] z-10 grid h-36 w-36 place-items-center rounded-full border border-white/14 bg-white/[0.04] shadow-[0_0_80px_rgba(113,234,238,0.16)] backdrop-blur-md">
          <div className="text-center">
            <p className="font-mono text-xs uppercase text-cyan-200/60">identity</p>
            <p className="mt-1 text-xl font-semibold text-white">dwiky.dev</p>
          </div>
        </div>

        {/* Project cards — each orbits the pivot on a shared circular path */}
        {projectPreviews.map((project, index) => (
          <ProjectPreview key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main id="home" className="relative min-h-[100dvh] overflow-x-hidden bg-[#050505] text-white">
      <FloatingNavbar />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[1080px] w-[1080px] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[1080px] w-[1080px]">
            <Particles
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleColors={["#ffffff"]}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              particleHoverFactor={1}
              alphaParticles={false}
              sizeRandomness={1}
              cameraDistance={20}
              disableRotation={false}
            />
          </div>
        </div>
      </div>

      <section className="relative z-10 grid min-h-[100dvh] grid-cols-1 overflow-hidden lg:grid-cols-[45%_55%]">
        <div className="flex min-h-[72dvh] flex-col justify-center px-6 pb-24 pt-32 sm:px-10 lg:min-h-[100dvh] lg:px-16 xl:px-20">
          <div className="max-w-[620px]">
            <p className="text-sm font-medium text-white/58">
              Welcome to my portfolio
            </p>
            <h1 className="mt-6 max-w-[11ch] text-5xl font-black leading-[0.96] text-white sm:text-6xl xl:text-7xl">
              Hi, I&apos;m Dwiky.
            </h1>
            <p className="mt-6 max-w-[540px] text-xl leading-relaxed text-white/72 sm:text-2xl">
              Building digital products and solving real-world problems.
            </p>
            <TextType
              text={["[Backend Engineer]", "[Flutter Developer]", "[System Designer]"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="mt-6 block min-h-9 font-mono text-xl text-cyan-200 sm:text-2xl"
            />
            <a
              href="#projects"
              className="mt-10 inline-flex h-12 items-center rounded-md bg-[#71eaee] px-6 text-sm font-bold text-black transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white active:translate-y-px"
            >
              View Projects
            </a>
          </div>
        </div>

        <div
          id="projects"
          className="relative min-h-[520px] overflow-hidden lg:min-h-[100dvh]"
        >
          <OrbitalProjectShowcase />
        </div>
      </section>

      <section id="about" className="sr-only" aria-label="About" />
      <section id="contact" className="sr-only" aria-label="Contact" />

      <footer className="relative z-20 -mt-20 bg-[#050505]/84 px-0 py-6 backdrop-blur-md">
        <LogoLoop
          logos={loopLogos}
          speed={120}
          direction="left"
          fadeOut
          fadeOutColor="#050505"
          gap={48}
          logoHeight={22}
          pauseOnHover={false}
          ariaLabel="Technology stack"
        />
      </footer>
    </main>
  );
}
