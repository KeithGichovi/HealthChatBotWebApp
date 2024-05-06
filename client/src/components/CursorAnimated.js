import React, { useContext, useEffect, useState } from 'react';
import AnimatedCursor from "react-animated-cursor";
import { ThemeContext } from "../contexts/ThemeContext";


/**
 * 
 * @component CursorAnimated
 * @description This component is used to display the animated cursor.
 * @returns {JSX.Element} The rendered CursorAnimated component.
 * 
 */
const CursorAnimated = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [isDarkTheme]);

    return (
        <div>
            <AnimatedCursor
                key={key}
                clickables={['a', 'label[for]', 'select', 'textarea', 'button', '.link']}
                innerSize={14}
                outerSize={32}
                outerAlpha={0.2}
                innerScale={0.7}
                outerScale={5}
                trailingSpeed={10}
                color={isDarkTheme ? "144, 224, 239" : "245, 132, 38"}
            />
        </div>
    )
}

export default CursorAnimated;
