'use client';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

export default function ServicesSection() {
    // const services = [
    //     { name: "KOBELCO - SK520", image: "/img1.webp" },
    //     { name: "KOBELCO - 380", image: "/img2.jpg" },
    //     { name: "VOLVO EXCAVATOR - 480 C", image: "/img3.avif" },
    //     { name: "KOBELCO - SK220", image: "/img4.jpg" },
    //     { name: "KOBELCO - SK80", image: "/img5.jpg" },
    //     { name: "DOZER", image: "/img6.webp" },
    //     { name: "WHEEL LOADER", image: "/img7.jpg" },
    //     { name: "DUMPER 1035", image: "/img8.jpg" },
    //     { name: "DUMPER HM 1025", image: "/img9.webp" },
    //     { name: "EICHER - PRO TIPPERS", image: "/img1.webp" },
    //     { name: "TATA 955 CRANE", image: "/img2.jpg" },
    //     { name: "P & H 955 CRANE", image: "/img3.avif" }
    // ];


    // const services = [
    //     { "id": 1, "name": "AL HYVA TIPPER", "image": "/machine-2.png" },
    //     { "id": 2, "name": "AMW TIPPER", "image": "/machine-3.jpg" },
    //     { "id": 3, "name": "ASHOK LEYLAND TIPPER", "image": "/machine-4.png" },
    //     { "id": 4, "name": "BEML BD-155 BULLDOZER", "image": "/machine-5.jpg" },
    //     { "id": 5, "name": "BEML BD-50 BULLDOZER", "image": "/machine-6.jpg" },
    //     { "id": 6, "name": "BEML DOZER D-50A", "image": "/machine-7.jpg" },
    //     { "id": 7, "name": "BEML DOZER D-80A-12", "image": "/machine-8.webp" },
    //     { "id": 8, "name": "BHARAT BENZ TIPPER", "image": "/machine-9.png" },
    //     { "id": 9, "name": "BULL DOZER BD50G", "image": "/machine-10.png" },
    //     { "id": 10, "name": "CAT DOZER D-80", "image": "/machine-11.jpg" },
    //     { "id": 11, "name": "CAT Z BAR H2021 LOADER", "image": "/machine-12.webp" },
    //     { "id": 12, "name": "EICHER - PRO TIPPERS (6028T)", "image": "/machine-13.jpg" },
    //     { "id": 13, "name": "EICHER - PRO TIPPERS (6035T)", "image": "/machine-14.png" },
    //     { "id": 14, "name": "EICHER TIPPER", "image": "/machine-15.png" },
    //     { "id": 15, "name": "ESCORTS HYDRA CRANE", "image": "/machine-16.webp" },
    //     { "id": 16, "name": "EXCAVATOR JCB JS-200 HD", "image": "/machine-17.jpg" },
    //     { "id": 17, "name": "HIND 101 M.K CRANE", "image": "/machine-18.jpg" },
    //     { "id": 18, "name": "HM 2021 Z BAR LOADER", "image": "/machine-19.png" },
    //     { "id": 19, "name": "HM DUMPER 1025", "image": "/machine-20.jpg" },
    //     { "id": 20, "name": "HM DUMPER 1035", "image": "/machine-21.jpg" },
    //     { "id": 21, "name": "HUNDAI HYDRAULIC EXCAVATOR HX380L", "image": "/machine-22.jpg" },
    //     { "id": 22, "name": "HYDRA CRANE", "image": "/machine-23.png" },
    //     { "id": 23, "name": "HYDRAULIC EXCAVATOR EX-300", "image": "/machine-22.jpg" },
    //     { "id": 24, "name": "HYDRAULIC EXCAVATOR JCB 81", "image": "/machine-24.jpg" },
    //     { "id": 25, "name": "HYDRAULIC EXCAVATOR JCB JS210 LC", "image": "/machine-25.jpg" },
    //     { "id": 26, "name": "HYDRAULIC EXCAVATOR JCB NXT 225", "image": "/machine-26.jpg" },
    //     { "id": 27, "name": "HYDRAULIC EXCAVATOR JS200 HD", "image": "/machine-27.jpg" },
    //     { "id": 28, "name": "HYDRAULIC EXCAVATOR JS205", "image": "/machine-28.jpg" },
    //     { "id": 29, "name": "HYDRAULIC EXCAVATOR JX-50", "image": "/machine-29.png" },
    //     { "id": 30, "name": "HYDRAULIC EXCAVATOR L&T CK-300", "image": "/machine-30.png" },
    //     { "id": 31, "name": "HYDRAULIC EXCAVATOR L&T KOMATSU PC-210", "image": "/machine-31.png" },
    //     { "id": 32, "name": "HYDRAULIC EXCAVATOR L&T PC-450", "image": "/machine-32.jpg" },
    //     { "id": 33, "name": "HYDRAULIC EXCAVATOR PC-200", "image": "/machine-33.jpg" },
    //     { "id": 34, "name": "HYDRAULIC EXCAVATOR R220 LC", "image": "/machine-34.jpg" },
    //     { "id": 35, "name": "HYUNDAI EXCAVATOR SK-210", "image": "/machine-35.png" },
    //     { "id": 36, "name": "HYUNDAI R 340L", "image": "/machine-36.jpg" },
    //     { "id": 37, "name": "JCB 430 ZX PLUS LOADER", "image": "/machine-37.png" },
    //     { "id": 38, "name": "JCB 432 WHEEL LOADER", "image": "/machine-38.jpg" },
    //     { "id": 39, "name": "JCB BACKHOE LOADER", "image": "/machine-39.jpg" },
    //     { "id": 40, "name": "KOBELCO - SK210", "image": "/machine-40.png" },
    //     { "id": 41, "name": "KOBELCO - SK350 LC", "image": "/machine-41.jpg" },
    //     { "id": 42, "name": "KOBELCO - SK380", "image": "/machine-42.jpg" },
    //     { "id": 43, "name": "KOBELCO - SK520", "image": "/machine-43.jpg" },
    //     { "id": 44, "name": "KOMATSU PC 200", "image": "/machine-44.png" },
    //     { "id": 45, "name": "KOMATSU PC 300", "image": "/machine-45.jpg" },
    //     { "id": 46, "name": "KOMATSU PC 71", "image": "/machine-46.jpg" },
    //     { "id": 47, "name": "MAHINDRA TIPPER", "image": "/machine-47.jpg" },
    //     { "id": 48, "name": "SUKKU CRANE", "image": "/machine-48.png" },
    //     { "id": 49, "name": "TATA P&H 955 CRANE", "image": "/machine-49.webp" },
    //     { "id": 50, "name": "TATA HITACHI HYDRAULIC EXCAVATOR EX-210", "image": "/machine-50.jpg" },
    //     { "id": 51, "name": "TATA P&H 320 CRANE", "image": "/machine-52.png" },
    //     { "id": 52, "name": "TATA TIPPER", "image": "/machine-53.jpg" },
    //     { "id": 53, "name": "TATA TWL 3036 LOADER", "image": "/machine-54.jpg" },
    //     { "id": 54, "name": "TATA WHEEL LOADER", "image": "/machine-55.webp" },
    //     { "id": 55, "name": "TRACTOR", "image": "/machine-56.avif" },
    //     { "id": 56, "name": "TRAILER", "image": "/machine-57.jpg" },
    //     { "id": 57, "name": "VOLVO EC 200D", "image": "/machine-58.jpg" },
    //     { "id": 58, "name": "VOLVO EC480DL", "image": "/machine-59.jpg" },
    //     { "id": 59, "name": "VOLVO EXCAVATOR - 480 C", "image": "/machine-60.jpg" },
    //     { "id": 60, "name": "WHEEL LOADER", "image": "/machine-61.webp" }
    // ]


    // Duplicate the array for smooth continuous sliding



    const services = [
        { "id": 1, "name": "AL HYVA TIPPER", "image": "/machine-2.png", "quantity": 59 },
        { "id": 2, "name": "AMW TIPPER", "image": "/machine-3.jpg", "quantity": 25 },
        { "id": 3, "name": "ASHOK LEYLAND TIPPER", "image": "/machine-4.png", "quantity": 12 },
        { "id": 4, "name": "BEML BD-155 BULLDOZER", "image": "/machine-5.jpg", "quantity": 2 },
        { "id": 5, "name": "BEML BD-50 BULLDOZER", "image": "/machine-6.jpg", "quantity": 20 },
        { "id": 6, "name": "BEML DOZER D-50A", "image": "/machine-7.jpg", "quantity": 3 },
        { "id": 7, "name": "BEML DOZER D-80A-12", "image": "/machine-8.webp", "quantity": 9 },
        { "id": 8, "name": "BHARAT BENZ TIPPER", "image": "/machine-9.png", "quantity": 10 },
        { "id": 9, "name": "BULL DOZER BD50G", "image": "/machine-10.png", "quantity": 12 },
        { "id": 10, "name": "CAT DOZER D-80", "image": "/machine-11.jpg", "quantity": 18 },
        { "id": 11, "name": "CAT Z BAR H2021 LOADER", "image": "/machine-12.webp", "quantity": 16 },
        { "id": 12, "name": "EICHER - PRO TIPPERS (6028T)", "image": "/machine-13.jpg", "quantity": 15 },
        { "id": 13, "name": "EICHER - PRO TIPPERS (6035T)", "image": "/machine-14.png", "quantity": 17 },
        { "id": 14, "name": "EICHER TIPPER", "image": "/machine-15.png", "quantity": 3 },
        { "id": 15, "name": "ESCORTS HYDRA CRANE", "image": "/machine-16.webp", "quantity": 4 },
        { "id": 16, "name": "EXCAVATOR JCB JS-200 HD", "image": "/machine-17.jpg", "quantity": 4 },
        { "id": 17, "name": "HIND 101 M.K CRANE", "image": "/machine-18.jpg", "quantity": 2 },
        { "id": 18, "name": "HM 2021 Z BAR LOADER", "image": "/machine-19.png", "quantity": 1 },
        { "id": 19, "name": "HM DUMPER 1025", "image": "/machine-20.jpg", "quantity": 2 },
        { "id": 20, "name": "HM DUMPER 1035", "image": "/machine-21.jpg", "quantity": 40 },
        { "id": 21, "name": "HUNDAI HYDRAULIC EXCAVATOR HX380L", "image": "/machine-22.jpg", "quantity": 15 },
        { "id": 22, "name": "HYDRA CRANE", "image": "/machine-23.png", "quantity": 12 },
        { "id": 23, "name": "HYDRAULIC EXCAVATOR EX-300", "image": "/machine-22.jpg", "quantity": 3 },
        { "id": 24, "name": "HYDRAULIC EXCAVATOR JCB 81", "image": "/machine-24.jpg", "quantity": 15 },
        { "id": 25, "name": "HYDRAULIC EXCAVATOR JCB JS210 LC", "image": "/machine-25.jpg", "quantity": 6 },
        { "id": 26, "name": "HYDRAULIC EXCAVATOR JCB NXT 225", "image": "/machine-26.jpg", "quantity": 6 },
        { "id": 27, "name": "HYDRAULIC EXCAVATOR JS200 HD", "image": "/machine-27.jpg", "quantity": 9 },
        { "id": 28, "name": "HYDRAULIC EXCAVATOR JS205", "image": "/machine-28.jpg", "quantity": 2 },
        { "id": 29, "name": "HYDRAULIC EXCAVATOR JX-50", "image": "/machine-29.png", "quantity": 7 },
        { "id": 30, "name": "HYDRAULIC EXCAVATOR L&T CK-300", "image": "/machine-30.png", "quantity": 8 },
        { "id": 31, "name": "HYDRAULIC EXCAVATOR L&T KOMATSU PC-210", "image": "/machine-31.png", "quantity": 3 },
        { "id": 32, "name": "HYDRAULIC EXCAVATOR L&T PC-450", "image": "/machine-32.jpg", "quantity": 9 },
        { "id": 33, "name": "HYDRAULIC EXCAVATOR PC-200", "image": "/machine-33.jpg", "quantity": 5 },
        { "id": 34, "name": "HYDRAULIC EXCAVATOR R220 LC", "image": "/machine-34.jpg", "quantity": 3 },
        { "id": 35, "name": "HYUNDAI EXCAVATOR SK-210", "image": "/machine-35.png", "quantity": 5 },
        { "id": 36, "name": "HYUNDAI R 340L", "image": "/machine-36.jpg", "quantity": 1 },
        { "id": 37, "name": "JCB 430 ZX PLUS LOADER", "image": "/machine-37.png", "quantity": 4 },
        { "id": 38, "name": "JCB 432 WHEEL LOADER", "image": "/machine-38.jpg", "quantity": 2 },
        { "id": 39, "name": "JCB BACKHOE LOADER", "image": "/machine-39.jpg", "quantity": 3 },
        { "id": 40, "name": "KOBELCO - SK210", "image": "/machine-40.png", "quantity": 1 },
        { "id": 41, "name": "KOBELCO - SK350 LC", "image": "/machine-41.jpg", "quantity": 1 },
        { "id": 42, "name": "KOBELCO - SK380", "image": "/machine-42.jpg", "quantity": 1 },
        { "id": 43, "name": "KOBELCO - SK520", "image": "/machine-43.jpg", "quantity": 3 },
        { "id": 44, "name": "KOMATSU PC 200", "image": "/machine-44.png", "quantity": 8 },
        { "id": 45, "name": "KOMATSU PC 300", "image": "/machine-45.jpg", "quantity": 7 },
        { "id": 46, "name": "KOMATSU PC 71", "image": "/machine-46.jpg", "quantity": 3 },
        { "id": 47, "name": "MAHINDRA TIPPER", "image": "/machine-47.jpg", "quantity": 3 },
        { "id": 48, "name": "SUKKU CRANE", "image": "/machine-48.png", "quantity": 3 },
        { "id": 49, "name": "TATA P&H 955 CRANE", "image": "/machine-49.webp", "quantity": 6 },
        { "id": 50, "name": "TATA HITACHI HYDRAULIC EXCAVATOR EX-210", "image": "/machine-50.jpg", "quantity": 5 },
        { "id": 51, "name": "TATA P&H 320 CRANE", "image": "/machine-52.png", "quantity": 5 },
        { "id": 52, "name": "TATA TIPPER", "image": "/machine-53.jpg", "quantity": 2 },
        { "id": 53, "name": "TATA TWL 3036 LOADER", "image": "/machine-54.jpg", "quantity": 5 },
        { "id": 54, "name": "TATA WHEEL LOADER", "image": "/machine-55.webp", "quantity": 5 },
        { "id": 55, "name": "TRACTOR", "image": "/machine-56.avif", "quantity": 4 },
        { "id": 56, "name": "TRAILER", "image": "/machine-57.jpg", "quantity": 4 },
        { "id": 57, "name": "VOLVO EC 200D", "image": "/machine-58.jpg", "quantity": 11 },
        { "id": 58, "name": "VOLVO EC480DL", "image": "/machine-59.jpg", "quantity": 1 },
        { "id": 59, "name": "VOLVO EXCAVATOR - 480 C", "image": "/machine-60.jpg", "quantity": 1 },
        { "id": 60, "name": "WHEEL LOADER", "image": "/machine-61.webp", "quantity": 1 }
    ];



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
                                <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-1">
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden rounded-t-lg group">
                                        <Image
                                            src={service.image}
                                            alt={service.name}
                                            fill
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Overlay with tooltip */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            {/* Quantity Badge */}
                                            <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-xl shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300 border-2 border-white/50">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-extrabold text-gray-900">
                                                            {service.quantity}
                                                        </span>
                                                        <span className="text-base font-medium text-gray-600 uppercase tracking-wide">
                                                            Units
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                            {service.name}
                                        </h3>
                                        {/* Quantity indicator (always visible) */}
                                        {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full mt-2">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-700">
                                                {service.quantity} units
                                            </span>
                                        </div> */}
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