'use client';
import Image from "next/image";

export default function SafetySection() {
    return (
        <section id="safety" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/10.jpg"
                    alt="Safety Background"
                    fill
                    className="object-cover"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform'
                    }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Safety First
                    </h2>
                    <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        MPC Matal Traders & Processing Co. - Safety is of Primordial Importance for us
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                    {/* Left Side - Two Images Stacked */}
                    <div className="order-2 lg:order-1">
                        <div className="space-y-6 h-full flex flex-col justify-center">
                            {/* First Image */}
                            {/* <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/8.jpg"
                                    alt="Safety Operations 1"
                                    width={600}
                                    height={300}
                                    className="w-full h-[300px] object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div> */}

                            {/* Second Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/22.jpg"
                                    alt="Safety Operations 2"
                                    width={500}
                                    height={500}
                                    className="w-full h-[500px] object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold text-white">
                                    Our Safety Standards
                                </h3>
                                <p className="text-lg text-gray-200 leading-relaxed">
                                    We maintain the highest safety standards in all our operations. Our commitment to safety is reflected in every aspect of our work, from personal protective equipment to comprehensive safety protocols.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Personal Protective Equipment</h4>
                                        <p className="text-gray-200">Comprehensive PPE including helmets, safety glasses, gloves, and protective clothing for all workers.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Safety Training</h4>
                                        <p className="text-gray-200">Regular safety training programs and workshops to ensure all employees are well-versed in safety protocols.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Emergency Procedures</h4>
                                        <p className="text-gray-200">Comprehensive emergency response procedures and regular drills to ensure preparedness.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Equipment Safety</h4>
                                        <p className="text-gray-200">Regular maintenance and safety checks on all equipment to prevent accidents and ensure optimal performance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Parallax CSS */}
            <style jsx>{`
                @media (min-width: 768px) {
                    section {
                        background-attachment: fixed;
                    }
                }
            `}</style>
        </section>
    );
} 