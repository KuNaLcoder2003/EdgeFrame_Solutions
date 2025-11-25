import { type ComponentPropsWithoutRef, type ReactNode } from "react"

import { cn } from "../util"
import { Star, StarHalf } from "lucide-react"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
    /**
     * Optional CSS class name to apply custom styles
     */
    className?: string
    /**
     * Whether to reverse the animation direction
     * @default false
     */
    reverse?: boolean
    /**
     * Whether to pause the animation on hover
     * @default false
     */
    pauseOnHover?: boolean
    /**
     * Content to be displayed in the marquee
     */
    children: React.ReactNode
    /**
     * Whether to animate vertically instead of horizontally
     * @default false
     */
    vertical?: boolean
    /**
     * Number of times to repeat the content
     * @default 4
     */
    repeat?: number
}


const reviews = [
    {
        name: "Adam S",
        username: "Marketing Specialist",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://framerusercontent.com/images/biJ9gMhaMo1KzmK80NLpwSBDZvw.png?scale-down-to=512",
        stars: [<Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <StarHalf color="white" fill="#3300FF" />]
    },
    {
        name: "Lena T",
        username: "Growth Lead",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://framerusercontent.com/images/0Slets2YVD0eoXMUgn5Ye0eWgE.png?scale-down-to=1024&width=960&height=1051",
        stars: [<Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <StarHalf color="white" fill="#3300FF" />]
    },
    {
        name: "Julia P",
        username: "Project Coordinator",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://framerusercontent.com/images/0k9XwDOaSB1F8Kx6nfrLUtIeDZI.png?scale-down-to=512&width=1200&height=904",
        stars: [<Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <Star color="white" fill="#3300FF" />, <StarHalf color="white" fill="#3300FF" />]
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)


const ReviewCard = ({
    img,
    name,
    username,
    body,
    stars
}: {
    img: string
    name: string
    username: string
    body: string,
    stars: ReactNode[]
}) => {
    return (
        <div
            className={cn(
                "w-36 relative h-42 lg:w-72 cursor-pointer overflow-hidden rounded-xl border p-4 ",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] flex flex-col justify-between",

            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-lg" width="46" height="46" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <div className="flex flex-col items-baseline leading-none">
                <div className="flex items-center">
                    {
                        stars.map((star: ReactNode, index) => {
                            return (
                                <div key={index}>{star}</div>
                            )
                        })
                    }
                </div>
                <div className="mt-2 text-sm">{body}</div>
            </div>
        </div>
    )
}


export function MarqueeDemoVertical() {
    return (
        <div className="relative flex h-[650px] w-full flex-row items-center justify-center overflow-hidden mt-15">
            <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
        </div>
    )
}


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
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:[animation-play-state:paused]": pauseOnHover,
                            "[animation-direction:reverse]": reverse,
                        })}
                    >
                        {children}
                    </div>
                ))}
        </div>
    )
}
