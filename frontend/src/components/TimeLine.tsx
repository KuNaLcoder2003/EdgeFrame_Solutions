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
            className="w-full bg-white font-sans md:px-10"
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
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
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
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
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
                        {"Idea Discussion"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Start With a Call</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">SWe begin with a quick discovery call to understand your goals, challenges, and expectations.
                            This conversation helps us get clarity on what you want to build and why it matters.
                            You can walk us through your vision, features, and any references you have in mind.
                            By the end of the call, we’ll have a clear direction and an understanding of how to best help you.</p>
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
                        {"Project Planning"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Get a Clear Project Plan</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">After the call, we prepare a detailed project plan tailored to your requirements.
                            This includes the full scope of work, a realistic timeline, milestones, and delivery checkpoints.
                            We also include transparent pricing with no hidden costs, so you know exactly what you’re getting.
                            The goal is to ensure alignment before any work starts, giving you complete clarity and confidence.</p>
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
                        {"Work Begins"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Working on your project.</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Once the plan is approved, our team begins executing the project with a structured workflow.
                            We focus on building a strong foundation, ensuring quality and scalability from the start.
                            Every phase—design, development, testing—is handled with precision and best practices.
                            Your project moves forward smoothly with efficient communication and professional execution.</p>
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
                        {"Revisions"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Review & Collaborate</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Throughout the project, we keep you involved with regular progress updates and previews.
                            You can review work at each stage, share feedback, and request refinements anytime.
                            This collaborative, iterative process ensures the final result aligns perfectly with your expectations.
                            We treat your input as part of the development cycle—not as an afterthought.</p>
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
                        {"Final Delivery"}
                    </div>
                    <div className="flex flex-col items-baseline gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                        <h3 className="text-xl font-semibold w-full font-[InstrumentSerif]">Delivery & Support</h3>
                        <p className="font-light text-md text-stone-500 w-[80%]">Once everything is finalized and polished, we deliver clean files, optimized code, and documentation.
                            We ensure everything is fully functional, tested, and ready for real-world use.
                            Our team remains available for additional support, onboarding, or minor updates after launch.
                            You walk away with a dependable final product—and long-term support whenever you need it.</p>
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
