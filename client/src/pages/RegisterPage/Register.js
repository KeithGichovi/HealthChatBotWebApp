import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setResponse(responseData);
    } catch (e) {
      console.error("Error: ", e);
    }
  };


  return (
    <div>
      <Navbar/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your name...."
          value={register.name}
          onChange={(e) =>
            setRegister({ ...register, name: e.target.value })
          }
          required={true}
        />
        <input
          type="email"
          placeholder="enter your Email...."
          value={register.email}
          onChange={(e) =>
            setRegister({ ...register, email: e.target.value })
          }
          required={true}
        />
        <input
          type="password"
          placeholder="enter your Password...."
          value={register.password}
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
          required={true}
        />
        <button type="submit">Register</button>
      </form>
      <div>{response && response.message}</div>
    </div>
  );
};

export default Register;