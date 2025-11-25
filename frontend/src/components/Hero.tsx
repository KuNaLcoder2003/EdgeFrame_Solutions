import type React from "react";
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";

const Hero: React.FC<{ ref: React.RefObject<null> }> = ({ ref }) => {
    return (
        <div ref={ref} className="max-w-7xl mx-auto px-6 py-4 relative h-screen">
            <div className="min-w-full">
                <HeroText />


                <motion.div
                    className="lg:visible absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/4 z-[-10] pointer-events-none h-auto"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="relative hidden lg:block">
                        {/* soft glow effect */}
                        <img
                            src="/assets/hero.avif"
                            alt="Hero Graphic"
                            className="relative opacity-95"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const HeroText = () => {
    return (
        <div className="flex flex-col items-baseline gap-8 w-full">

            <motion.div initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 1.3 }} className="w-[200px] flex items-start gap-2 inset-shadow-xs py-[0.8px] rounded-full">
                <div className="inline-flex items-center justify-center rounded-[19.63px] border border-white/60 px-4 py-1 bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF]">
                    <p className="text-white text-sm font-medium">New</p>
                </div>

                <p className="font-light text-lg">Spots Open</p>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                className="text-[60px] md:text-[72px] w-screen lg:w-[60%] leading-none font-[Inter] font-semibold">
                <p>
                    Transform your <br className="hidden lg:block" />


                    <span className="font-[InstrumentSerif] bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">
                        Ideas
                    </span>


                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                        className="inline-flex w-20 h-20 align-middle rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 items-center justify-center">
                        <span className="p-2 rounded-xl bg-white/10 shadow-[0_0_30px_10px_rgba(167,139,250,0.3)]">
                            <DiamondIcon />
                        </span>
                    </motion.span>

                    into Quick <br className="hidden lg:block" />
                    Actionable{" "}
                    <span className="font-[InstrumentSerif] bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">
                        Solutions
                    </span>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                className="font-light text-lg text-stone-500 w-[400px] lg:w-[500px]">
                <p>Unlock insights, drive decisions, and accelerate your business with intelligent data solutions.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                className="flex items-center gap-4">
                <button className="bg-black text-white rounded-lg p-3 px-10 cursor-pointer">Book a call</button>
                <button className="bg-gray-100 text-black rounded-lg p-3 px-10 cursor-pointer">See Pricing</button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
                className="flex flex-col items-baseline gap-1">
                <p className="text-md font-thin">Trusted by many</p>
                <div className="flex items-center">
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                    <StarHalf color="#3300FF" fill="#3300FF" />
                    <p>4.5</p>
                </div>
            </motion.div>

        </div>
    );
};

export const DiamondIcon = () => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_20px_rgba(140,105,255,0.5)] w-10 h-10"
        >
            <path d="M50 5 L80 55 L20 55 Z" fill="url(#grad1)" />
            <path d="M80 55 L50 95 L50 55 Z" fill="url(#grad2)" />
            <path d="M20 55 L50 95 L50 55 Z" fill="url(#grad3)" />

            <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#8FA2FF" />
                    <stop offset="1" stopColor="#5F4BFF" />
                </linearGradient>

                <linearGradient id="grad2" x1="0" y1="1" x2="1" y2="0">
                    <stop stopColor="#4A2BFF" />
                    <stop offset="1" stopColor="#BBAFFF" />
                </linearGradient>

                <linearGradient id="grad3" x1="1" y1="1" x2="0" y2="0">
                    <stop stopColor="#C0B8FF" />
                    <stop offset="1" stopColor="#4A2BFF" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Hero;
