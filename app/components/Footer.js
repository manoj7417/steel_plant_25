'use client';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="py-16 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Metal Traders & Processing Co.</h3>
                        <p className="text-gray-300 mb-4">Advanced iron and steel processing operations with cutting-edge technology and comprehensive safety protocols.</p>
                        <div className="flex space-x-4">
                            <a
                                href="https://twitter.com"
                                className="text-gray-400 hover:text-white transition-colors"
                                target="_blank"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.instagram.com"
                                className="text-gray-400 hover:text-white transition-colors"
                                target="_blank"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                className="text-gray-400 hover:text-white transition-colors"
                                target="_blank"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="hover:text-white transition-colors text-left"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="hover:text-white transition-colors text-left"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="hover:text-white transition-colors text-left"
                                >
                                    Our Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('processes')}
                                    className="hover:text-white transition-colors text-left"
                                >
                                    Our Processes
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('safety')}
                                    className="hover:text-white transition-colors text-left"
                                >
                                    Safety Standards
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('clients')}
                                    className="hover:text-white transition-colors text-left"
                                >
                                    Our Clients
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Services</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li>Hot Slag Processing</li>
                            <li>Tundish Operations</li>
                            <li>Material Segregation</li>
                            <li>CCP Pot Management</li>
                            <li>Lancing Operations</li>
                            <li>Dumping Yard Operations</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                24/7 Operations
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Expert Team
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Quality Assurance
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Safety First
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            © 2025 Metal Traders & Processing Co. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
                            >
                                Contact Us
                            </button>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 