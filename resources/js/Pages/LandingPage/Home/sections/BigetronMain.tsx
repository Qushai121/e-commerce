import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { Link } from "@inertiajs/react";

const BigetronMenus = [
    {
        image: "/assets/banner.webp",
        subTitle: "Memiliki Pekerja Bersertif",
        deskripsi:
            "Pekerja Memiliki Skill mumpuni. Cepat dalam melaksanaka tugas",
        icons: "/assets/banner.webp",
    },
    {
        image: "/assets/banner.webp",
        subTitle: "iya",
        icons: "/assets/banner.webp",
    },
    {
        image: "/assets/banner.webp",
        subTitle: "turu",
        icons: "/assets/banner.webp",
    },
    {
        image: "/assets/banner.webp",
        subTitle: "turu",
        icons: "/assets/banner.webp",
    },
];

export const BigetronMain = ({ }) => {
    const wiper = useSwiper()
    // console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    return (
        <section className="relative mt-5">
            <Swiper
                className="mySwiper rounded-2xl"
                // style={{
                //     "--swiper-navigation-color": "#2980b9",
                // }}
                centeredSlides={true}
                // autoplay={{
                //     delay: 5000,
                //     disableOnInteraction: false,
                // }}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                    nextEl: '.review-swiper-button-next',
                    prevEl: '.review-swiper-button-prev',
                }}
                modules={[Navigation]}
            >
                {BigetronMenus.map((data, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <div
                                className="duration-300 rounded-2xl"
                                style={{
                                    height: '35vh',
                                }}
                            >
                                <img src={`http://127.0.0.1:8000${data.image}`} className="h-full object-cover rounded-2xl" alt="" />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section >
    );
};