import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";

type ProjectItem = {
    id: string | number;
    title: string;
    category: string;
    description: string;
    imageSrc: string;
    href?: string;
    year: string;
    tags: string[];
};

const projects: ProjectItem[] = [
    {
        id: 1,
        title: "NovaMesh Dashboard",
        category: "Web Application",
        description:
            "A real-time analytics platform built for an IoT startup — unified device telemetry, alert routing, and live metric visualization across 50k+ endpoints.",
        imageSrc: "https://framerusercontent.com/images/d29CnpfyTPjz2QD93CqWDy3lW0.png",
        year: "2024",
        tags: ["React", "Node.js", "WebSocket", "PostgreSQL"],
        href: "#",
    },
    {
        id: 2,
        title: "Veritas Design System",
        category: "Design System",
        description:
            "End-to-end design system for a fintech company — component library, token architecture, and documentation site used across 8 product teams.",
        imageSrc: "https://framerusercontent.com/images/QyxSfWbqpXIxJThv4PN3W09Xuoo.png",
        year: "2024",
        tags: ["Figma", "Storybook", "TypeScript", "Tailwind"],
        href: "#",
    },
    {
        id: 3,
        title: "Luminary E-Commerce",
        category: "Full-Stack Platform",
        description:
            "High-conversion storefront for a luxury skincare brand — headless commerce with personalisation engine and sub-second load times.",
        imageSrc: "https://framerusercontent.com/images/NG72MSdIwX2XKu3AGU6z09ZsTqE.png",
        year: "2023",
        tags: ["Next.js", "Shopify", "Prisma", "Redis"],
        href: "#",
    },
    {
        id: 4,
        title: "Orbis Mobile App",
        category: "Mobile",
        description:
            "Cross-platform community app for a wellness company — geo-based event discovery, live audio rooms, and a subscription billing flow.",
        imageSrc: "https://framerusercontent.com/images/QOOvVUDrsCHb6NNj1HE5qVf7pRU.png",
        year: "2023",
        tags: ["React Native", "Expo", "Supabase", "Stripe"],
        href: "#",
    },
    {
        id: 5,
        title: "Kestrel CMS",
        category: "SaaS",
        description:
            "Multi-tenant headless CMS for a media company — structured content, role-based access, and live preview API consumed by 12 editorial teams.",
        imageSrc: "https://framerusercontent.com/images/d29CnpfyTPjz2QD93CqWDy3lW0.png",
        year: "2022",
        tags: ["Express", "MongoDB", "GraphQL", "AWS"],
        href: "#",
    },
];

function wrapIndex(n: number, len: number) {
    return ((n % len) + len) % len;
}

interface Props {
    ref: React.RefObject<null>;
}

const Projects: React.FC<Props> = ({ ref }) => {
    return (
        <div ref={ref} className="max-w-7xl mx-auto mt-20 px-6">
            <SectionHeadings
                className=""
                badge="Projects"
                heading={
                    <h3>
                        A Collection of{" "}
                        <BlurText text="Projects" delay={150} animateBy="words" direction="top" className="text-2xl mb-8" />
                        <br />
                        Built with{" "}
                        <BlurText text="Precision and Passion" delay={150} animateBy="words" direction="top" className="text-2xl mb-8" />
                    </h3>
                }
                subHeading={
                    <p>
                        Every project is crafted with clarity, performance <br />
                        and user experience at the core
                    </p>
                }
            />
            <div className="mt-16">
                <FanStack />
            </div>
        </div>
    );
};

// Card is 380×240. The fan spreads ±2 cards.
// Each offset card shifts by SPACING px. With 2 offsets that's ±2*SPACING.
// Total fan width = CARD_W + 2 * 2 * SPACING + some tilt bleed.
// We make the left column exactly wide enough to hold the whole fan.
const CARD_W = 380;
const CARD_H = 240;
const MAX_OFFSET = 2;
const STEP_DEG = 8;
// SPACING controls how far offset cards move horizontally.
// Smaller = tighter fan, less overflow.
const SPACING = 80;
const DEPTH_PX = 40;
// Fan container must be wide enough: card + left bleed + right bleed
// Left bleed = MAX_OFFSET * SPACING (cards go negative x)
// Right bleed = MAX_OFFSET * SPACING (cards go positive x)
// Add a bit for tilt. Total = CARD_W + 2 * MAX_OFFSET * SPACING + 40
const FAN_CONTAINER_W = CARD_W + 2 * MAX_OFFSET * SPACING + 40;
const FAN_CONTAINER_H = CARD_H + 56; // 56px for nav arrows below

const FanStack = () => {
    const reduceMotion = useReducedMotion();
    const len = projects.length;
    const [active, setActive] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [hovering, setHovering] = useState(false);

    const prev = useCallback(() => setActive((a) => wrapIndex(a - 1, len)), [len]);
    const next = useCallback(() => setActive((a) => wrapIndex(a + 1, len)), [len]);

    useEffect(() => {
        if (hovering) return;
        const id = setInterval(next, 3500);
        return () => clearInterval(id);
    }, [hovering, next]);

    const activeProject = projects[active]!;

    const signedOff = (i: number) => {
        const raw = i - active;
        const alt = raw > 0 ? raw - len : raw + len;
        return Math.abs(alt) < Math.abs(raw) ? alt : raw;
    };

    return (
        <div
            className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* ── Left: card fan ──
                Fixed pixel width so the fan never overflows into the detail panel.
                overflow-visible so tilted cards don't get clipped by their own container,
                but the parent flex column is constrained so they don't overlap the right panel. */}
            <div
                className="relative flex-shrink-0"
                style={{ width: FAN_CONTAINER_W, height: FAN_CONTAINER_H }}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") prev();
                    if (e.key === "ArrowRight") next();
                }}
                role="region"
                aria-label="Project showcase"
            >
                {/* The perspective stage is centred inside the container */}
                <div
                    className="absolute inset-x-0 top-0 flex items-end justify-center"
                    style={{
                        height: CARD_H,
                        perspective: "1000px",
                    }}
                >
                    <AnimatePresence initial={false}>
                        {projects.map((project, i) => {
                            const off = signedOff(i);
                            const abs = Math.abs(off);
                            if (abs > MAX_OFFSET) return null;

                            const isActive = off === 0;
                            const rotateZ = off * STEP_DEG;
                            // x is relative to centre of the perspective stage
                            const x = off * SPACING;
                            const y = abs * 6 + (isActive ? -12 : 0);
                            const z = -abs * DEPTH_PX;
                            const scale = isActive ? 1 : 0.92;
                            const zIndex = 100 - abs;

                            const dragProps = isActive
                                ? {
                                    drag: "x" as const,
                                    dragConstraints: { left: 0, right: 0 },
                                    dragElastic: 0.15,
                                    onDragStart: () => setDragging(true),
                                    onDragEnd: (
                                        _e: unknown,
                                        info: { offset: { x: number }; velocity: { x: number } }
                                    ) => {
                                        setDragging(false);
                                        if (reduceMotion) return;
                                        if (info.offset.x > 80 || info.velocity.x > 500) prev();
                                        else if (info.offset.x < -80 || info.velocity.x < -500) next();
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={project.id}
                                    className="absolute bottom-0 select-none overflow-hidden rounded-2xl border border-black/[0.07]"
                                    style={{
                                        width: CARD_W,
                                        height: CARD_H,
                                        zIndex,
                                        transformStyle: "preserve-3d",
                                        cursor: isActive ? (dragging ? "grabbing" : "grab") : "pointer",
                                        boxShadow: isActive
                                            ? "0 16px 48px rgba(0,0,0,0.13), 0 2px 10px rgba(0,0,0,0.07)"
                                            : "0 4px 16px rgba(0,0,0,0.07)",
                                    }}
                                    initial={reduceMotion ? false : { opacity: 0, y: 30, x, rotateZ, scale }}
                                    animate={{ opacity: abs > 1 ? 0.5 : 1, x, y, rotateZ, scale }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    onClick={() => !dragging && setActive(i)}
                                    {...dragProps}
                                >
                                    <div
                                        className="h-full w-full"
                                        style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                                    >
                                        <ProjectCard project={project} active={isActive} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Nav arrows — pinned to bottom of container, centred */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                    {[
                        { action: prev, label: "Previous project", d: "M15 19l-7-7 7-7" },
                        { action: next, label: "Next project", d: "M9 5l7 7-7 7" },
                    ].map(({ action, label, d }) => (
                        <button
                            key={label}
                            onClick={action}
                            aria-label={label}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-slate-400 shadow-sm transition hover:border-violet-300 hover:text-[#3300ff] hover:shadow-md"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Right: detail panel ── */}
            <div className="flex flex-1 flex-col min-w-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
                        className="flex flex-col gap-4"
                    >
                        {/* Counter */}
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-light text-stone-400 tracking-wider tabular-nums">
                                {String(active + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                            </span>
                            <div className="h-px flex-1 bg-stone-200" />
                        </div>

                        {/* Category · Year */}
                        <div className="flex items-center gap-2 text-[11px] font-light uppercase tracking-[0.14em] text-stone-400">
                            <span>{activeProject.category}</span>
                            <span className="text-stone-300">·</span>
                            <span>{activeProject.year}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] font-[InstrumentSerif] font-normal text-neutral-950 leading-tight tracking-tight">
                            {activeProject.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[14px] font-light text-stone-500 leading-relaxed max-w-xs">
                            {activeProject.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {activeProject.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-[11px] font-normal text-stone-600 bg-stone-100 border border-stone-200 rounded-lg tracking-wide"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href={activeProject.href ?? "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="group mt-1 inline-flex items-center gap-2 text-[13px] font-medium text-stone-700 transition hover:text-[#3300ff]"
                        >
                            <span className="border-b border-stone-300 pb-px transition group-hover:border-[#3300ff]">
                                View case study
                            </span>
                            <svg className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </a>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="mt-8 flex gap-1.5">
                    {projects.map((p, idx) => (
                        <button
                            key={p.id}
                            onClick={() => setActive(idx)}
                            aria-label={`Go to ${p.title}`}
                            className="h-[3px] rounded-full border-none transition-all duration-300"
                            style={{
                                width: idx === active ? 28 : 8,
                                background: idx === active ? "#3300ff" : "#e7e5e4",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ project, active }: { project: ProjectItem; active: boolean }) => {
    return (
        <div className="relative h-full w-full bg-stone-100">
            <img
                src={project.imageSrc}
                alt={project.title}
                draggable={false}
                loading="eager"
                className="h-full w-full object-cover"
                style={{
                    filter: active ? "none" : "brightness(0.72) saturate(0.55)",
                    transition: "filter 0.4s ease",
                }}
            />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)",
                }}
            />
            <AnimatePresence>
                {active && (
                    <motion.div
                        className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 px-5 pb-5"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28 }}
                    >
                        <span className="text-[9px] font-light uppercase tracking-[0.14em] text-white/55">
                            {project.category}
                        </span>
                        <span className="font-[InstrumentSerif] text-base font-normal text-white leading-snug">
                            {project.title}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;