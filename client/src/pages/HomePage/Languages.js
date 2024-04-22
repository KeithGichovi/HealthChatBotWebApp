import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import Svg from '../../images/MedicalSVG.svg';
import Svg2 from '../../images/MedincalSVG2.svg';

const Languages = () => {

    const { isDarkTheme } = useContext(ThemeContext);


    return (
        <div className={`py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} max-h-full sm:h-auto`}>
            <div className="max-w-[1240px] mx-auto grid gap-16 md:gap-8 md:grid-cols-2 justify-center align-center">
                <div className="w-full mx-auto align-center justify-center">
                    <img
                        src={`${ isDarkTheme ? Svg2 : Svg }`}
                        alt={'none'}
                        className={`w-full h-auto`}
                    />
                </div>
                <div className={'lg:pl-6 flex flex-col justify-center text-[18px] lg:text-xl text-center lg:text-end'}>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>Improving Healthcare Access.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>Personalized Health Guidance.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>Supporting Wellness Journeys.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>Staying Informed and Empowered.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>Ensuring Confidentiality and Privacy.</span>
                </div>

            </div>
        </div>

    )
}

export default Languages;