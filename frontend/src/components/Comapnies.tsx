import { Star } from "lucide-react";
import type React from "react";


const Companies: React.FC = () => {
    return (
        <div className="max-w-7xl p-4 mx-auto mt-2">
            <div className="w-full mx-auto flex flex-col items-center gap-10">
                <div className="flex items-center gap-2 justify-center">
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                    <Star color="#3300FF" fill="#3300FF" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium text-center font-[InstrumentSerif]">"Finally, a <span className="font-thin font-[InstrumentSerif] bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent">Solution</span> <br />Our Entire Team actually Uses"</h2>
                <div className="flex items-center justify-start gap-2 shadow-md px-5 py-2 rounded-xl mt-4">
                    <img className="w-[50px] h-[40px] rounded-lg" src="https://framerusercontent.com/images/gs5jbKHETxtCaao9jObUIKuLqdI.png?scale-down-to=512&width=1200&height=897" />
                    <div className="font-[InstrumentSerif]">
                        Peter Design - CEO
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center gap-2">
                    <p className="font-light text-lg text-stone-500">Trusted by many comapanies</p>
                    <Slider />
                </div>
            </div>
        </div>
    )
}

function Slider() {
    const logos = [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png",
    ];

    const duplicated = [...logos, ...logos]; // Infinite effect

    return (
        <div className="relative w-[960px] h-[100px] overflow-hidden bg-white mx-auto">


            <div className="absolute left-0 top-0 h-full w-[200px] z-20 white-gradient-left"></div>


            <div className="absolute right-0 top-0 h-full w-[200px] z-20 white-gradient-right"></div>


            <div className="flex animate-scroll w-[calc(250px*14)]">
                {duplicated.map((src, i) => (
                    <div key={i} className="w-[250px] h-[100px] flex items-center">
                        <img src={src} className="w-[250px] h-[100px]" alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Companies;