import React, { useContext } from 'react';
import {Swiper, SwiperSlide } from "swiper/react";
import {FreeMode, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { services } from "../../json/sliderData";
import SwiperCard from "../../components/SwiperCard";
import { ThemeContext } from "../../contexts/ThemeContext";

/***
 * 
 * @component ActiveSlider
 * @description - This component is used to display the active slider.
 * @returns {JSX.Element} - The rendered ActiveSlider component.
 * 
 */
const ActiveSlider = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <div className={`w-full flex flex-col justify-center items-center max-h-[800px] ease-in-out duration-300 pb-8 ${ isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
            <Swiper
                modules={[FreeMode, Pagination]}
                breakpoints={{
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 8,
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 13,
                    }
                }}
                freeMode={true}
                pagination={{
                    clickable: true
                }}
                className={`max-w-[80%] lg:max-w-[70%]`}
            >
                {
                    services.map((item) => (
                        <SwiperSlide key={item.title}>
                            <SwiperCard
                                backgroundImage={item.backgroundImage}
                                title={item.title}
                                content={item.content}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default ActiveSlider;