import type React from "react";
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";
import { DiamondIcon } from "./Hero";
import BigNumber from "./BigNumbers";
import { TimelineDemo } from "./TimeLine";


const Benefits: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto mt-20">
            <SectionHeadings badge="Benefits"
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
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        },
        {
            title: "Optimized Speed",
            text: "Improve every workflow with tools designed for efficiency and speed.",
        }
    ]
    return (
        <div className="max-w-7xl p-4 mt-4 overflow-hidden">
            <div className="w-full grid gird-cols-2 lg:grid-cols-3 gap-4">
                {
                    list.map((item, index) => {
                        return (
                            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-[200px] flex flex-col">
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default Benefits;