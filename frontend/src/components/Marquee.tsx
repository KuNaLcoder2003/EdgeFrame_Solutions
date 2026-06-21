import { type ComponentPropsWithoutRef } from "react"
import { cn } from "../util"
import { Star, StarHalf, Quote } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
    className?: string
    reverse?: boolean
    pauseOnHover?: boolean
    children: React.ReactNode
    vertical?: boolean
    repeat?: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const reviews = [
    {
        name: "Adam S.",
        username: "Marketing Specialist",
        body: "Working with EdgeFrame was genuinely seamless. They took our vague brief and turned it into a product we're proud to show clients.",
        img: "https://framerusercontent.com/images/biJ9gMhaMo1KzmK80NLpwSBDZvw.png?scale-down-to=512",
        rating: 4.5,
    },
    {
        name: "Lena T.",
        username: "Growth Lead",
        body: "The attention to detail was unlike anything I've experienced from a dev agency. Fast, communicative, and the output was polished.",
        img: "https://framerusercontent.com/images/0Slets2YVD0eoXMUgn5Ye0eWgE.png?scale-down-to=512",
        rating: 4.5,
    },
    {
        name: "Julia P.",
        username: "Project Coordinator",
        body: "We had a tight deadline and EdgeFrame delivered ahead of schedule. The quality didn't suffer — it actually exceeded our expectations.",
        img: "https://framerusercontent.com/images/0k9XwDOaSB1F8Kx6nfrLUtIeDZI.png?scale-down-to=512",
        rating: 5,
    },
    {
        name: "Marcus R.",
        username: "Founder, SaaS Startup",
        body: "They rebuilt our entire frontend from scratch in three weeks. The performance gains alone paid for the project within a month.",
        img: "https://framerusercontent.com/images/biJ9gMhaMo1KzmK80NLpwSBDZvw.png?scale-down-to=512",
        rating: 5,
    },
    {
        name: "Priya N.",
        username: "Head of Product",
        body: "I appreciated how they pushed back on ideas that wouldn't work and offered better alternatives. True partners, not just executors.",
        img: "https://framerusercontent.com/images/0Slets2YVD0eoXMUgn5Ye0eWgE.png?scale-down-to=512",
        rating: 4.5,
    },
    {
        name: "Chris M.",
        username: "E-Commerce Director",
        body: "Our conversion rate went up 28% after the redesign. EdgeFrame understood the brief at a business level, not just a design level.",
        img: "https://framerusercontent.com/images/0k9XwDOaSB1F8Kx6nfrLUtIeDZI.png?scale-down-to=512",
        rating: 5,
    },
]

// ─── Star renderer ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: full }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#3300FF] text-[#3300FF]" />
            ))}
            {half && <StarHalf className="h-3 w-3 fill-[#3300FF] text-[#3300FF]" />}
        </div>
    )
}

// ─── Review Card ──────────────────────────────────────────────────────────────

const ReviewCard = ({
    img,
    name,
    username,
    body,
    rating,
}: {
    img: string
    name: string
    username: string
    body: string
    rating: number
}) => {
    return (
        <div className={cn(
            "relative w-64 cursor-pointer overflow-hidden rounded-2xl border border-neutral-100 bg-white p-5",
            "shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)]",
            "flex flex-col gap-4"
        )}>
            {/* Quote icon */}
            <Quote className="h-5 w-5 text-[#A58FFF] opacity-60" />

            {/* Body */}
            <p className="text-[13px] font-light text-stone-600 leading-relaxed flex-1">
                {body}
            </p>

            {/* Footer: avatar + name + stars */}
            <div className="flex items-center gap-3 pt-1 border-t border-neutral-100">
                <img
                    className="h-9 w-9 rounded-xl object-cover flex-shrink-0"
                    src={img}
                    alt={name}
                    width={36}
                    height={36}
                />
                <div className="min-w-0">
                    <p className="text-[13px] font-medium text-neutral-900 truncate">{name}</p>
                    <p className="text-[11px] font-light text-stone-400 truncate">{username}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                    <StarRating rating={rating} />
                </div>
            </div>
        </div>
    )
}

// ─── Marquee primitive ────────────────────────────────────────────────────────

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    return (
        <div
            {...props}
            className={cn(
                "group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
                { "flex-row": !vertical, "flex-col": vertical },
                className
            )}
        >
            {Array(repeat).fill(0).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "flex shrink-0 justify-around [gap:var(--gap)]",
                        {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:[animation-play-state:paused]": pauseOnHover,
                            "[animation-direction:reverse]": reverse,
                        }
                    )}
                >
                    {children}
                </div>
            ))}
        </div>
    )
}

// ─── Marquee Demo ─────────────────────────────────────────────────────────────

// Split into 3 columns for desktop, fewer on mobile
const col1 = [reviews[0], reviews[3]]
const col2 = [reviews[1], reviews[4]]
const col3 = [reviews[2], reviews[5]]

export function MarqueeDemoVertical() {
    return (
        <div className="relative flex h-[520px] w-full flex-row items-center justify-center gap-3 overflow-hidden mt-10">
            {/* col 1 — always visible */}
            <Marquee pauseOnHover vertical className="[--duration:22s]">
                {col1.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>

            {/* col 2 — always visible */}
            <Marquee reverse pauseOnHover vertical className="[--duration:26s]">
                {col2.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>

            {/* col 3 — hidden on mobile, visible md+ */}
            <div className="hidden md:contents">
                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {col3.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
            </div>

            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>
    )
}