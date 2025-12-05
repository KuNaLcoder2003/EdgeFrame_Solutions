import type React from "react";
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";
import { DiamondIcon } from "./Hero";
import BigNumber from "./BigNumbers";
import { TimelineDemo } from "./TimeLine";
import { motion } from "framer-motion";

const Benefits: React.FC<{ ref: React.RefObject<null> }> = ({ ref }) => {
    return (
        <div ref={ref} className="max-w-7xl mx-auto mt-20">
            <SectionHeadings className="" badge="Benefits"
                heading={<h3>See the differnce that <br />Drives {" "}
                    <BlurText
                        text="Growth"
                        delay={150}
                        animateBy="words"
                        direction="top"

                        className="text-2xl mb-8"
                    />
                </h3>}
                subHeading={
                    <p>Experience the real world impact of smarter tools, <br /> faster workflows and effortless collaborations</p>}
            />
            <BenefitsGrid />
            <TimelineDemo />
        </div>
    )
}

const BenefitsGrid: React.FC = () => {
    const list = [
        {
            title: "Solutions Designed Around Your Business Needs",
            text: "We take the time to understand your goals, challenges, and vision — ensuring every solution we build is aligned with your long-term growth.",
        },
        {
            title: "Modern Technology That Keeps You Ahead",
            text: "We use the latest tools, frameworks, and best practices so your product stays fast, secure, and ready for the future.",
        },
        {
            title: "Direct Collaboration",
            text: "No layers, no outsourcing — you work directly with the experts handling your work, ensuring transparency, speed, and accuracy.",
        },
        {
            title: "Agile Delivery",
            text: "Our lean team structure allows us to adapt, iterate, and deliver quickly — helping you launch faster without sacrificing quality.",
        },
        {
            title: "High Quality",
            text: "You get top-tier design, development, and support at a fraction of the price big agencies charge — without compromising standards.",
        },
        {
            title: "End-to-End Capabilities in One Team",
            text: "From design and development to automation and support — we provide complete solutions, so you don’t have to manage multiple vendors",
        },
        {
            title: "Clear Communication",
            text: "We keep you informed at every step with updates, shared boards, and transparent progress — no surprises, no guesswork.",
        },
        {
            title: "Flexible Engagement",
            text: "Whether you need a one-time project, ongoing support, or continuous improvement — we adapt to your pace and budget.",
        },
        {
            title: "Long-Term Partnership",
            text: "We don’t just deliver and disappear. We stay with you to refine, improve, and scale your product as your business evolves.",
        }
    ]
    return (
        <div className="max-w-7xl p-4 mt-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full grid gird-cols-2 lg:grid-cols-3 gap-4">
                {
                    list.map((item, index) => {
                        return (
                            <motion.div
                                className="bg-white h-auto rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-[200px] flex flex-col">
                                <div className="flex flex-col items-start gap-4 relative">

                                    <BigNumber className="absolute top-0 -right-5" children={`${index + 1}`} />
                                    <span className="inline-flex w-20 h-20 align-middle rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 items-center justify-center">
                                        <span className="p-2 rounded-xl bg-white/10 shadow-[0_0_30px_10px_rgba(167,139,250,0.3)]">
                                            <DiamondIcon />
                                        </span>
                                    </span>
                                    <div className="flex-1 min-w-0 z-[1000]">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3300FF] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })
                }
            </motion.div>
        </div>
    )
}



export default Benefits;