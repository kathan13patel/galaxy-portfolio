import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from "lucide-react";
import InteractiveCard from './InteractiveCard';
import SkillBadge from './SkillBadge';
// import "./css/ProjectCard.css";

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
        >
            <InteractiveCard className="h-full min-h-[150px]">
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-5 mt-5">
                                {project.tech.map((tech, i) => (
                                    <SkillBadge key={i} skill={tech} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-400 mb-6 flex-grow">
                        {project.description}
                    </p>

                    <div className="flex gap-3 mt-auto">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Code
                        </motion.a>
                    </div>
                </div>
            </InteractiveCard>
        </motion.div>
    );
}