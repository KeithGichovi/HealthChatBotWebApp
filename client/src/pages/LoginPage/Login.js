import React, { useState, useContext, useEffect} from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import { ThemeContext } from "../../contexts/ThemeContext";

const Login = () => {

    const { isDarkTheme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleSubmit  = async  (e) => {
        e.preventDefault()

    }

    return (
        <>
            <CursorAnimated/>
            <Navbar/>
            <div className={`flex min-h-[92vh] flex-1 flex-col justify-center px-6 mb-10 lg:px-8 ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className={`text-center text-3xl font-bold leading-9 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required={true}
                                    className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-blue-700 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#F58426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        ?{' '}
                        <a className="font-semibold leading-6 text-blue-700 hover:text-blue-500">

                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;