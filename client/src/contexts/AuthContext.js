import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const access_token = localStorage.getItem("access_token");
  const stored_refresh_token = localStorage.getItem("refresh_token");
  const [auth, setAuth] = useState(access_token !== null);
  const [refreshToken, setRefreshToken] = useState(
    stored_refresh_token !== null
  );

  useEffect(() => {
    if (!access_token) {
      setAuth(null);
    }
    if (!stored_refresh_token) {
      setRefreshToken(null);
    }
    console.log("Access_token", access_token)
    console.log("Refresh_Token", refreshToken)
  }, [access_token, stored_refresh_token]);
  /**
   *
   * @function - logout
   * @description - handles the logout functionality and redirects users to the login page.
   * @function - setAuth
   * @function - setRefreshToken
   *
   * *****/
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth(false);
    setRefreshToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/refresh_token", {
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

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        setAuth(access_token);
        setRefreshToken(refresh_token);
      }
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      setAuth(false);
    }
  };

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
      value={{ auth, setAuth, refreshToken, setRefreshToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
