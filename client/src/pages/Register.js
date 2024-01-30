import React, { useState } from "react";

export const Register = () => {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://127.0.0.1:5000/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(register),
            })

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

        } catch (e) {
            console.error("Error: ", e)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="enter your name...."
                    value={register.name}
                    onChange={(e) => setRegister({ ...register, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="enter your Email...."
                    value={register.email}
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="enter your Password...."
                    value={register.password}
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
