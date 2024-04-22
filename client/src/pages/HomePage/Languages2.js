import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";

const Languages2 = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    return (

        <div
            className={`flex flex-col items-center justify-center py-6 h-auto ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
            <h2 className={`font-bold ease-in-out duration-300 text-4xl ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Languages
            </h2>
            <p className={`text-gray-400 md:text-xl text-center justify-center pb-8 pt-4`}>
                <span className={`font-semibold py-4 text-xl`}>
                    MediSync offers up to
                    <span className={`px-2 ${isDarkTheme ? 'text-[#F58426]' : 'text-blue-700'}`}>59</span>
                    Languages lowering the barrier.
                </span>
            </p>
        </div>

    )
}

export default Languages2;