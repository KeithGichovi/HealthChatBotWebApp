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

    const refreshAccessToken = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/refresh_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${stored_refresh_token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            if (response.status === 201){
                const { access_token, refresh_token } = responseData

                localStorage.setItem("access_token", access_token)
                localStorage.setItem("refresh_token", refresh_token)

                setAuth(access_token)
                setRefreshToken(refresh_token)
            }

        } catch (error) {
            console.error("Error refreshing access token: ", error);
            setAuth(false);
        }
    };
    
    useEffect(() => {
        if (access_token) {
            // Decode the access token to get the expiration time
            const decodedToken = JSON.parse(atob(access_token.split(".")[1]));
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

            // Calculate the remaining time until expiration
            const currentTime = new Date().getTime();
            const timeUntilExpiration = expirationTime - currentTime;

            // Set up a timer to refresh the access token before it expires
            const timer = setTimeout(() => {
                refreshAccessToken()
            }, timeUntilExpiration);

            // Clean up the timer when the component unmounts or the access token changes
            return () => clearTimeout(timer);
        }
    }, [access_token, stored_refresh_token]);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, refreshToken, setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;