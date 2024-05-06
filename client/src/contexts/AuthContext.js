import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext(null);

/***
 * 
 * @component AuthContextProvider
 * @description - This component is used to provide the authentication context to the child components.
 * @param {Object} children - The child components.
 * @returns {JSX.Element} - The rendered AuthContextProvider context.
 * 
 */
const AuthContextProvider = ({ children }) => {
  const access_token = localStorage.getItem("access_token");
  const stored_refresh_token = localStorage.getItem("refresh_token");
  const [auth, setAuth] = useState(access_token !== null);
  const [refreshToken, setRefreshToken] = useState(
    stored_refresh_token !== null
  );

  /****
   * 
   * @description - This useEffect hook is used to set the auth and refresh token to null if they are not present.
   * 
   */
  useEffect(() => {
    if (!access_token) {
      setAuth(null);
    }
    if (!stored_refresh_token) {
      setRefreshToken(null);
    }
  }, [access_token, stored_refresh_token]);


  /***
   * 
   * @function refreshAccessToken
   * @description - This function is used to refresh the access token from the server.
   * @returns {Promise<void>} - The promise to refresh the access token.
   * 
   * 
   */
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stored_refresh_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (response.status === 200) {
        const { access_token, refresh_token } = responseData;

        document.cookie = `access_token=${access_token}; path=/; SameSite=None; Secure=true;`;
        document.cookie = `refresh_token=${refresh_token}; path=/; SameSite=None; Secure=true;`;


        setAuth(access_token);
        setRefreshToken(refresh_token);
      }
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      setAuth(null);
    }
  };

  /**
   * 
   * 
   * @description - This useEffect hook is used to refresh the access token when it is about to expire.
   * 
   * 
   */
  useEffect(() => {
    if (access_token) {
      const decodedToken = JSON.parse(atob(access_token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      const timeUntilExpiration = expirationTime - currentTime;

      const timer = setTimeout(() => {
        refreshAccessToken().then();
      }, timeUntilExpiration > 5000 ? timeUntilExpiration - 5000 : timeUntilExpiration);

      const periodicTimer = setInterval(() => {
        refreshAccessToken().then();
      }, 60 * 60 * 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(periodicTimer);
      };
    }
  }, [access_token, stored_refresh_token]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
