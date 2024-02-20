import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import RegisterForm from "./RegisterForm";

const Register = () => {


  return (
      <div>
          <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"/>
          <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"/>
          <CursorAnimated/>
          <Navbar/>
          <RegisterForm/>
      </div>
  );
};

export default Register;