import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import RegisterForm from "./RegisterForm";
import { ThemeContext } from "../../contexts/ThemeContext";


const Register = () => {

    const { isDarkTheme } = useContext(ThemeContext);

  return (
      <div className={`${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
          <CursorAnimated/>
          <Navbar/>
          <RegisterForm/>
      </div>
  );
};

export default Register;