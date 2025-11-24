
import { motion } from "framer-motion"
export default function BigNumber({ className = "absolute -right-5", children = "1", ariaLabel = "Large number 1" }) {
    return (
        <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.7, delay: 1 }}
            aria-label={ariaLabel}
            className={
                `text-[144px] font-bold leading-[0.7] text-[#EEF0FA] select-none ${className}`
            }
            style={{ fontFamily: '"Geist", sans-serif' }}
        >
            {children}
        </motion.p>
    );
}