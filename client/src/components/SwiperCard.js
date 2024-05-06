import React from 'react';
import { RxArrowTopRight } from "react-icons/rx";

/***
 * 
 * @component SwiperCard
 * @description This component is used to display the card in the Swiper component.
 * @param {Object} props - The component props.
 * @param {string} props.backgroundImage - The background image uri for the card.
 * @param {string} props.title - The title for the card.
 * @param {string} props.content - The content for the card.
 * @returns {JSX.Element} The rendered SwiperCard component.
 * 
 */
const SwiperCard = ({backgroundImage, title, content}) => {
    return (
        <div className={`flex flex-col gap-2 sm:gap-1 lg:gap-6 group relative shadow-lg text-white rounded-2xl px-6 py-2 h-[400px] w-[100%] lg:h-[500px] lg:w-[350px] overflow-hidden cursor-pointer`}>
            <div className={`absolute inset-0 bg-cover bg-center`}
                 style={{backgroundImage: `url(${backgroundImage})`}}/>
            <div className={`absolute inset-0 bg-black opacity-10 group-hover:opacity-60`}/>
            <div className={`relative flex flex-col gap-3`}>
                <h1 className={`text-xl lg:text-2xl my-4 font-semibold text-gray-100`}>
                    {title}
                </h1>
                <p className={`lg:text-[18px] text-gray-100`}>
                    {content}
                </p>
            </div>
            <RxArrowTopRight
                className={`absolute bottom-5 left-5 w-[35px] h-[35px] text-gray-100 group-hover:rotate-45 duration-700`}
            />
        </div>
    )
}

export default SwiperCard;