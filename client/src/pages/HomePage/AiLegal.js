import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";

const AiLegal = () => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <div className={`flex flex-col items-center justify-center py-6 h-auto ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
            <h2 className={`font-bold ease-in-out duration-300 text-4xl ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Legal
            </h2>
            <p className={`text-gray-400 md:text-xl w-[90%] text-center items-center pb-8 pt-4`}>
                This chatbot provides general information and should not be used as a substitute for professional medical advice.
                <br/>
                We do not endorse specific actions. In case of a medical emergency, please seek immediate assistance.
            </p>
        </div>
    );
}

export default AiLegal;
