import React, { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({children}) => {

    const storedTheme  = localStorage.getItem("isDarkTheme")
    const [isDarkTheme, setDarkTheme] = useState(storedTheme === "true");

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