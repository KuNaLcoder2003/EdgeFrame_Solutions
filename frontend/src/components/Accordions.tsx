import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
    {
        q: "How does the platform help me make better decisions?",
        a: "Your answer goes here..."
    },
    {
        q: "Is it easy to integrate with my existing tools?",
        a: "Your answer goes here..."
    },
    {
        q: "Do I need technical skills to use this platform?",
        a: "Your answer goes here..."
    },
    {
        q: "How quickly can I start seeing results?",
        a: "Your answer goes here..."
    },
    {
        q: "Is my data safe and secure?",
        a: "Your answer goes here..."
    },
    {
        q: "Can I customize the dashboards and reports?",
        a: "Your answer goes here..."
    },

    // Right Column
    {
        q: "Does the platform support team collaboration?",
        a: "Your answer goes here..."
    },
    {
        q: "What makes this different from other analytics tools?",
        a: "Your answer goes here..."
    },
    {
        q: "Can I track my progress over time?",
        a: "Your answer goes here..."
    },
    {
        q: "Is customer support available if I need help?",
        a: "Your answer goes here..."
    },
    {
        q: "Are there limits on data volume or users?",
        a: "Your answer goes here..."
    },
    {
        q: "Can I cancel my subscription anytime?",
        a: "Your answer goes here..."
    }
];

// Split into 2 equal columns
const left = faqs.slice(0, 6);
const right = faqs.slice(6);

function AccordionItem({ q, a }: any) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer transition-all"
            onClick={() => setOpen(!open)}>
            <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800">{q}</p>
                <Plus className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
            </div>

            {open && (
                <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function Accordion() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                    {left.map((item, index) => (
                        <AccordionItem key={index} q={item.q} a={item.a} />
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {right.map((item, index) => (
                        <AccordionItem key={index} q={item.q} a={item.a} />
                    ))}
                </div>
            </div>
        </div>
    );
}
