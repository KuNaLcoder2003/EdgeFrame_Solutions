import type { ReactNode } from "react";
import type React from "react";


interface Props {
    badge: string,
    heading: ReactNode,
    subHeading: ReactNode,
}
const SectionHeadings: React.FC<Props> = ({ badge, heading, subHeading }) => {
    return (
        <div className="flex flex-col items-center mx-auto max-w-6xl gap-4">
            <div className="bg-white shadow-md px-5 py-2 rounded-xl font-medium hover:shadow-lg transition">
                {badge}
            </div>

            <div className="flex flex-col items-center gap-2 w-full p-1 lg:p-0 lg:min-w-3xl max-w-4xl">
                <h3 className="text-6xl font-semibold text-center w-full font-[InstrumentSerif]">{heading}</h3>
                <p className="font-light text-lg text-stone-500 text-center w-full">{subHeading}</p>
            </div>
        </div>
    )
}



export default SectionHeadings;