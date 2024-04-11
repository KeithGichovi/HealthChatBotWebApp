import React, { useContext } from 'react';
import Lottie from "lottie-react";
import * as Animation2 from '../../Lottie/Animation2.json';
import { ThemeContext } from "../../contexts/ThemeContext";
import { ReactTyped } from "react-typed";



const Languages = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    const sequence = [
        "Health In All Languages",
        "健康关怀，多种语言",
        "Saúde em Qualquer Idioma",
        "Msaada wa Afya kwa Lugha Zote",
        "الرعاية الصحية بجميع اللغات",
    ];


    return (
        <div className={`w-full py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} max-h-full sm:h-auto`}>
            <div className="max-w-[1240px] mx-auto grid gap-16 md:gap-8 md:grid-cols-2 justify-center align-center">
                <div className="w-full mx-auto align-center justify-center">
                    <Lottie
                        animationData={Animation2}
                        className={`w-[90%] h-auto ml-5`}
                    />
                </div>
                <div className={'flex flex-col justify-center text-center lg:text-start'}>
                    <p className={`lg:text-2xl ease-in-out duration-300 justify-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                        <ReactTyped
                            className={`pl-1`}
                            strings={sequence}
                            typeSpeed={120}
                            backSpeed={100}
                            backDelay={1500}
                            loop={true}
                            showCursor={true}
                        />
                    </p>
                    <span className={`font-bold py-4 text-xl`}>MediSync offers up to <span className={` ${isDarkTheme ? 'text-[#F58426]' : 'text-blue-700'}`}>59</span> Languages lowering the barrier.</span>
                </div>
            </div>
        </div>

    )
}

export default Languages;