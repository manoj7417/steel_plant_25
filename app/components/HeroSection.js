'use client';
import Image from "next/image";

export default function HeroSection() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://geniescareerhubbucket.lon1.cdn.digitaloceanspaces.com/sample-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 z-10"></div>

            {/* Sparks Effect */}
            <div className="absolute inset-0 z-5">
                <div className="absolute left-1/4 top-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute left-1/3 top-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute left-1/2 top-2/3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="absolute left-2/3 top-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="absolute left-3/4 top-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute left-1/5 top-1/3 w-1 h-1 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="absolute left-2/5 top-2/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse"></div>
                <div className="absolute left-4/5 top-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
            </div>

            {/* Industrial Equipment Silhouettes */}
            <div className="absolute inset-0 z-10 opacity-20">
                <div className="absolute left-1/4 top-1/2 w-32 h-32 bg-gray-700 rounded-full blur-sm"></div>
                <div className="absolute right-1/4 top-1/3 w-24 h-24 bg-gray-600 rounded-full blur-sm"></div>
                <div className="absolute left-1/3 bottom-1/4 w-20 h-20 bg-gray-800 rounded-full blur-sm"></div>
            </div>

            <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
                        Making Steel World Competitive
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light max-w-4xl mx-auto leading-relaxed">
                        The steel plant is a lean, green, recycling machine - making new steel from recycled steel scrap.
                        Enough iron and steel is recycled each year to save the nation 74% of the energy!
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg cursor-pointer"
                    >
                        CONTACT NOW
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="border-2 border-white hover:bg-white hover:text-black text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg text-lg cursor-pointer"
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-15"></div>
        </section>
    );
} 