import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import Svg from '../../images/file1.png';


const Languages = () => {

    const { isDarkTheme } = useContext(ThemeContext);


    return (
        <div className={`w-full py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} max-h-full sm:h-auto`}>
            <div className="max-w-[1240px] mx-auto grid gap-16 md:gap-8 md:grid-cols-2 justify-center align-center">
                <div className="w-full mx-auto align-center justify-center">
                    <img
                        src={Svg}
                        alt={'none'}
                        className={`w-full h-auto ml-5`}
                    />
                </div>
                <div className={'lg:pl-6 flex flex-col justify-center text-center lg:text-start'}>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>1. Improving Healthcare Access.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>2. Personalized Health Guidance.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>3. Supporting Wellness Journeys.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>4. Staying Informed and Empowered.</span>
                    <span className={`lg:ml-2 py-2 text-xl text-gray-400`}>5. Ensuring Confidentiality and Privacy.</span>
                </div>

            </div>
        </div>

    )
}

export default Languages;