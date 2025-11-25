import type React from "react";
import SectionHeadings from "./SectionHeadings";
import { Monitor, Smartphone, Layout, Palette, Pen, Layers } from 'lucide-react';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact } from "react-icons/fa";
import { RiNextjsLine, RiTailwindCssLine, RiFlutterFill } from "react-icons/ri";
import { SiExpress, SiAdobeillustrator, SiKotlin, SiAndroidstudio, SiSwift } from "react-icons/si";
import { FiFramer, FiFigma } from "react-icons/fi";
import { DiPhotoshop } from "react-icons/di";
import BigNumber from "./BigNumbers";
import BlurText from "./BlurText";

const handleAnimationComplete = () => {
    console.log('Animation completed!');
};


const Features: React.FC<{ ref: React.RefObject<null> }> = ({ ref }) => {

    return (
        <div ref={ref} className="-mt-20">
            <SectionHeadings className="" badge="Services" heading={<h3>Transform Your <BlurText
                text="Idea"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8"
            /> <br /> Into a  <BlurText
                    text="Powerhouse"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-2xl mb-8"
                />  </h3>} subHeading={<p>Unlock solutions that enhance <br /> efficiency and drive seamless scaling</p>} />
            <DesignServices />
        </div>
    )
}




const ServiceCard = ({ title, description, tools, index }: any) => {

    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="group relative w-auto" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <AnimatePresence>
                {(isHovered) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 bg-white w-[300px] absolute -top-50 z-[10000] pointer-events-none rounded shadow-xl"
                    >
                        <img className="w-full" src={isHovered ? "https://framerusercontent.com/images/SeuW0isdZzw7ePfHrmB80aMIkCY.png?scale-down-to=256" : ""} alt="" />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-[200px] flex flex-col">
                <div className="flex flex-col items-start gap-4 relative">

                    <BigNumber children={`${index + 1}`} />

                    {/* Content */}
                    <div className="flex-1 min-w-0 z-[1000]">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3300FF] transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                            {description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {tools.map((tool: any, idx: any) => (
                                <div
                                    key={idx}
                                    className="px-2.5 py-1 bg-gradient-to-br from-[#A58FFF]/10 via-[#3300FF]/10 to-[#A58FFF]/10 rounded-full text-xs font-medium text-[#3300FF] border border-[#A58FFF]/20 hover:border-[#3300FF] transition-all duration-300 hover:scale-105 cursor-default"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



            </div>
        </motion.div>
    );
};

export function DesignServices() {
    const services = [
        {
            icon: Monitor,
            title: "Website design",
            description: "Engaging websites tailored to your brand, blending creativity with functionality for a captivating online presence.",
            tools: [<FaReact />, <RiNextjsLine />, <RiTailwindCssLine />, <SiExpress />]
        },
        {
            icon: Palette,
            title: "Logo design",
            description: "Unique logos crafted to reflect your brand's essence, leaving a memorable mark that resonates with your audience.",
            tools: [<SiAdobeillustrator />, <FiFramer />, <FiFigma />, <DiPhotoshop />]
        },
        {
            icon: Smartphone,
            title: "Mobile design",
            description: "Seamless mobile experiences that mirror your brand's identity, ensuring smooth performance on any device.",
            tools: [<SiAndroidstudio />, <SiKotlin />, <SiSwift />, <RiFlutterFill />]
        },
        {
            icon: Layers,
            title: "Branding",
            description: "Complete brand identity solutions to establish consistency across all platforms, fostering trust and recognition.",
            tools: [<SiAdobeillustrator />, <FiFramer />, <FiFigma />, <DiPhotoshop />]
        },
        {
            icon: Layout,
            title: "UI/UX Design",
            description: "Intuitive interfaces and user experiences that prioritize usability, enhancing engagement and conversion rates.",
            tools: [<SiAdobeillustrator />, <FiFramer />, <FiFigma />, <DiPhotoshop />]
        },
        {
            icon: Pen,
            title: "Illustrations",
            description: "Custom visuals that add personality and enhance communication, whether for digital or print media.",
            tools: [<SiAdobeillustrator />, <FiFramer />, <FiFigma />, <DiPhotoshop />]
        }
    ];

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-stagger">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            {...service}
                            delay={index * 100}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @keyframes stagger {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in { animation: fade-in 0.8s ease-out; }
                .animate-stagger > * { animation: stagger 0.6s ease-out backwards; }
            `}</style>
        </div>
    );
}

export default Features;



