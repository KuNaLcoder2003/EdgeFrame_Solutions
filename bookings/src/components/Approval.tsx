import type React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { User, Mail, Clock, Phone, Calendar, X } from 'lucide-react';

const Approval: React.FC = () => {

    const [requests, setRequests] = useState([])
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsIOpen] = useState<boolean>(false);
    const [selectedUser, setSlectedUser] = useState<any>({
        name: "",
        email: "",
        mobile: "",
        slot: "",
        date: "",
        id: ""
    })


    useEffect(() => {
        try {
            setLoading(true)
            fetch(import.meta.env.VITE_BACKEND_URL + '/bookingRequests').then(async (res: Response) => {
                const data = await res.json()
                if (data.requests) {
                    setRequests(data.requests)
                    console.log(requests);
                    setLoading(false);
                } else {
                    // Handle Error
                    setLoading(false);
                }
            })
        } catch (error) {
            // handle error 
            setLoading(false);
        }
    }, [])


    const generateMeeting = () => {
        try {
            console.log(selectedUser)
        } catch (error) {

        }
    }


    return (
        <div className="">
            {
                loading ?
                    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

                        <div className="flex space-x-2 animate-pulse">
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>

                    </div> : <>
                        {
                            isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">


                                <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-gray-200">


                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                            Approve Booking
                                        </h2>
                                        <X className="cursor-pointer" onClick={() => {
                                            setIsIOpen(false);
                                            setSlectedUser(
                                                {
                                                    name: "",
                                                    email: "",
                                                    mobile: "",
                                                    slot: "",
                                                    date: "",
                                                    id: ""
                                                }
                                            )
                                        }} />
                                    </div>


                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Enter code to approve
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-5"
                                        placeholder="Enter approval code"
                                    />


                                    <button onClick={() => generateMeeting()} className="w-full bg-black text-white py-2.5 rounded-xl font-medium hover:bg-gray-900 transition cursor-pointer">
                                        Generate Meeting
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="mb-15 relative w-[90%] m-auto mt-5 flex items-center justify-between">
                            <div onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} className="flex items-center gap-2 cursor-pointer select-none realtive">
                                <img

                                    src="./edge_frame_enhanced.png"
                                    alt="Logo"
                                    className="w-16 h-16 object-contain"
                                />
                                {
                                    isHovered && <AnimatePresence>
                                        <motion.p
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-3xl font-bold absolute -bottom-10 z-1000">EdgeFrame-<span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent">Solutions</span></motion.p>
                                    </AnimatePresence>
                                }
                            </div>
                            <div>
                                <h1 className="text-5xl font-semibold font-[Interserif]">Bookings <span className="bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] bg-clip-text text-transparent">Approval</span></h1>
                            </div>

                        </div>

                        <div className="flex flex-col gap-2">

                            {
                                requests.map((obj: any) => {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35 }}
                                            className="w-[95%] m-auto px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm border border-white/5"
                                        >
                                            {/* single-line layout: use flex with gap and separators */}
                                            <div className="flex items-center gap-4 overflow-x-auto text-sm text-slate-100">
                                                <Item icon={<User className="w-4 h-4" color="Blue" />} label="ID" value={"IOPWID6777"} />
                                                <Divider />
                                                <Item icon={<Mail className="w-4 h-4" color="Blue" />} label="Email" value={"kunalindia59@gmail.com"} truncate />
                                                <Divider />
                                                <Item icon={<Clock className="w-4 h-4" color="Blue" />} label="Slot" value={"11:00-12:00"} />
                                                <Divider />
                                                <Item icon={<Phone className="w-4 h-4" color="Blue" />} label="Mobile" value={"8302696878"} />
                                                <Divider />
                                                <Item icon={<Calendar className="w-4 h-4" color="Blue" />} label="Date" value={"24/12/2025"} />
                                                <Divider />
                                                <Item icon={<User className="w-4 h-4" color="Blue" />} label="Name" value={"Kunal Singh"} compact={"Kunal Singh"} />
                                                <button
                                                    onClick={() => {
                                                        setIsIOpen(true)
                                                        setSlectedUser({
                                                            name: obj.name,
                                                            email: obj.email,
                                                            slot: obj.slot,
                                                            date: obj.date,
                                                            mobile: obj.mobile,
                                                            id: obj.id
                                                        })
                                                    }}
                                                    className="ml-auto px-4 py-2 rounded-xl bg-black cursor-pointer transition font-medium whitespace-nowrap shadow-md shadow-indigo-900/30"
                                                >
                                                    Approve
                                                </button>
                                            </div>

                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                    </>
            }
        </div>
    )
}

function Item({ icon, label, value, truncate = false, compact = false }: any) {
    return (
        <div className={`flex items-center gap-2 min-w-[120px] ${compact ? 'min-w-[90px]' : ''}`}>
            <div className="p-1 rounded-md bg-blac/20">
                {icon}
            </div>
            <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-black uppercase tracking-wide">{label}</span>
                <span className={`text-sm font-medium text-indigo-400 ${truncate ? 'truncate max-w-[220px]' : ''}`}>{value}</span>
            </div>
        </div>
    );
}

function Divider() {
    return <div className="w-px h-8 bg-black/10 mx-2" />;
}


export default Approval;