import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
// import "./css/Footer.css";

export default function Footer({ personalInfo }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-black/50">
            <div className="container mx-auto px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
                <div className="border-white/10 text-center text-gray-400">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p>
                            © {currentYear} {personalInfo.name}. Built while learning and growing as a developer.
                        </p>
                        <p className="flex items-center gap-2">
                            MCA • Gujarat Technological University
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}