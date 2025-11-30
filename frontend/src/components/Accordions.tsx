import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
    {
        q: "What services does EdgeFrame Solutions offer?",
        a: "We specialize in Web & Mobile App Development, AI Workflows (using n8n and custom pipelines), LLM Solutions (chatbots and RAG systems), and Computer Vision (verification and OCR). We focus on building stable, scalable software rather than rushed MVPs."
    },
    {
        q: "Can EdgeFrame build custom AI tools for my business?",
        a: "Yes. We build everything from domain-specific AI copilots to automated workflows. Whether you need an AI that answers customer support queries based on your internal data or a system that automates document processing, we engineer custom solutions to fit your needs."
    },
    {
        q: "Does EdgeFrame work with Computer Vision?",
        a: "Yes. We engineer computer vision solutions for object detection, quality checks, and verification tools. We also build OCR (Optical Character Recognition) pipelines to digitize and analyze physical documents automatically."
    },
    {
        q: "Can you run AI models locally for privacy?",
        a: "Yes. We can deploy fully local AI systems that run on your own infrastructure. This ensures that sensitive data never leaves your servers, which is critical for industries with strict compliance or privacy requirements."
    },


    {
        q: "What is n8n and how do you use it?",
        a: "n8n is a workflow automation tool. We use it to connect your different software apps (like your CRM, email, and database) with AI agents. This allows us to automate complex back-office tasks without writing massive amounts of custom maintenance code."
    },
    {
        q: "How long does it take to build an MVP?",
        a: "Most MVPs (Minimum Viable Products) take between 3 to 8 weeks to launch, depending on complexity. We focus on 'quality engineering,' meaning we might take a few extra days to ensure the system is stable, so it doesn’t crash when you start scaling."
    },
    {
        q: "Do you fix existing apps that are broken or slow?",
        a: "Yes. We often work with clients facing 'tech debt.' We can audit your current codebase, optimize performance, fix breaking workflows, and refactor the system so it can handle real user growth."
    },
    {
        q: "How do I start a project with EdgeFrame?",
        a: "You can reach us directly through our email. We will set up a discovery call to review your technical requirements and discuss how we can engineer a solution that lasts."
    },
];

// Split into 2 equal columns
const left = faqs.slice(0, 4);
const right = faqs.slice(4);

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
