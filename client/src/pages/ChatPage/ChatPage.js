import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import ChatSection from "./ChatSection";
import { IoSend } from "react-icons/io5";

const ChatPage = () => {
    const [userChat, setUserChat] = useState('');
    const [messages, setMessages] = useState([])
    const handleSubmit = () => {

    }

  return (
      <div>
          <CursorAnimated/>
          <Navbar/>
          <ChatSection messages={messages}/>
          <div className="pb-8 bottom-1 fixed w-full">
              <form>
                  <input
                      className="h-16"
                      type='text'
                      placeholder='Ask Maria a Question..'
                      value={userChat}
                      onChange={(e) => {
                          setUserChat(e.target.value);
                      }}
                  />
                  <button className="bg-blue-700 text-white px-12 py-8 rounded-3xl" onSubmit={handleSubmit}>
                      <IoSend
                        size={20}
                        color={'#ffffff'}
                      />
                  </button>
              </form>
          </div>
      </div>
  )
}

export default ChatPage;