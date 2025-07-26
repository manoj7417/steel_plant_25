import Image from "next/image";

export default function ProcessFlowSection() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-gray-800 mb-6">PROCESS FLOW</h2>
                    <p className="text-xl text-gray-600">Complete steel processing workflow from raw materials to finished products</p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-8 text-center border border-orange-200 shadow-lg">
                            <div className="relative mb-4">
                                <Image
                                    src="/9.jpg"
                                    alt="Hot Slag Processing"
                                    width={200}
                                    height={150}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>
                            <div className="text-orange-600 text-4xl mb-4">🔥</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Hot Slag Processing</h3>
                            <p className="text-gray-600">Initial handling and processing of hot slag materials with advanced safety protocols</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 text-center border border-blue-200 shadow-lg">
                            <div className="relative mb-4">
                                <Image
                                    src="/10.jpg"
                                    alt="Tundish Operations"
                                    width={200}
                                    height={150}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>
                            <div className="text-blue-600 text-4xl mb-4">⚙️</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tundish Operations</h3>
                            <p className="text-gray-600">Skull removal and maintenance procedures with precision tools and controlled methods</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-8 text-center border border-green-200 shadow-lg">
                            <div className="relative mb-4">
                                <Image
                                    src="/11.png"
                                    alt="Material Segregation"
                                    width={200}
                                    height={150}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>
                            <div className="text-green-600 text-4xl mb-4">🔧</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Material Segregation</h3>
                            <p className="text-gray-600">Boiling and enrichment processes for quality material separation and processing</p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-8 text-center border border-yellow-200 shadow-lg">
                            <div className="relative mb-4">
                                <Image
                                    src="/12.jpg"
                                    alt="Transport & Unloading"
                                    width={200}
                                    height={150}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>
                            <div className="text-yellow-600 text-4xl mb-4">🚛</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Transport & Unloading</h3>
                            <p className="text-gray-600">Safe transportation and unloading procedures with comprehensive safety measures</p>
                        </div>
                    </div>

                    {/* Connecting Arrows */}
                    <div className="hidden lg:block absolute top-1/2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-orange-400 to-blue-400 transform -translate-y-1/2"></div>
                    <div className="hidden lg:block absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform -translate-y-1/2"></div>
                    <div className="hidden lg:block absolute top-1/2 left-3/4 w-1/2 h-1 bg-gradient-to-r from-green-400 to-yellow-400 transform -translate-y-1/2"></div>
                </div>
            </div>
        </section>
    );
} 