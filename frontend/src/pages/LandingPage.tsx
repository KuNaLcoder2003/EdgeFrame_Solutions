import type React from "react";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

const LandingPage: React.FC = () => {
    return (
        <div className="overflow-x-hidden">
            <NavBar />
            <div className="mt-50 h-auto flex flex-col items-center">
            </div>
            <div className="h-auto w-screen">
                <Hero />
            </div>
            <Features />
        </div>
    )
}

export default LandingPage;