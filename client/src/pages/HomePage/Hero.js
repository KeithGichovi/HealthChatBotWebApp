import React, { useContext } from 'react';
import Lottie from "lottie-react";
import * as Animation1 from '../../Lottie/Animattion1.json';
import { ThemeContext } from "../../contexts/ThemeContext";
import { ReactTyped } from "react-typed";
import { Link } from 'react-router-dom';

const Hero = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    const sequence = [
        "Health Tips.",
        "Appointment Scheduling.",
        "Symptom Checking.",
        "Personalisation.",
        "The Maria Chatbot."
    ];

    return (
        <div className={`w-full py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} h-full sm:h-auto`}>
            <div className="max-w-[1240px] mx-auto grid gap-16 md:gap-8 md:grid-cols-2 justify-center align-center">
                <div className={'flex flex-col justify-center text-center lg:text-start'}>
                    <h1 className={`sm:text-3xl md:text-4xl lg:text-6xl text-3xl py-2 font-bold `}>Hello, and Welcome
                        to <span className={`ease-in-out duration-300 ${isDarkTheme ? 'text-[#F58426]' : 'text-blue-700'}`}>MediSync.</span></h1>
                    <span className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Your Virtual Health And Medical Assistant.</span>
                    <p className={`text-md lg:text-md py-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
                        Explore
                        <ReactTyped
                            className={`pl-1 capitalise`}
                            strings={sequence}
                            typeSpeed={75}
                            backSpeed={120}
                            backDelay={1500}
                            loop={true}
                            showCursor={true}
                        />
                    </p>
                    <button className={`ease-in-out duration-300 ${isDarkTheme ? 'bg-[#F58426] hover:bg-blue-700' : 'bg-blue-700 hover:bg-[#F58426]'} text-white w-44 mt-2 mx-auto lg:mx-0 rounded-lg px-3.5 py-2 relative cursor-pointer font-medium mb-4 sm:mb-0`}>
                        <Link to={'/register'}>
                            Get Started
                        </Link>
                    </button>
                </div>
                <div className="w-full mx-auto ">
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