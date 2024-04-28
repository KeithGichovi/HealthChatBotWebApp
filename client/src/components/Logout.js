import  { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

const Logout = () => {
  const history = useNavigate();
  const { setAuth , setRefreshToken } = useContext(AuthContext);

  /**
   *
   * @function - handleLogout
   * @description - handles the logout functionality and redirects users to the login page.
   * @function - setAuth
   * @function - setRefreshToken
   *
   * *****/
  const handleLogout = () => {
        setAuth(false);
        setRefreshToken(null);
        history('/login')
  }

    useEffect(() => {
        handleLogout();
    }, [setAuth]);
    return null;
}

export default Logout;