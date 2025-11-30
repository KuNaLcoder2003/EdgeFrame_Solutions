import { useState, type ChangeEvent } from "react";

interface Slot {
    time: string;
    booked: boolean;
}

interface FormState {
    name: string;
    email: string;
    mobile: string;
    org: string;
    country: string;
    projectReq: string;
    day: string;
}

export default function BookConsultation() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        mobile: "",
        org: "",
        country: "",
        projectReq: "",
        day: "",
    });

    const [slots, setSlots] = useState<Slot[]>([]);

    // Example slot data (Replace with API call)
    const slotData: Record<string, Slot[]> = {
        Monday: [
            { time: "10:00 AM", booked: false },
            { time: "1:00 PM", booked: true },
            { time: "4:00 PM", booked: false },
        ],
        Tuesday: [
            { time: "11:00 AM", booked: false },
            { time: "3:00 PM", booked: false },
        ],
        Wednesday: [
            { time: "9:00 AM", booked: true },
            { time: "2:00 PM", booked: true },
            { time: "5:00 PM", booked: false },
        ],
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "day") {
            setSlots(slotData[value] || []);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 p-10 gap-12">
            {/* LEFT SIDE TEXT */}
            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-6xl font-bold text-gray-900 leading-tight font-[InstrumentSerif]">
                    Book a <span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">Consultation</span> with <br /> Edge<span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">Frame</span> Solutions
                </h1>

                <p className="text-gray-600 mt-4 text-lg max-w-md">
                    Get guidance for your project, product, or engineering roadmap.
                </p>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-4xl text-gray-800 mb-6">
                    <div className="flex items-center gap-4">
                        <img
                            src="./edge_frame_enhanced.png"
                            alt="Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <p className="text-4xl font-bold">Edge<span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent font-thin">Frame</span> Solutions
                        </p>
                    </div>
                </h2>

                <div className="space-y-5">


                    {/* NAME */}
                    <div>
                        <label className="font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MOBILE */}
                    <div>
                        <label className="font-medium text-gray-700">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* ORGANISATION */}
                    <div>
                        <label className="font-medium text-gray-700">Organisation</label>
                        <input
                            type="text"
                            name="org"
                            value={form.org}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* COUNTRY */}
                    <div>
                        <label className="font-medium text-gray-700">Country</label>
                        <select
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Country</option>
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                            <option>Canada</option>
                            <option>UAE</option>
                        </select>
                    </div>

                    {/* PROJECT REQUIREMENTS */}
                    <div>
                        <label className="font-medium text-gray-700">Project Requirements</label>
                        <textarea
                            name="projectReq"
                            value={form.projectReq}
                            onChange={handleChange}
                            rows={4}
                            className="w-full mt-2 p-3 border rounded-xl resize-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* DAY DROPDOWN */}
                    <div>
                        <label className="font-medium text-gray-700">Select Day</label>
                        <select
                            name="day"
                            value={form.day}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Day</option>
                            {Object.keys(slotData).map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SLOT DISPLAY */}
                    {form.day && (
                        <div className="mt-4">
                            <p className="text-gray-700 font-medium mb-2">
                                Available Slots ({form.day})
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {slots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-xl text-center text-sm font-semibold cursor-pointer
                                            ${slot.booked
                                                ? "bg-red-200 text-red-700 line-through cursor-not-allowed"
                                                : "bg-green-200 text-green-700 hover:bg-green-300"
                                            }
                                        `}
                                    >
                                        {slot.time}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 text-lg">
                    Continue →
                </button>
            </div>
        </div>
    );
}
