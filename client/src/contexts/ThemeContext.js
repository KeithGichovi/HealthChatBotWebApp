import React, { useState, createContext } from "react";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({children}) => {

    const [isDarkTheme, setDarkTheme] = useState(false);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContextProvider;