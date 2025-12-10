

export default function ThankYou() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 text-center font-[InstrumentSerif]">
            <div className="max-w-5l w-full flex flex-col items-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">
                    <span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">Thank You</span> for booking a slot with <span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">us</span>
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    We have recorded your request. You will shortly receive an email with
                    all the meeting details.
                </p>

                <div className="flex items-center gap-4 m-auto">
                    <img

                        src="./edge_frame_enhanced.png"
                        alt="Logo"
                        className="w-16 h-16 object-contain"
                    />
                    <p className="text-4xl font-bold">Edge<span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">Frame</span> Solutions</p>
                </div>
                <div className="flex items-center gap-1 m-auto mt-10">
                    <p className="text-gray-600 text-lg mb-8">
                        For any queries mail us at
                    </p>
                    <p className="text-blue-600 text-lg mb-8 underline"> 1.edgeframesolutions@gmail.com</p>
                </div>
            </div>
        </div>
    );
}
