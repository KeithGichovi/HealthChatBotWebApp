import React, { useState } from 'react';
import { DiAtom } from "react-icons/di";
import { GrClose } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { Link , useLocation} from 'react-router-dom';


const Navbar = () => {

    const [nav ,setNav] = useState(true)
    const location = useLocation()

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className="flex top-0 mx-auto w-full h-24 z-[2] items-center justify-between p-8 px-4 text-blue-950">
            <h1 className="text-4xl font-bold text-blue-800">
                <Link to='/'>
                    <DiAtom
                    size={60}
                    />
                </Link>
            </h1>
            <ul className="hidden md:flex">
                <li className={`p-4 ${location.pathname === '/chatbot' ? 'border-b-2 border-blue-800' : 'border-t border-r border-l border-transparent'}`}>
                    <Link to="/chatbot">
                        Chatbot
                    </Link>
                </li>
                <li className={`p-4 ${location.pathname === '/register' ? 'border-b-2 border-blue-800' : 'border-t border-r border-l border-transparent'}`}>
                    <Link to="/register">
                        Register
                    </Link>
                </li>
                <li className={`p-4 ${location.pathname === '/login' ? 'border-b-2 border-blue-800' : 'border-t border-r border-l border-transparent'}`}>
                    <Link to="/login">
                        Login
                    </Link>
                </li>
            </ul>
            <div onClick={handleNav} className="block md:hidden">
                {!nav ? <GrClose size={30} className="text-blue-800"/> : <AiOutlineMenu size={30} className="text-blue-800"/>}
            </div>
            <div
                className={!nav ? "fixed top-0 h-full left-0 w-[60%] border-r border-r-blue-900 bg-gray-50 ease-in-out duration-300": "fixed left-[-100%] ease-in-out duration-200"}>
                <h1 className="text-4xl font-bold text-blue-800 m-4">
                    <DiAtom
                        size={60}

                    />
                </h1>
                <ul className="m-4">
                    <li className={`p-4 border-b border-blue-300 ${location.pathname === '/chatbot' ? 'text-blue-500' : ''}`}>
                        <Link to="/chatbot">
                            Chatbot
                        </Link>
                    </li>
                    <li className={`p-4 border-b border-blue-300 ${location.pathname === '/register' ? 'text-blue-500' : ''}`}>
                        <Link to="/register">
                            Register
                        </Link>
                    </li>
                    <li className={`p-4 ${location.pathname === '/login' ? 'text-blue-500' : ''}`}>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar