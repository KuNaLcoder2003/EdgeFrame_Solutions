import type React from "react";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
// import Companies from "../components/Comapnies";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Questions";
import Pricing from "../components/Pricing";
import Projects from "../components/Projects";
import { useRef } from "react";
import { ReactLenis } from 'lenis/react'
import Footer from "../components/Footer";

const LandingPage: React.FC = () => {
    const FeaturesRef = useRef(null);
    const BenefitsRef = useRef(null);
    const ProjectRef = useRef(null);
    const TestimonialsRef = useRef(null);
    const FaqRef = useRef(null);
    const PricingRef = useRef(null);
    const HeroRef = useRef(null);
    const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className="overflow-x-hidden">
            <ReactLenis root />
            <NavBar
                FeaturesRef={FeaturesRef}
                BenefitsRef={BenefitsRef}
                ProjectRef={ProjectRef}
                TestimonialsRef={TestimonialsRef}
                FaqRef={FaqRef}
                PricingRef={PricingRef}
                HeroRef={HeroRef}
                scrollToSection={scrollToSection}
            />
            <div className="mt-50 h-auto flex flex-col items-center">
            </div>
            <div className="h-auto w-screen">
                <Hero ref={HeroRef} />
            </div>
            <Features ref={FeaturesRef} />
            {/* <Companies /> */}
            <Benefits ref={BenefitsRef} />
            <Projects ref={ProjectRef} />
            <Testimonials ref={TestimonialsRef} />
            {/* <Projects /> */}
            <Faq ref={FaqRef} />
            <Pricing ref={PricingRef} />
            <div className="flex items-center justify-center">
                <Footer />
            </div>
        </div>


    )
}

export default LandingPage;