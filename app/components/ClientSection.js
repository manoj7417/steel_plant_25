'use client';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export default function ClientSection() {
    const clients = [
        { id: 1, logo: "/25.jpg" },
        { id: 2, logo: "/26.png" },
        { id: 3, logo: "/27.png" },
        { id: 4, logo: "/28.png" },
        { id: 5, logo: "/29.jpg" },
        { id: 6, logo: "/30.jpg" }
    ];

    // Duplicate the array to ensure enough slides for smooth autoplay
    const slides = [...clients, ...clients, ...clients];

    return (
        <section id="clients" className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Our Trusted Partners
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Working with leading companies in the steel and industrial processing industry
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={40}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3, spaceBetween: 40 },
                            768: { slidesPerView: 4, spaceBetween: 50 },
                            1024: { slidesPerView: 6, spaceBetween: 60 },
                            1280: { slidesPerView: 6, spaceBetween: 60 },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="client-swiper"
                    >
                        {slides.map((client, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="group flex items-center justify-center h-20 lg:h-24">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            src={client.logo}
                                            alt={"Client Logo"}
                                            fill
                                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx>{`
                .client-swiper .swiper-slide {
                    height: auto;
                }
            `}</style>
        </section>
    );
} 