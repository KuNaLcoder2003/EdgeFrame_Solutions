import type React from "react";
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";
import { MarqueeDemoVertical } from "./Marquee";

const Testimonials: React.FC<{ ref: React.RefObject<null> }> = ({ ref }) => {
    return (
        // Matches the wrapper pattern of every other section
        <div ref={ref} className="max-w-7xl mx-auto mt-20 px-6">
            <SectionHeadings
                className=""
                badge="Testimonials"
                heading={
                    <h3>
                        Hear What{" "}
                        <BlurText
                            text="Others"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8"
                        />
                        <br />
                        Say About{" "}
                        <BlurText
                            text="Us"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8"
                        />
                    </h3>
                }
                subHeading={
                    <p>
                        See how businesses unlock growth and achieve <br className="hidden sm:block" />
                        results with our solutions
                    </p>
                }
            />

            {/* Social proof bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {[
                    { value: "50+", label: "Projects delivered" },
                    { value: "4.9", label: "Average rating" },
                    { value: "100%", label: "Client satisfaction" },
                ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center gap-0.5">
                        <span className="text-2xl font-semibold text-neutral-900">{value}</span>
                        <span className="text-[12px] font-light text-stone-400 uppercase tracking-[0.12em]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Marquee columns — responsive: 2 cols mobile, 3 cols md+ */}
            <div className="w-full overflow-hidden">
                <MarqueeDemoVertical />
            </div>
        </div>
    )
}

export default Testimonials;