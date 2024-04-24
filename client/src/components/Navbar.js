import React, { useState, useContext } from 'react';
import { GrClose } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { Link , useLocation , useNavigate } from 'react-router-dom';
import { ThemeContext } from "../contexts/ThemeContext";
import { BsFillMoonFill } from "react-icons/bs";
import { HiSun } from "react-icons/hi";
import { AuthContext } from "../contexts/AuthContext";


const Navbar = () => {

    const [nav ,setNav] = useState(true);
    const location = useLocation();
    const history = useNavigate();

    const handleNav = () => {
        setNav(!nav)
    }

    const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);
    const { auth, setAuth, setRefreshToken } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAuth(false);
        setRefreshToken(null);
        history('/login')
    }

    return (
        <nav className={`nav-dimensions capitalise ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'}`}>
            <h1 className="text-4xl font-bold">
                <Link to='/'>
                    MediSync
                </Link>
            </h1>
            <ul className="hidden md:flex">
                {
                    isDarkTheme ?

                    <li className={`p-4 duration-700`} onClick={()=> {setDarkTheme(false)}}>
                        <HiSun size={22}/>
                    </li> :
                    <li className={`p-4 duration-700`} onClick={() => {setDarkTheme(true)}}>
                        <BsFillMoonFill size={22}/>
                    </li>

                }
                {
                    auth ? (
                        <>
                            <li className={`p-4 ${location.pathname === '/appointments' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                <Link to="/appointments">
                                    Appointments
                                </Link>
                            </li>
                            <li className={`p-4 ${location.pathname === '/chatbot' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                <Link to="/chatbot">
                                    Chatbot
                                </Link>
                            </li>
                            <li className={`p-4 ${isDarkTheme ? 'text-[#F58426]' : 'text-blue-700'}`}>
                                <Link to="/login" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>

                        </>

                    ) : (
                        <>
                            <li className={`p-4 ${location.pathname === '/register' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                <Link to="/register">
                                    Register
                                </Link>
                            </li>
                            <li className={`p-4 ${location.pathname === '/login' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </>
                    )
                }


            </ul>
            <div onClick={handleNav} className={`block md:hidden ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                {!nav ? (
                    <GrClose size={30}
                             className={`${isDarkTheme ? 'text-white' : 'text-gray-900'} ease-in-out duration-700`}/>
                ) : (
                    <AiOutlineMenu size={30}
                                   className={`${isDarkTheme ? 'text-white' : 'text-gray-900'} ease-in-out duration-700`}/>
                )}
            </div>

            <div className={`${!nav ? 'column-nav z-20 h-screen transition-colors ' + (isDarkTheme ? 'bg-[#0C1821] border-r-gray-100 text-white duration-700' : 'bg-gray-100 border-r-blue-900 transition-colors') : 'fixed h-full left-[-100%] ease-in-out duration-150'}`}>
                <h1 className="text-4xl font-bold m-8">
                    <Link to='/'>
                        MediSync
                    </Link>
                </h1>
                <ul className="m-4">
                    {
                        auth ? (
                            <>
                                <li className={`p-4 border-b border-blue-300 ${location.pathname === '/appointments' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                    <Link to="/appointments">
                                        Appointments
                                    </Link>
                                </li>
                                <li className={`p-4 border-b border-blue-300 ${location.pathname === '/chatbot' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                    <Link to="/chatbot">
                                        Chatbot
                                    </Link>
                                </li>
                                <li className={`p-4 border-b border-blue-300 ${location.pathname === '/logout' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                    <Link to="/logout">
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={`p-4 border-b border-blue-300 ${location.pathname === '/register' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                    <Link to="/register">
                                    Register
                                    </Link>
                                </li>
                                <li className={`p-4 ${location.pathname === '/login' ? (isDarkTheme ? 'text-[#F58426]' : 'text-blue-700') : ''}`}>
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>

                {
                    isDarkTheme ?
                        <div className="absolute left-0 bottom-0 p-8 text-white" onClick={() => {
                            setDarkTheme(false)
                        }}>
                            <HiSun size={22}/>
                        </div> :

                        <div className="absolute left-0 bottom-0 p-8" onClick={() => {
                            setDarkTheme(true)
                        }}>
                        <BsFillMoonFill size={22}/>
                    </div>
                }

            </div>
        </nav>
    )
}

export default Navbar