import type React from "react";
import BlurText from "./BlurText";
import SectionHeadings from "./SectionHeadings";
import Accordion from "./Accordions";

const Faq: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto mt-20">
            <div className="w-full flex flex-col items-center">
                <SectionHeadings badge="FAQs" heading={<h3>
                    <BlurText text="Answers" delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-2xl mb-8" /> To Your Most <br /> Common <BlurText text="Questions" delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8" /></h3>} subHeading={<p>Everything you need to know about getting started, <br /> using the platform and unlocking full potential</p>}
                />

                <Accordion />

            </div>



        </div>
    )
}

export default Faq;