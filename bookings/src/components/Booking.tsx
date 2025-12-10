import { useEffect, useState, type ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// interface Slot {
//     time: string;
//     booked: boolean;
// }

interface FormState {
    name: string;
    email: string;
    mobile: string;
    org: string;
    country: string;
    projectReq: string;
    day: string;
    slot: string
}


interface Country {
    flag: string
    name: string
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BookConsultation() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        mobile: "",
        org: "",
        country: "",
        projectReq: "",
        day: "",
        slot: "",
    });

    const navigate = useNavigate();
    const slots_arr = ["11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "16:00 - 17:00", "18:00 - 19:00", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 00:00", "00:00 - 1:00", "1:00 - 2:00"]

    const [slots, setSlots] = useState<String[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    const getSlotsAndCountries = async () => {

        const response = await fetch(`${BACKEND_URL}/details`);
        const data = await response.json();
        if (!data || !response) {

        } else if (!data.valid) {

        } else {

            setCountries(data.countries);
        }
    }
    useEffect(() => {
        getSlotsAndCountries();
    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {

            const body = JSON.stringify({
                name: form.name,
                email: form.email,
                date: form.day,
                mobile: form.mobile,
                country: form.country,
                organisation: form.org,
                project_req: form.projectReq,
                slot: form.slot
            })

            console.log("body is ", body)

            const response = await fetch(BACKEND_URL + "/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            })
            const data = await response.json()
            if (data.valid) {
                navigate("/thankyou")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went worng")
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 p-10 gap-12">
            <Toaster />

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
                            {
                                countries.map((country, index) => {
                                    return (
                                        <option value={country.name} key={`${country.name}_${index + 1}`} className="flex items-center gap-2">
                                            <img src={country.flag} />
                                            <p>{country.name}</p>
                                        </option>
                                    )
                                })
                            }
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
                    <div>
                        <label className="font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            name="day"
                            placeholder="Select Date"
                            value={form.day}
                            onChange={(e) => { handleChange(e); setSlots(slots_arr); }}
                            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {
                        slots.length == 0 ? <p className="text-gray-600 mt-4 text-lg max-w-md">No slots Available</p> : <div className="mt-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {slots.map((slot: any, index: number) => (
                                    <div
                                        onClick={() => setForm({
                                            ...form,
                                            slot: slot
                                        })}
                                        key={index}
                                        className={`p-3 rounded-xl text-center text-sm font-semibold cursor-pointer bg-green-200 text-green-700 hover:bg-green-300`}
                                    >
                                        {slot}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                </div>

                <button onClick={handleSubmit} className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 text-lg">
                    Continue →
                </button>
            </div>
        </div>
    );
}
