import React from "react";
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import RegisterForm from "./RegisterForm";

const Register = () => {


  return (
      <div>
          <CursorAnimated/>
          <Navbar/>
          <RegisterForm/>
      </div>
  );
};

export default Register;