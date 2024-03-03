import React, { useState, useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import {FcGoogle} from "react-icons/fc";
import {BsApple} from "react-icons/bs";
import {TiVendorMicrosoft} from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Response from "../../components/Response";

const RegisterForm = () => {

    const { isDarkTheme } = useContext(ThemeContext)

    const history = useNavigate();

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

            if(response.status === 201){
                history('/login')
            }

        } catch (e) {
            console.error("Error: ", e);
        }
    };

    return (
        <div
            className={`flex h-screen flex-1 flex-col justify-center px-6 mb-10 lg:px-8 ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {response && <Response response={response}/>}
                <h2 className={`text-center mb-4 text-3xl font-bold leading-9 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                    Welcome Aboard
                </h2>
                <span className={`text-center text-sm ${isDarkTheme ? 'text-[#F58426]' : 'text-blue-700'} mt-2 block font-semibold`}>
                    Set sail with us on a sea of exceptional service!
                </span>
            </div>

            <div className="mt-4 mb-12 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/***
                     first name
                     **/}
                    <div>
                        <label htmlFor="firstname"
                               className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                             First Name
                        </label>
                        <div className="mt-2">
                            <input
                                value={register.first_name}
                                onChange={(e) => setRegister({...register, first_name: e.target.value})}
                                type="text"
                                autoComplete="firstname"
                                required={true}
                                className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/**
                         * surname
                         *
                         * **/}
                    <div>
                        <label htmlFor="lastname"
                               className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                            Surname
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                value={register.last_name}
                                onChange={(e) => setRegister({ ...register, last_name: e.target.value})}
                                autoComplete="lastname"
                                required={true}
                                className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/***
                     email
                     **/}
                    <div>
                        <label htmlFor="email"
                               className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                value={register.email}
                                onChange={(e) => setRegister({...register, email: e.target.value})}
                                autoComplete="email"
                                required={true}
                                className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/**
                     password
                     **/}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                autoComplete="current-password"
                                required={true}
                                value={register.password}
                                onChange={(e) => setRegister({ ...register, password: e.target.value})}
                                className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/***
                     confirm password
                     **/}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmpassword"
                                   className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                autoComplete="confirmpassword"
                                required={true}
                                value={register.confirm_password}
                                onChange={(e) => setRegister({...register, confirm_password: e.target.value})}
                                className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`flex w-full justify-center rounded-md ${isDarkTheme ? 'bg-[#F58426] hover:bg-blue-700' : 'bg-blue-700 hover:bg-[#F58426]'}  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-sm text-gray-500 ">
                    ------------
                    <span
                        className={` text-xl mx-3 font-semibold  ${isDarkTheme ? "text-[#F58426]" : 'text-blue-700'}`}>
                           or join with
                        </span>
                    ------------
                </p>
                <div className="flex items-center justify-center mt-4 mb-24">
                    <button
                        className={`bg-gray-300 w-1/3 text-gray-900 py-1.5 rounded-md mr-2 flex items-center justify-center`}>
                        <FcGoogle
                            size={30}
                        />
                    </button>
                    <button
                        className={`bg-gray-300 w-1/3 text-gray-900 py-1.5 rounded-md mr-2 flex items-center justify-center`}>
                        <BsApple size={30}/>
                    </button>
                    <button
                        className="bg-gray-300 w-1/3 text-gray-900 py-1.5 rounded-md flex items-center justify-center">
                        <TiVendorMicrosoft
                            size={30}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;