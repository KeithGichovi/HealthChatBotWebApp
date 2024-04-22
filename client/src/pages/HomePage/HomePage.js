import React from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import Hero from "./Hero";
import Services from "./Services";
import ActiveSlider from "./ActiveSlider";
import Languages from "./Languages";
import Languages2 from "./Languages2";
import AiLegal from "./AiLegal";

const HomePage = () => {

    return (
        <div>
            <CursorAnimated/>
            <Navbar/>
            <Hero/>
            <Services/>
            <ActiveSlider/>
            <Languages2/>
            <Languages/>
            <AiLegal/>
        </div>
    )
}

export default HomePage;