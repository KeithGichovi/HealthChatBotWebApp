import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";

const Services = () => {

    const { isDarkTheme } = useContext(ThemeContext);

    return (

        <div className={`flex flex-col items-center justify-center py-6 h-auto ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
            <h2 className={`font-bold ease-in-out duration-300 text-4xl ${ isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Our Services
            </h2>
            <p className={`text-gray-400 text-xl pb-8 pt-4`}>
                MediSync provides the following services.
            </p>
        </div>

    )
}

export default Services;