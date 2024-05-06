import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";

/***
 * 
 * @component TypingAnimation
 * @description - This component is used to display the typing animation, before the chatbot responds.
 * @returns {JSX.Element} - The rendered TypingAnimation component.
 * 
 * 
 */
const TypingAnimation = () => {

    const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-around text-start max-w-[200px]">
      <div className={`w-4 h-4 mx-1 rounded-full ease-in-out duration-300 ${ isDarkTheme ? 'bg-gray-400' : 'bg-blue-400' } animate-pulse`}></div>
      <div className={`w-4 h-4 mx-1 rounded-full ease-in-out duration-300 ${ isDarkTheme ? 'bg-gray-400' : 'bg-blue-400' } animate-pulse delay-75`}></div>
      <div className={`w-4 h-4 mx-1 rounded-full ease-in-out duration-300 ${ isDarkTheme ? 'bg-gray-400' : 'bg-blue-400' } animate-pulse delay-150`}></div>
    </div>
  );
};

export default TypingAnimation;