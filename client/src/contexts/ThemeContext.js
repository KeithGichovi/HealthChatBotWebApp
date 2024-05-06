import React, { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext(null);

/***
 * 
 * @component ThemeContextProvider
 * @description - This component is used to provide the theme context to the child components.
 * @param {Object} children - The child components.
 * @returns {JSX.Element} - The rendered ThemeContextProvider context.
 * 
 */
const ThemeContextProvider = ({children}) => {

    const storedTheme  = localStorage.getItem("isDarkTheme")
    const [isDarkTheme, setDarkTheme] = useState(storedTheme === "true");

    /***
     * 
     * @function - useEffect
     * @description - This useEffect hook is used to set the dark theme to local storage.
     * 
     */
    useEffect(()=> {
        localStorage.setItem("isDarkTheme", isDarkTheme.toString())
    }, [isDarkTheme])

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContextProvider;