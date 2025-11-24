import type React from "react";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Companies from "../components/Comapnies";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Questions";
import Pricing from "../components/Pricing";

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
            <Companies />
            <Benefits />
            <Testimonials />
            <Faq />
            <Pricing />
        </div>
    )
}

export default LandingPage;