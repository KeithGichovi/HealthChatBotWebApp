import React from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import Hero from "./Hero";
import Services from "./Services";
import ActiveSlider from "./ActiveSlider";

const HomePage = () => {

    return (
        <div>
            <CursorAnimated/>
            <Navbar/>
            <Hero/>
            <Services/>
            <ActiveSlider/>
        </div>
    )
}

export default HomePage;