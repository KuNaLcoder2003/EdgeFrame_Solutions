import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
const Links = [
    {
        id: 1,
        link: "Features"
    },
    {
        id: 2,
        link: "Benefits"
    },
    {
        id: 3,
        link: "Testimonials"
    },
    {
        id: 4,
        link: "FAQs"
    },
    {
        id: 5,
        link: "Pricing"
    },
]
const NavBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false)
    return (
        <nav className="fixed top-0 left-0 w-full z-100000 bg-white/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <div onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} className="flex items-center gap-2 cursor-pointer select-none realtive">
                    <img
                        src="./assets/edge_frame_enhanced.png"
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                    />
                    {
                        isHovered && <AnimatePresence>
                            <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl font-bold absolute -bottom-5">EdgeFrame-<span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent">Solutions</span></motion.p>
                        </AnimatePresence>
                    }
                </div>
                <ul className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">
                    {
                        Links.map(obj => {
                            return (
                                <li key={`${obj.id}_${obj.link}`} className="cursor-pointer hover:text-black transition">{obj.link}</li>
                            )
                        })
                    }
                </ul>
                <button className="hidden lg:block bg-white shadow-md px-5 py-2 rounded-xl font-medium hover:shadow-lg transition">
                    Book a Call
                </button>
                <div className="lg:hidden flex items-center">
                    <button
                        className="text-gray-700 focus:outline-none"
                        onClick={() => setOpen(!open)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.75h16.5M3.75 12h16.5m-16.5 6.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {
                open && <div className="lg:hidden bg-white/90 backdrop-blur-lg shadow-md px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
                    {
                        Links.map(obj => {
                            return (
                                <li key={`${obj.id}_${obj.link}`} className="cursor-pointer hover:text-black transition">{obj.link}</li>
                            )
                        })
                    }
                    <button className="bg-white shadow-md px-5 py-2 rounded-xl font-medium hover:shadow-lg transition w-max">
                        Book a Call
                    </button>
                </div>
            }
        </nav>
    )
}

export default NavBar;