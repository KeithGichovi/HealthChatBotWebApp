import React, { useState, useContext} from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import Response from "../../components/Response";
import { AuthContext } from "../../contexts/AuthContext";

/***
 * 
 * @component Login
 * @description - This component is used to display the login page.
 * @returns {JSX.Element} - The Login component.
 * 
 */
const Login = () => {

    const history = useNavigate();
    const { isDarkTheme } = useContext(ThemeContext);
    const { setAuth, setRefreshToken } = useContext(AuthContext);
    const [formData, setFormData] = useState({email: '', password: ''});
    const [response, setResponse] = useState(null);


    /***
     * 
     * @function handleSubmit
     * @description - This function is used to handle the form submission.
     * @param {Object} e - The event object.
     * @returns {Promise<void>} - The promise to handle the form submission.
     * 
     */
    const handleSubmit  = async  (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json()
            setResponse(responseData)

            if(response.status === 200){

                const { access_token, refresh_token } = responseData

                document.cookie = `access_token=${access_token}; path=/; SameSite=None; Secure=true;`;
                document.cookie = `refresh_token=${refresh_token}; path=/; SameSite=None; Secure=true;`;

                setAuth(access_token)
                setRefreshToken(refresh_token)

                history('/chatbot')
            }


        }catch (e) {
            console.error("Error: ", e);
        }

    }

    return (
        <div className={`${isDarkTheme ? 'bg-[#0C1821]' : ' ' }`}>
            <CursorAnimated/>
            <Navbar/>
            <div className={`flex h-[760px] sm:h-[990px] lg:h-[870px] flex-1 flex-col justify-center px-6 lg:px-8 ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {response && <Response response={response}/>}
                    <h2 className={`text-center mb-4 text-3xl font-bold leading-9 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-2 mb-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email"
                                   className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    type="email"
                                    autoComplete="email"
                                    required={true}
                                    className="text-xl px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className={`block text-sm font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900 '}`}>
                                    Password
                                </label>
                                {/*<div className="text-sm">*/}
                                {/*    <a href="#" className={`font-semibold  ${ isDarkTheme ? "text-[#F58426] hover:text-orange-300" : 'text-blue-700 hover:text-blue-500'}`}>*/}
                                {/*        Forgot password?*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>
                            <div className="mt-2">
                                <input
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    type="password"
                                    autoComplete="current-password"
                                    required={true}
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
                </div>
            </div>
        </div>
    )
}

export default Login;