import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";


const Features = () =>  {

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <article>
            <div>
                Features
            </div>
        </article>
    )
}

export default Features;