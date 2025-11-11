'use client';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

export default function ProcessesSection() {
    const [animatedItems, setAnimatedItems] = useState({});
    const sectionRef = useRef(null);

    const processes = [
        {
            id: 1,
            title: "Hot Slag Digging",
            description: "Advanced excavation techniques with specialized equipment and comprehensive safety protocols for handling high-temperature materials.",
            feature: "Temperature monitoring",
            image: "/14.jpg",
            color: "orange"
        },
        {
            id: 2,
            title: "Tundish Skull Operations",
            description: "Precision loosening and handling of tundish skull with advanced tools and controlled procedures for optimal material flow.",
            feature: "Mechanical loosening",
            image: "/15.jpg",
            color: "orange"
        },
        {
            id: 3,
            title: "CCP Pot Management",
            description: "Continuous casting pot operations with real-time monitoring and advanced control systems for consistent quality output.",
            feature: "Real-time monitoring",
            image: "/16.jpg",
            color: "orange"
        },
        {
            id: 4,
            title: "Segregation",
            description: "Advanced material segregation through controlled boiling processes and enrichment techniques for optimal material separation.",
            feature: "Optimal Material Separation",
            image: "/17.jpg",
            color: "orange"
        },
        // {
        //     id: 5,
        //     title: "Lancing Operations",
        //     description: "Precision lancing methods for material processing with advanced quality control measures and safety protocols.",
        //     feature: "Precision cutting",
        //     image: "/18.jpg",
        //     color: "orange"
        // },
        // {
        //     id: 6,
        //     title: "Dumping Yard Operations",
        //     description: "Organized dumping procedures with environmental protection and comprehensive safety protocols for waste management.",
        //     feature: "Environmental protection",
        //     image: "/19.jpg",
        //     color: "purple"
        // },
        // {
        //     id: 7,
        //     title: "Material Handling",
        //     description: "Advanced material handling and transportation systems with automated equipment and safety protocols.",
        //     feature: "Automated systems",
        //     image: "/20.jpg",
        //     color: "indigo"
        // }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const processId = entry.target.dataset.processId;
                        setAnimatedItems(prev => ({
                            ...prev,
                            [processId]: true
                        }));
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
        );

        const processElements = document.querySelectorAll('[data-process-id]');
        processElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const getColorClasses = (color) => {
        const colors = {
            orange: "bg-orange-500",
            blue: "bg-blue-500",
            green: "bg-green-500",
            yellow: "bg-yellow-500",
            red: "bg-red-500",
            purple: "bg-purple-500",
            indigo: "bg-indigo-500"
        };
        return colors[color] || "bg-gray-500";
    };

    const getDotColor = (color) => {
        const colors = {
            orange: "bg-orange-500",
            blue: "bg-blue-500",
            green: "bg-green-500",
            yellow: "bg-yellow-500",
            red: "bg-red-500",
            purple: "bg-purple-500",
            indigo: "bg-indigo-500"
        };
        return colors[color] || "bg-gray-500";
    };

    return (
        <section id="processes" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Processes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Advanced iron and steel processing operations with cutting-edge technology and comprehensive safety protocols
                    </p>
                </div>

                <div className="space-y-16">
                    {processes.map((process, index) => (
                        <div
                            key={process.id}
                            data-process-id={process.id}
                            className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className={`relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg group transition-all duration-1000 ease-out ${animatedItems[process.id]
                                    ? 'transform translate-x-0 opacity-100'
                                    : `transform ${index % 2 === 1 ? 'translate-x-full' : '-translate-x-full'} opacity-0`
                                    }`}>
                                    <Image
                                        src={process.image}
                                        alt={process.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2">
                                <div className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${animatedItems[process.id]
                                    ? 'transform translate-x-0 opacity-100'
                                    : `transform ${index % 2 === 1 ? '-translate-x-full' : 'translate-x-full'} opacity-0`
                                    }`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 ${getColorClasses(process.color)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                                            {process.id}
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">{process.title}</h3>
                                    </div>

                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {process.description}
                                    </p>

                                    <div className="flex items-center space-x-3">
                                        <span className={`w-3 h-3 ${getDotColor(process.color)} rounded-full`}></span>
                                        <span className="text-gray-700 font-medium">{process.feature}</span>
                                    </div>

                                    <div className="pt-4">
                                        <div className={`w-16 h-1 ${getColorClasses(process.color)} rounded-full`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 