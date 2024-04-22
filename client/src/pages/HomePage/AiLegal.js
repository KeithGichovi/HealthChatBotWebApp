import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import Lottie from "lottie-react";
import RobotLight from '../../Lottie/Robot.json';
import RobotDark from '../../Lottie/Robot2.json';

const AiLegal = () => {
    const { isDarkTheme } = useContext(ThemeContext);

    const getAnimationData = () => {
        return isDarkTheme ? RobotDark : RobotLight;
    };

    return (
        <div className={`flex flex-col items-center justify-center py-8 h-auto ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
            <h2 className={`font-bold ease-in-out duration-300 text-4xl ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Legal
            </h2>
            <p className={`text-gray-400 md:text-xl w-[90%] text-center items-center pb-8 pt-4`}>
                This chatbot provides general information and should not be used as a substitute for professional medical advice.
                <br/>
                This AI chatbot may not always provide accurate responses, so please use discretion when relying on its information.
                <br/>
                We do not endorse specific actions. In case of a medical emergency, please seek immediate assistance.
            </p>
            <div className={`items-center justify-center pt-2 pb-6`}>
                <Lottie
                    animationData={getAnimationData()}
                    className={`w-full h-auto`}
                />
            </div>
        </div>
    );
}

export default AiLegal;
