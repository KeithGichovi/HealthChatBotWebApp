import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import * as Animation2 from '../../Lottie/Animation2.json';
import Lottie from "lottie-react";

const Features = () =>  {

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <section>
            <div
                className={`w-full py-4 px-4 ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} h-full sm:h-auto`}>
                <div className="max-w-[1240px] mx-auto grid gap-16 md:gap-8 md:grid-cols-2 justify-center align-center">
                    <Lottie
                        animationData={Animation2}
                        className={`w-[500px] mx-auto my-4`}
                    />
                    <div className={`flex flex-col justify-center`}>
                        <p className={`font-semibold text-2xl ${ isDarkTheme ? 'text-[#F58426]' : 'text-blue-700'}`}>Multilingual support</p>
                        <h1>Language Barrier adjusted</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;