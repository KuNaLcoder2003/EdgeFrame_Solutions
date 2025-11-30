import type React from "react";
// import { useState } from 'react';
// import { motion } from 'framer-motion';
import SectionHeadings from "./SectionHeadings";
import BlurText from "./BlurText";
// import { Check } from "lucide-react";

// function PricingToggle({ isYearly, setIsYearly }: any) {


//     return (
//         <div className="flex items-center justify-center p-8">
//             <div className="flex items-center gap-6">
//                 {/* Monthly Label */}
//                 <motion.div
//                     className={`px-6 py-2 rounded-full font-semibold text-lg transition-colors ${!isYearly
//                         ? 'bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white shadow-lg'
//                         : 'bg-white text-gray-600'
//                         }`}
//                     animate={{
//                         scale: !isYearly ? 1 : 0.95,
//                     }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     Monthly
//                 </motion.div>

//                 {/* Toggle Switch */}
//                 <button
//                     onClick={() => setIsYearly(!isYearly)}
//                     className="relative w-20 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full shadow-inner cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
//                 >
//                     <motion.div
//                         className="absolute top-1 w-8 h-8 bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] rounded-full shadow-lg"
//                         animate={{
//                             x: isYearly ? 40 : 4,
//                         }}
//                         transition={{
//                             type: 'spring',
//                             stiffness: 500,
//                             damping: 30,
//                         }}
//                     />
//                 </button>

//                 {/* Yearly Label */}
//                 <motion.div
//                     className={`px-6 py-2 rounded-full font-semibold text-lg transition-colors ${isYearly
//                         ? 'bg-gradient-to-br from-[#A58FFF] via-[#3300FF] to-[#A58FFF] text-white shadow-lg'
//                         : 'bg-white text-gray-600'
//                         }`}
//                     animate={{
//                         scale: isYearly ? 1 : 0.95,
//                     }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     Yearly{' '}
//                     <span className="text-sm opacity-90">(-20%)</span>
//                 </motion.div>
//             </div>
//         </div>
//     );
// }

const Pricing: React.FC<{ ref: React.RefObject<null> }> = ({ ref }) => {
    // const [isYearly, setIsYearly] = useState(false);
    return (
        <div ref={ref} className="w-full flex flex-col items-center mb-12">
            <div>
                <SectionHeadings className="" badge="Pricing" heading={<h3>Choose The
                    <BlurText text="Right" delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-2xl mb-8" /> <br /> Plan For Your <BlurText text="Goals" delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8" /></h3>} subHeading={<p>Pick the plan that fits your needs today and scales <br /> effortlessly with your team</p>} />
            </div>

            <div className="w-full flex justify-center mt-10 px-6">
                <div className="bg-white rounded-2xl shadow-md p-10 max-w-xl w-full text-center">
                    <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                        Let's Discuss Your Pricing
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Every business has unique needs — get tailored pricing that fits you perfectly.
                        Book a quick call and we’ll guide you through the best plan.
                    </p>

                    <button
                        onClick={() => window.open("https://calendly.com/your-link", "_blank")}
                        className="bg-black text-white w-full py-4 rounded-xl font-medium hover:bg-gray-800 transition-all"
                    >
                        Book a Call →
                    </button>

                    <p className="mt-5 text-sm text-gray-400">Takes less than 30 seconds to schedule.</p>
                </div>
            </div>


            {/* <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
            <PricingCards isYearly={isYearly} /> */}

        </div>
    )
}

// function PricingCards({ isYearly }: any) {
//     const plans = [
//         {
//             name: 'Basic Plan',
//             description: 'Ideal for getting started.',
//             price: isYearly ? "$39" : '$49',
//             features: [
//                 '1 Dashboard',
//                 'Up to 10k data rows/month',
//                 'Basic charts & visualizations',
//                 'Community support'
//             ]
//         },
//         {
//             name: 'Pro Plan',
//             description: 'Perfect for Businesses',
//             price: isYearly ? "$39" : '$129',
//             features: [
//                 'Team collaboration',
//                 'Unlimited dashboards',
//                 'Up to 1M data rows/month',
//                 'Custom KPIs & advanced filters'
//             ],
//             highlighted: true
//         },
//         {
//             name: 'Business Pro Plan',
//             description: 'Built to scale.',
//             price: isYearly ? "$149" : '$185',
//             features: [
//                 'All Pro features',
//                 'Dedicated success manager',
//                 'SSO & user permissions',
//                 'SLA & compliance features'
//             ]
//         }
//     ];

//     return (
//         <div className="flex items-center justify-center p-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//                 {plans.map((plan, index) => (
//                     <div
//                         key={index}
//                         className={`bg-white rounded-2xl p-8 shadow-sm ${plan.highlighted ? 'ring-2 ring-blue-500' : ''
//                             }`}
//                     >
//                         <div className="mb-6">
//                             <h3 className="text-2xl font-semibold text-gray-900 mb-2">
//                                 {plan.name}
//                             </h3>
//                             <p className="text-gray-600">{plan.description}</p>
//                         </div>

//                         <div className="mb-6">
//                             <div className="text-4xl font-bold text-gray-900 mb-1">
//                                 {plan.price}
//                             </div>
//                             <div className="text-gray-600">Monthly Subscription</div>
//                         </div>

//                         <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-8">
//                             Get Started →
//                         </button>

//                         <div className="space-y-4 mb-8">
//                             <div className="font-medium text-gray-900">Includes:</div>
//                             {plan.features.map((feature, featureIndex) => (
//                                 <div key={featureIndex} className="flex items-start gap-3">
//                                     <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
//                                     <span className="text-gray-600">{feature}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="text-sm text-gray-400">
//                             You can easily cancel anytime.
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

export default Pricing;