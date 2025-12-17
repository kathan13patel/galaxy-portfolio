import React from 'react';
import { motion } from 'framer-motion';
// import "./css/SkillBadge.css";

export default function SkillBadge({ skill, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.3 }
      }}
      className="inline-flex items-center px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-full hover:border-primary/50 transition-all"
    >
      {skill}
    </motion.span>
  );
}