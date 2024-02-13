import React, { useContext } from 'react';
import Lottie from "lottie-react";
import * as Animation1 from '../../Lottie/Animattion1.json';
import { ThemeContext } from "../../contexts/ThemeContext";
import { ReactTyped } from "react-typed";


const Hero = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    const sequence = [
        "Health Tips.",
        "Appointment Scheduling.",
        "Symptom Checking.",
        "Personalisation."
    ];

    return (
        <div className={`w-full py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} h-full sm:h-auto`}>
            <div className="max-w-[1240px] mx-auto grid gap-16 md:grid-cols-2 align-center">
                <div className={'flex flex-col justify-center items-center text-center pb-4 sm:pb-0'}>
                    <h1 className={`sm:text-3xl md:text-4xl text-2xl py-2 font-bold`}>Hello and Welcome to Maria.</h1>
                    <span className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Your health and medical assistant.</span>
                    <p className={`text-sm sm:text-md lg:text-lg py-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                        Explore
                        <ReactTyped
                            className={`pl-1 capitalise`}
                            strings={sequence}
                            typeSpeed={75}
                            backSpeed={100}
                            backDelay={1500}
                            loop={true}
                            showCursor={true}
                        />
                    </p>
                </div>
                <div className="w-full max-w-[500px] mx-auto py-2 sm:p-0 sm:py-0">
                    <Lottie
                        animationData={Animation1}
                        className={`w-full h-auto`}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero;