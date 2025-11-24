"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 40%", "end 72.3%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
            ref={containerRef}
        >

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent">
                                {item.title}
                            </h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </motion.div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};



export function TimelineDemo() {
    const data = [
        {
            title: "01",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex flex-col items-baseline gap-2">
                    <div className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white font-medium shadow-md px-5 py-1 rounded-xl font-medium hover:shadow-lg transition w-[150px]">
                        {"Data Sources"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Connect your data</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Seamlessly integrate all your key data sources whether it's databases spreadsheets
                            APIs or third party tools using our intuitive no code connectors. You can unify structured and unstructured data
                            with minimal setup ensuring every decision starts with a complete picture.</p>
                    </div>
                    <button className="bg-black text-white rounded-lg p-2 px-6 cursor-pointer mt-4">Get Started</button>
                </motion.div>
            ),
        },
        {
            title: "02",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex flex-col items-baseline gap-2">
                    <div className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white font-medium shadow-md px-5 py-1 rounded-xl font-medium hover:shadow-lg transition w-[150px]">
                        {"Smart Cleanup"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Clean & Organize Instantly</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Seamlessly integrate all your key data sources whether it's databases spreadsheets
                            APIs or third party tools using our intuitive no code connectors. You can unify structured and unstructured data
                            with minimal setup ensuring every decision starts with a complete picture.</p>
                    </div>
                    <button className="bg-black text-white rounded-lg p-2 px-6 cursor-pointer mt-4">Get Started</button>
                </motion.div>
            ),
        },
        {
            title: "03",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex flex-col items-baseline gap-2">
                    <div className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white font-medium shadow-md px-5 py-1 rounded-xl font-medium hover:shadow-lg transition w-[150px]">
                        {"Clear Insights"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Visualize with Purpose</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Turn your refined data into clear impactful dashboards. Choose from pre built templates or design custom visualizations that align with your KPIs. Whether you need trends comparisons or deep insights every chart is crafted to drive confident decision making.</p>
                    </div>
                    <button className="bg-black text-white rounded-lg p-2 px-6 cursor-pointer mt-4">Get Started</button>
                </motion.div>
            ),
        },
        {
            title: "04",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex flex-col items-baseline gap-2">
                    <div className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white font-medium shadow-md px-5 py-1 rounded-xl font-medium hover:shadow-lg transition w-[150px]">
                        {"Team Access"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Collaborate Across Teams</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Easily share insights across departments clients or leadership teams. Set granular permissions create workflows and control visibility. With built in comments and version history your entire team stays aligned and data literate with no extra tools needed.</p>
                    </div>
                    <button className="bg-black text-white rounded-lg p-2 px-6 cursor-pointer mt-4">Get Started</button>
                </motion.div>
            ),
        },
        {
            title: "05",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex flex-col items-baseline gap-2">
                    <div className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white font-medium shadow-md px-5 py-1 rounded-xl font-medium hover:shadow-lg transition w-[150px]">
                        {"Live Actions"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Act on Your Insights</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Move from insight to action in real time. Trigger automated reports sync filtered data to other tools or use built in webhooks to activate workflows. With decisions driven by live data your business becomes faster leaner and infinitely more scalable..</p>
                    </div>
                    <button className="bg-black text-white rounded-lg p-2 px-6 cursor-pointer mt-4">Get Started</button>
                </motion.div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
