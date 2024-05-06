import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register  from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import HomePage from "./pages/HomePage/HomePage";
import Appointments from "./pages/Appointments/Appointments";
import ChatPage from "./pages/ChatPage/ChatPage";
import Logout from "./components/Logout";

/***
 * 
 * @component App
 * @description - This component is used to display the app.
 * @returns {JSX.Element} - The rendered App component.
 * 
 */
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index path="/" element={<HomePage/>}/>
              <Route path='/register' element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/appointments" element={<Appointments/>}/>
              <Route path="/chatbot" element={<ChatPage/>}/>
              <Route path="/logout" element={<Logout/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
