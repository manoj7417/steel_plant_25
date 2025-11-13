'use client';

export default function CTASection() {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="cta" className="py-20 bg-gray-100">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-5xl font-black text-gray-800 mb-6">READY TO PARTNER?</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Experience the future of steel processing with our advanced operations and safety-first approach
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={scrollToContact}
                        className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-700 transition-all duration-300 shadow-lg"
                    >
                        Get Started Today
                    </button>
                    {/* <button className="border-2 border-gray-800 text-gray-800 font-bold py-4 px-8 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-lg">
                        Learn More
                    </button> */}
                </div>
            </div>
        </section>
    );
} 