import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {

    const access_token = localStorage.getItem("access_token")
    const stored_refresh_token = localStorage.getItem("refresh_token")
    const [auth, setAuth] = useState(access_token !== null);
    const [refreshToken, setRefreshToken] = useState(stored_refresh_token === null)

    useEffect(() => {
        if(!access_token){
            setAuth(null)
        }
        if(!stored_refresh_token){
            setRefreshToken(null)
        }
    }, [access_token, stored_refresh_token]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, refreshToken, setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;