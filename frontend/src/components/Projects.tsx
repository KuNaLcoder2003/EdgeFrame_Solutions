import type React from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";

interface Props {
    ref: React.RefObject<null>
}
const Projects: React.FC<Props> = ({ ref }) => {
    return (
        <div ref={ref}>
            <Example />
        </div>
    )
}
const Example = () => {
    return (
        <div className="bg-transaparent mx-auto mt-20 max-w-8xl -mb-50">
            <SectionHeadings className="-mb-20" badge="Projects" heading={<h3>A Collection of <BlurText
                text="Projects"
                delay={150}
                animateBy="words"
                direction="top"

                className="text-2xl mb-8"
            /> <br /> Built with  <BlurText
                    text="Precision and Passion"
                    delay={150}
                    animateBy="words"
                    direction="top"

                    className="text-2xl mb-8"
                />  </h3>} subHeading={<p>Every project is crafted with clarity, performance <br /> and user experience at the core</p>} />
            <HorizontalScrollCarousel />
        </div>
    );
};
const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Adjust transform range if needed
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
    useSpring(x, {
        damping: 20,     // resistance (higher = less oscillation)
        stiffness: 10,  // speed (higher = snappier)
        mass: 0.3,       // lower = lighter motion
    });

    return (
        <section
            ref={targetRef}
            className="relative h-[125vh]" // reduced height
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-transparent z-[90]">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};
const Card = ({ card }: any) => {
    return (
        <div
            key={card.id}
            className="group relative h-[350px] w-[700px] overflow-hidden border border-neutral-200 rounded-xl"
        >
            {/* <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div> */}
            <img src={card.url} className="object-cover h-full w-full" />
            {/* <div className="absolute inset-0 z-10 grid place-content-center">
                <p className="bg-white/40 p-4 text-4xl font-black uppercase text-black backdrop-blur-sm rounded-lg">
                    {card.title}
                </p>
            </div> */}
        </div>
    );
};
const cards = [
    { url: "https://framerusercontent.com/images/d29CnpfyTPjz2QD93CqWDy3lW0.png", title: "Title 1", id: 1 },
    { url: "https://framerusercontent.com/images/QyxSfWbqpXIxJThv4PN3W09Xuoo.png", title: "Title 2", id: 2 },
    { url: "https://framerusercontent.com/images/NG72MSdIwX2XKu3AGU6z09ZsTqE.png", title: "Title 3", id: 3 },
    { url: "https://framerusercontent.com/images/QOOvVUDrsCHb6NNj1HE5qVf7pRU.png", title: "Title 4", id: 4 },
    { url: "https://framerusercontent.com/images/QyxSfWbqpXIxJThv4PN3W09Xuoo.png", title: "Title 4", id: 5 },
    { url: "https://framerusercontent.com/images/d29CnpfyTPjz2QD93CqWDy3lW0.png", title: "Title 4", id: 6 },

];

export default Projects;