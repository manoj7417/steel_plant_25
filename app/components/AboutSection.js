import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top Section */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                        {/* Left: Title and Intro */}
                        <div className="flex-1">
                            <div className="mb-4">
                                <span className="text-sm font-bold text-red-600 uppercase tracking-wider">About Us</span>
                                <h2 className="text-5xl font-bold text-gray-900 mt-2 leading-tight">
                                    Forging Quality<br />Since Day One
                                </h2>
                            </div>
                        </div>

                        {/* Right: Intro Text */}
                        <div className="flex-1">
                            <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                We at MTP are capable of deploying our execution resources within a Short Period of time.
                                Our commitment to excellence and safety has made us a trusted partner in steel processing operations.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                With decades of experience and cutting-edge technology, we deliver superior results while maintaining
                                the highest safety standards in all our operations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Image with Button */}
                    <div className="flex-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/5.png"
                                alt="Steel Processing Operations"
                                width={600}
                                height={400}
                                className="object-cover w-full h-96"
                            />

                        </div>
                    </div>

                    {/* Right: What Sets Us Apart */}
                    <div className="flex-1">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">What Sets Us Apart</h3>

                        <div className="space-y-8">
                            {/* Point 1 */}
                            <div className="border-b border-red-200 pb-6">
                                <div className="flex items-start space-x-4">
                                    <span className="text-2xl font-bold text-red-600">01</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Skilled & Certified Team</h4>
                                        <p className="text-gray-600">Our experienced professionals are trained in the latest steel processing techniques and safety protocols.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div className="border-b border-red-200 pb-6">
                                <div className="flex items-start space-x-4">
                                    <span className="text-2xl font-bold text-red-600">02</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Advanced Technology</h4>
                                        <p className="text-gray-600">We utilize cutting-edge equipment and modern processing methods for optimal results.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div className="pb-6">
                                <div className="flex items-start space-x-4">
                                    <span className="text-2xl font-bold text-red-600">03</span>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Safety First Approach</h4>
                                        <p className="text-gray-600">Comprehensive safety measures and protocols ensure secure operations for all our processes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 