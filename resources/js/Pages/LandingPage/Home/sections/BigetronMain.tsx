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
        image: "/icons/yae.png",
        subTitle: "Memiliki Pekerja Bersertif",
        deskripsi:
            "Pekerja Memiliki Skill mumpuni. Cepat dalam melaksanaka tugas",
        icons: "/icons/yae.png",
    },
    {
        image: "/icons/yae.png",
        subTitle: "iya",
        icons: "/icons/yae.png",
    },
    {
        image: "/icons/yae.png",
        subTitle: "turu",
        icons: "/icons/yae.png",
    },
    {
        image: "/icons/yae.png",
        subTitle: "turu",
        icons: "/icons/yae.png",
    },
];

export const BigetronMain = ({ }) => {
    const wiper = useSwiper()
    // console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    return (
        <section className="relative ">
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
                                className="h-[35vh] duration-300 rounded-2xl"
                                style={{
                                    backgroundImage: `url(http://127.0.0.1:8000${data.image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    // backgroundColor: "rgba(248, 247, 216, 0.2)",
                                    backgroundBlendMode: "lighten",
                                }}
                            >

                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};