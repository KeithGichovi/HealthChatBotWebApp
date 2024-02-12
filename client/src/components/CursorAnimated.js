import React, { useContext, useEffect, useState } from 'react';
import AnimatedCursor from "react-animated-cursor";
import { ThemeContext } from "../contexts/ThemeContext";

const CursorAnimated = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [isDarkTheme]);

    return (
        <>
            <AnimatedCursor
                key={key}
                clickables={['a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select', 'textarea', 'button', '.link']}
                innerSize={14}
                outerSize={32}
                outerAlpha={0.2}
                innerScale={0.7}
                outerScale={5}
                trailingSpeed={10}
                color={isDarkTheme ? "144, 224, 239" : "245, 132, 38"}
            />
        </>
    )
}

export default CursorAnimated;
