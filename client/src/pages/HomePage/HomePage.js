import React from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import Hero from "./Hero";
import Features from "./Features";

const HomePage = () => {

    return (
        <div>
            <CursorAnimated/>
            <Navbar/>
            <Hero/>
            <Features/>
        </div>
    )
}

export default HomePage;