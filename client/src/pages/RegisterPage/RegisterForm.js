import React, { useState, useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";

const RegisterForm = () => {

    const { isDarkTheme } = useContext(ThemeContext)

    const [register, setRegister] = useState({
    first_name: "",
    last_name:"",
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
            new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          setResponse(responseData);
        } catch (e) {
          console.error("Error: ", e);
        }
    };

    return (
        <div className={`w-full py-16 px-4 ease-in-out duration-300 ${ isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'} h-full sm:h-auto`}>
            {response && <p>{response.message}</p>}
            <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
                <form onSubmit={handleSubmit} className='h-full flex flex-col justify-evenly items-center'>
                    <input
                        type="text"
                        placeholder="enter your first name...."
                        value={register.name}
                        onChange={(e) =>
                            setRegister({...register, first_name: e.target.value})
                        }
                        required={true}
                        className='input-text'
                    />
                    <input
                        type="text"
                        placeholder="enter your surname...."
                        value={register.name}
                        onChange={(e) =>
                            setRegister({...register, last_name: e.target.value})
                        }
                        required={true}
                        className='input-text'
                    />
                    <input
                        type="email"
                        placeholder="enter your Email...."
                        value={register.email}
                        onChange={(e) =>
                            setRegister({...register, email: e.target.value})
                        }
                        required={true}
                        className='input-text'
                    />
                    <input
                        type="password"
                        placeholder="enter your Password...."
                        value={register.password}
                        onChange={(e) =>
                            setRegister({...register, password: e.target.value})
                        }
                        required={true}
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