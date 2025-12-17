import React from 'react';
import { motion } from 'framer-motion';
import "./css/InteractiveCard.css";

export default function InteractiveCard({ children, className = '', onClick }) {
    return (
        <motion.div
            whileHove={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative bg-white/5 backdrop-blur-sm  border border-white/10 rounded-2xl  overflow-hidden hover:border-primary/30 transition-all duration-300 ${className} `}
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)", boxShadow: "0 10px 25px rgba(0,0,0,0.6)"}}>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}