import React from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import Hero from "./Hero";

const HomePage = () => {

    return (
        <div>
            <CursorAnimated/>
            <Navbar/>
            <Hero/>
        </div>
    )
}

export default HomePage;