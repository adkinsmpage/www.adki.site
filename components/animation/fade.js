'use client'

import { motion } from "framer-motion";

function Fade({ children, duration=0.8, ease="easeIn" }) {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, ease }}
        className="max-w-4xl mx-auto"
    >
        {children}
    </motion.div>
}

export default Fade