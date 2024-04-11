import React from 'react';
import { RxArrowTopRight } from "react-icons/rx";


const SwiperCard = ({backgroundImage, title, content, icon}) => {
    return (
        <div
            className={`flex flex-col gap-2 lg:gap-6 group relative shadow-lg text-white rounded-2xl px-6 py-2 h-[420px] w-[100%] lg:h-[650px] lg:w-[350px] overflow-hidden cursor-pointer`}>
            <div className={`absolute inset-0 bg-cover bg-center`}
                 style={{backgroundImage: `url(${backgroundImage})`}}/>
            <div className={`absolute inset-0 bg-black opacity-10 group-hover:opacity-60`}/>
            <div className={`relative flex flex-col gap-3`}>
                <icon className={`text-gray-100 w-[32px] h-[32px] my-4 mx-2`}/>
                <h1 className={`text-xl lg:text-2xl font-semibold text-gray-100`}>
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