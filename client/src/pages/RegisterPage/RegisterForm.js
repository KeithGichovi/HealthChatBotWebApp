import React, { useState, useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";

const RegisterForm = () => {

    const { isDarkTheme } = useContext(ThemeContext)

    const [register, setRegister] = useState({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    confirm_password: "",
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
                new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setResponse(responseData);
        } catch (e) {
            console.error("Error: ", e);
        }
    };

    return (
        <div className={`w-full h-screen sm:h-screen py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} h-full sm:h-auto`}>
            {response && <p>{response.message}</p>}
            <div>
                <form onSubmit={handleSubmit} className='h-full flex flex-col justify-evenly items-center'>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={register.first_name}
                        onChange={(e) =>
                            setRegister({...register, first_name: e.target.value})
                        }
                        required={true}
                        className={`form-input-custom ${isDarkTheme ? 'text-white bg-[#0C1821] border-gray-100 focus:border-amber-500' : 'border-b-gray-400  focus:border-b-2 focus:border-blue-500'}`}
                    />
                    <input
                        type="text"
                        placeholder="Surname"
                        value={register.last_name}
                        onChange={(e) =>
                            setRegister({...register, last_name: e.target.value})
                        }
                        required={true}
                        className={`form-input-custom ${isDarkTheme ? 'text-white bg-[#0C1821] border-gray-100 focus:border-amber-500' : 'border-b-gray-400  focus:border-b-2 focus:border-blue-500'}`}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={register.email}
                        onChange={(e) =>
                            setRegister({...register, email: e.target.value})
                        }
                        required={true}
                        className={`form-input-custom ${isDarkTheme ? 'text-white bg-[#0C1821] border-gray-100 focus:border-amber-500' : 'border-b-gray-400  focus:border-b-2 focus:border-blue-500'}`}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={register.password}
                        onChange={(e) =>
                            setRegister({...register, password: e.target.value})
                        }
                        className={`form-input-custom ${isDarkTheme ? 'text-white bg-[#0C1821] border-gray-100 focus:border-amber-500' : 'border-b-gray-400  focus:border-b-2 focus:border-blue-500'}`}
                    />
                    <button
                        type="submit"
                        className={`ease-in-out duration-300 ${isDarkTheme ? 'bg-[#F58426] hover:bg-blue-700' : 'bg-blue-700 hover:bg-[#F58426]'} text-white w-44 mt-2 mx-auto lg:mx-0 rounded-lg px-3.5 py-2 relative cursor-pointer font-medium mb-4 sm:mb-0`}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;