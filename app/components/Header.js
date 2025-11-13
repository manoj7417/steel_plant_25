'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        // Set initial state
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent'
            }`}>
            <nav className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/1-removebg.png"
                            alt="Steel Plant Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className={`text-2xl font-bold transition-colors duration-500 ${isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'}`}>
                            Metal Traders & Processing Co.
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('home')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('services')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => scrollToSection('processes')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Processes
                        </button>
                        <button
                            onClick={() => scrollToSection('safety')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Safety
                        </button>
                        <button
                            onClick={() => scrollToSection('clients')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Clients
                        </button>
                        <Link
                            href="/blogs"
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Blog
                        </Link>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                        >
                            Contact
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            className={`transition-all duration-300 hover:scale-110 ${isScrolled
                                ? 'text-gray-700 hover:text-orange-600'
                                : 'text-white hover:text-orange-300 drop-shadow-md'
                                }`}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}