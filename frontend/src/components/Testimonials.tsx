import type React from "react";
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";
import { MarqueeDemoVertical } from "./Marquee";

const Testimonials: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto mt-15">
            <div className="w-full flex flex-col items-center">
                <SectionHeadings badge="Testimonials" heading={<h3>Hear What
                    <BlurText text="Others" delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-2xl mb-8" /> <br /> Say About <BlurText text="Us" delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8" /></h3>} subHeading={<p>See how business unlock growth and achieve <br /> results with our solutions</p>} />
            </div>
            <MarqueeDemoVertical />
        </div>
    )
}
export default Testimonials;