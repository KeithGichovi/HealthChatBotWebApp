import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register  from "./pages/RegisterPage/Register";
import Login from "./pages/LoginPage/Login";
import Profile from "./pages/Profile/Profile";
import HomePage from "./pages/HomePage/HomePage";
import Appointments from "./pages/Appointments/Appointments";
import ChatPage from "./pages/ChatPage/ChatPage";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index path="/" element={<HomePage/>}/>
              <Route path='/register' element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/appointment" element={<Appointments/>}/>
              <Route path="/chatbot" element={<ChatPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
