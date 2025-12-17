import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building, ChevronRight } from 'lucide-react';
import InteractiveCard from './InteractiveCard';
import SkillBadge from './SkillBadge';
// import "./css/ExperienceCard.css";

export default function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <InteractiveCard>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">{experience.company}</h3>
              </div>
              <h4 className="text-lg text-gray-300 mb-2">{experience.position}</h4>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{experience.period}</span>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6">
            {experience.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => ( 
                <SkillBadge key={i} skill={tech} />
            ))}
          </div>
        </div>
      </InteractiveCard>
    </motion.div>
  );
}