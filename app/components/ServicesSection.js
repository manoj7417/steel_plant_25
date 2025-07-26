'use client';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

export default function ServicesSection() {
    const services = [
        { name: "KOBELCO - SK520", image: "/img1.webp" },
        { name: "KOBELCO - 380", image: "/img2.jpg" },
        { name: "VOLVO EXCAVATOR - 480 C", image: "/img3.avif" },
        { name: "KOBELCO - SK220", image: "/img4.jpg" },
        { name: "KOBELCO - SK80", image: "/img5.jpg" },
        { name: "DOZER", image: "/img6.webp" },
        { name: "WHEEL LOADER", image: "/img7.jpg" },
        { name: "DUMPER 1035", image: "/img8.jpg" },
        { name: "DUMPER HM 1025", image: "/img9.webp" },
        { name: "EICHER - PRO TIPPERS", image: "/img1.webp" },
        { name: "TATA 955 CRANE", image: "/img2.jpg" },
        { name: "P & H 955 CRANE", image: "/img3.avif" }
    ];

    // Duplicate the array for smooth continuous sliding
    const slides = [...services, ...services, ...services];

    return (
        <section id="services" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Resources - Machinery</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive fleet of heavy machinery for steel processing and industrial operations
                    </p>
                </div>

                {/* Services Slider */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="services-swiper"
                    >
                        {slides.map((service, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full">
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                                        <Image
                                            src={service.image}
                                            alt={service.name}
                                            fill
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {service.name}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx>{`
        .services-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
        </section>
    );
} 