import  { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

const Logout = () => {
  const history = useNavigate();
  const { setAuth , setRefreshToken } = useContext(AuthContext);

  const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAuth(false);
        setRefreshToken(null);
        history('/login')
  }

    useEffect(() => {
        handleLogout();
    }, []);

}

export default Logout;