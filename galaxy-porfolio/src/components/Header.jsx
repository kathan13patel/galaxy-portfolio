import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code2, Mail, Rocket } from 'lucide-react';
// import GalaxyLogo from "./GalaxyLogo";
import "./css/Header.css";

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Header({ activeSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
                <div className="container mx-auto px-4 py-4 sm:px-8 lg:px-16 xl:px-24">
                    <div className="flex items-center justify-between">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                            <div className="relative w-14 h-14 flex items-center justify-center" style={{ perspective: "900px" }}>
                                {/* MASTER ROTATING SYSTEM */}
                                <motion.div
                                    className="relative w-12 h-12"
                                    style={{ transformStyle: "preserve-3d" }}
                                    animate={{
                                        rotateZ: 360,
                                    }}
                                    transition={{
                                        duration: 40,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    {/* OUTER INFINITE ARC */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            border: "1.5px solid rgba(255,255,255,0.25)",
                                            filter: "blur(0.2px)",
                                        }}
                                        animate={{ rotateX: [60, 60], rotateZ: 360 }}
                                        transition={{
                                            rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
                                        }}
                                    />

                                    {/* MID ARC */}
                                    <motion.div
                                        className="absolute inset-[-6px] rounded-full"
                                        style={{
                                            border: "1px dashed rgba(255,255,255,0.2)",
                                            transform: "rotateX(75deg)",
                                        }}
                                        animate={{ rotateZ: -360 }}
                                        transition={{
                                            duration: 26,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    />

                                    {/* CORE PROCESSOR */}
                                    <motion.div
                                        className="absolute inset-[10px] rounded-full"
                                        style={{
                                            background: `
                                                radial-gradient(
                                                    circle at 30% 30%,
                                                    #ffffff 0%,
                                                    #cfcfcf 35%,
                                                    #7a7a7a 55%,
                                                    #1a1a1a 100%
                                                )
                                                `,
                                            boxShadow: `
                                                inset -6px -10px 16px rgba(0,0,0,0.9),
                                                inset 4px 4px 8px rgba(255,255,255,0.25),
                                                0 0 14px rgba(255,255,255,0.3),
                                                0 18px 32px rgba(0,0,0,0.95)
                                                `,
                                            transform: "translateZ(25px)",
                                        }}
                                        animate={{ scale: [1, 1.08, 1] }}
                                        transition={{
                                            duration: 3.2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    {[
                                        { x: 50, y: 20 },
                                        { x: 20, y: 50 },
                                        { x: 2, y: 2 }
                                    ].map((pos, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-[5px] h-[5px] rounded-full"
                                            initial={{
                                                x: pos.x,
                                                y: pos.y,
                                                opacity: 0.4,
                                            }}
                                            animate={{
                                                opacity: [0.4, 1, 0.4],
                                                scale: [0.9, 1.15, 0.9],
                                            }}
                                            transition={{
                                                duration: 1.8,
                                                delay: i * 0.35,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            style={{
                                                background: "radial-gradient(circle at 30% 30%, #dcdcdc, #2a2a2a)",
                                                boxShadow: "inset 0 0 8px rgba(255,255,255,0.15)",
                                                zIndex: 1,
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${activeSection === item.id
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </motion.button>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-white/10 
                            rounded-lg transition-colors">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-4 right-4 z-40 lg:hidden backdrop-blur-lg bg-black/90 border border-white/10 rounded-xl p-4"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`p-3 rounded-lg transition-all flex flex-col items-center gap-2 ${activeSection === item.id
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm">{item.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}