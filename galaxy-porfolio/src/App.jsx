import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Github, Linkedin, Mail, ExternalLink,
    Briefcase, Code2, User, MapPin,
    ChevronRight, Star, Globe, Database,
    Server, Cloud, Cpu, Terminal,
    Smartphone, Palette, Rocket, Sparkles
} from 'lucide-react';
import GalaxyBackground from './components/GalaxyBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import InteractiveCard from './components/InteractiveCard';
import SkillBadge from './components/SkillBadge';
import ProjectCard from './components/ProjectCard';
import ExperienceCard from './components/ExperienceCard';

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const personalInfo = {
        name: "Kathan Patel",
        title: "MCA Student • Gujarat Technological University",
        email: "patelkathan1384@gmail.com",
        location: "Ahmedabad, Gujarat, India",
        github: "https://github.com/kathan13patel",
        linkedin: "https://www.linkedin.com/in/kathan-patel-2a0458274/",
    };

    const skills = {
        languages: ["Python", "Javascript", "Python", "HTML/CSS"],
        frameworks: ["Django", "MERN", "React"],
        tools: ["Github", "VS Code", "Canva", "Draw.io", "MongoDB Compass"],
        libraries: ["Numpy", "Pandas", "Matplotlib"],
    };

    const projects = [
        {
            title: "The Wooden - E-Commerce Furniture Website",
            description:
                "A Django-based e-commerce website with product listings, cart functionality, user authentication, and order management.",
            tech: ["Python", "Django", "HTML", "CSS", "MySQL"],
            github: "https://github.com/kathan13patel/The_Wooden.git"
        },
        {
            title: "HotWheels - C2C Used Car Selling Platform",
            description:
                "A MERN stack web application for buying and selling second-hand cars with user authentication, car listings, and communication features.",
            tech: ["MongoDB", "Express", "React", "Node.js"],
            github: "https://github.com/kathan13patel/HotWheels.git"
        },
        {
            title: "Steganography chat application using multimedia",
            description:
                "A secure chat system using LSB steganography and AES encryption to hide messages inside images or audio while maintaining data confidentiality.",
            tech: ["Python", "Encryption", "Steganography", "React"],
            github: "https://github.com/kathan13patel/Steganography.git"
        },
    ];

    const experiences = [
        {
            company: "CreArt Solutions",
            position: "Web Development Intern (Python–Django)",
            period: "July 2023 – March 2024",
            description:
                "Completed final year project training in web development using Python and Django. Worked on the 'The Wooden' e-commerce project and gained practical exposure to real-world development processes. Showed strong dedication and a willingness to learn throughout the internship.",

            technologies: ["Python", "Django", "HTML", "CSS", "MySQL"],
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen text-white overflow-x-hidden">
            <div className="fixed inset-0 bg-black -z-20" />
            <GalaxyBackground />
            <div className="content-overlay" />

            <Header activeSection={activeSection} />

            <main className="relative z-10 py-10 px-6 sm:px-8 lg:px-16 xl:px-24">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 70%)", pointerEvents: "none", zIndex: -1, }} />
                    <div className="container mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto" >
                            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full"
                                style={{
                                    background: "rgba(50,50,50,0.55)",
                                    border: "2px solid rgba(255,255,255,0.15)",
                                    backdropFilter: "blur(12px)",
                                    boxShadow: "0 0 25px rgba(255,255,255,0.05)"
                                }}>
                                <Sparkles className="w-4 h-4" />
                                <span className="text-m">Welcome to my portfolio</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent tracking-widest"
                                style={{
                                    backgroundImage: `linear-gradient( 180deg, #f5f5f5 0%,#cfcfcf 15%, #9a9a9a 35%, #6b6b6b 55%,
                                        #3a3a3a 75%, #1a1a1a 100% )`,
                                    textShadow: ` 0 1px 1px rgba(255,255,255,0.25), 0 0 12px rgba(255,255,255,0.12),   
                                0 6px 14px rgba(0,0,0,0.85), 0 18px 40px rgba(0,0,0,0.95)       `,
                                    letterSpacing: "0.1em",
                                }}>
                                Kathan Patel
                            </h1>

                            <p className="text-xl md:text-xl font-semibold tracking-wide text-white mb-8"
                                style={{
                                    textShadow: "0 3px 12px rgba(0,0,0,0.8)"
                                }}>
                                {personalInfo.title}
                            </p>

                            <p className="text-xl md:text-2xl font-semibold tracking-wide text-white mb-8"
                                style={{
                                    textShadow: "0 3px 12px rgba(0,0,0,0.8)"
                                }}>
                                Learning and building modern digital experiences with a strong focus on usability and clean design.
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center mb-12">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#projects"
                                    className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors flex items-center gap-2" style={{
                                        textShadow: "0 2px 6px rgba(0,0,0,0.7)"
                                    }}>
                                    Get In Touch
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#projects"
                                    className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors flex items-center gap-2" style={{
                                        textShadow: "0 2px 6px rgba(0,0,0,0.7)"
                                    }}>
                                    View Projects
                                </motion.a>
                            </div>

                            <div className="flex justify-center gap-6">
                                {[
                                    { icon: Github, href: personalInfo.github, label: "GitHub" },
                                    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                                    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl border border-white/15"
                                        style={{
                                            background: "rgba(0,0,0,0.55)",
                                            backdropFilter: "blur(14px)",
                                            boxShadow: "0 10px 25px rgba(0,0,0,0.6)"
                                        }}
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-4">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="max-w-6xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                                About Me
                            </h2>

                            <div className="grid md:grid-cols-1 gap-8 items-center">
                                <InteractiveCard className="p-8">
                                    <div className="space-y-6 ">
                                        <h3 className="text-xl font-bold">Passionate MCA student building practical web applications using modern technologies.</h3>
                                        <p className="text-gray-300">
                                            I am currently pursuing my MCA (2024–2026)  after completing my BCA with 74% at Gujarat University During my studies, I have developed a good understanding of computer applications and problem-solving, which has helped me prepare for practical software development.
                                        </p>
                                        <p className="text-gray-300">
                                            I am an aspiring web developer with hands-on experience in Python, Django, and the MERN stack. I enjoy building simple, clean, and user-friendly web applications and learning how frontend and backend technologies work together. I enjoy working on practical solutions and enhancing my skills by building projects and exploring new technologies.
                                        </p>
                                    </div>
                                </InteractiveCard>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-20 px-4">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                                Skills & Technologies
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <InteractiveCard className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Terminal className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold">Languages</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.languages.map((skill, index) => (
                                            <SkillBadge key={index} skill={skill} />
                                        ))}
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Globe className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold">Frameworks</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.frameworks.map((skill, index) => (
                                            <SkillBadge key={index} skill={skill} />
                                        ))}
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Cpu className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold">Tools</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.tools.map((skill, index) => (
                                            <SkillBadge key={index} skill={skill} />
                                        ))}
                                    </div>
                                </InteractiveCard>

                                <InteractiveCard className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Database className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold">Libraries</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.libraries.map((skill, index) => (
                                            <SkillBadge key={index} skill={skill} />
                                        ))}
                                    </div>
                                </InteractiveCard>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-20 px-4">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                                Featured Projects
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project, index) => (
                                    <ProjectCard key={index} project={project} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-20 px-4">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                                Work Experience
                            </h2>

                            <div className="max-w-4xl mx-auto space-y-6">
                                {experiences.map((exp, index) => (
                                    <ExperienceCard key={index} experience={exp} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="pt-20 pb-10 px-4">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                                Get In Touch
                            </h2>

                            <InteractiveCard className="p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                                    <Mail className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Email</h4>
                                                    <a
                                                        href={`mailto:${personalInfo.email}`}
                                                        className="text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        {personalInfo.email}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                                    <MapPin className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Location</h4>
                                                    <p className="text-gray-400">{personalInfo.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                                    <Github className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Github</h4>
                                                    <a
                                                        href={`${personalInfo.github}`}
                                                        target="_blank"
                                                        className="text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        kathan13patel
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                                    <Linkedin className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">LinkedIn</h4>
                                                    <a
                                                        href={`${personalInfo.linkedin}`}
                                                        target="_blank"
                                                        className="text-gray-400 hover:text-primary  transition-colors"
                                                    >
                                                        Kathan Patel
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                                        <p className="text-gray-400 mb-6">
                                            I am open to new projects, learning opportunities, and collaborations in web development. Feel free to get in touch.
                                        </p>

                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={`mailto:${personalInfo.email}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 border bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                        >
                                            <Mail className="w-5 h-5"/>
                                            Send Email
                                        </motion.a>
                                    </div>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer personalInfo={personalInfo} />
        </div>
    );
}

export default App;