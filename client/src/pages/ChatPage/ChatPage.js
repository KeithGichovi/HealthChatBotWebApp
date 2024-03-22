import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import { ThemeContext } from "../../contexts/ThemeContext";
import TypingAnimation from "../../components/TypingAnimation";
import { IoRefresh } from "react-icons/io5";
import ChatSection from "./ChatSection";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


const ChatPage = () => {

    const history = useNavigate();
    const [inputMessage, setInputMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isDarkTheme } = useContext(ThemeContext);
    const { auth } = useContext(AuthContext);


    useEffect(() => {
        const savedChatLog = JSON.parse(localStorage.getItem('chatLog'));
        if (savedChatLog) {
            setChatLog(savedChatLog);
        }
    }, []);
    /**
     *
     * @function - handleRefresh
     * @description - clears chat history and clears local storage
     * @function - setChatLog - clears chat Log.
     *
     * */
    const handleRefresh = () => {
        setChatLog([]);
        localStorage.removeItem('chatLog');
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedChatLog = [...chatLog, { role: "user", message: inputMessage }];
        setChatLog(updatedChatLog);
        localStorage.setItem('chatLog', JSON.stringify(updatedChatLog));
        setInputMessage('');
        setIsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth}`
                },
                body: JSON.stringify({ "user": inputMessage }),
            });
            if (!response.ok) {
                new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setResponse(responseData);
            setIsLoading(false);
            if (response.status === 401  || response.status === 422){
                history('/login')
            }
            const updatedChatLogWithResponse = [...updatedChatLog, { role: "assistant", message: responseData.message }];
            setChatLog(updatedChatLogWithResponse);
            localStorage.setItem('chatLog', JSON.stringify(updatedChatLogWithResponse));
        } catch (e) {
            console.error("Error: ", e);
        }
    };


  return (
      <article className={`${isDarkTheme ? 'bg-[#0C1821]' : 'bg-white'}`}>
          <CursorAnimated/>
          <Navbar/>
          <div className={`ease-in-out duration-300 lg:pb-8 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
              <div className="container mx-auto  me-auto max-w-[1000px]">
                  <div className={`flex flex-col lg:rounded-3xl min-h-[88vh] ease-in-out duration-300`}>
                      <div className="flex-grow p-6 ">
                          <div className="flex flex-col space-y-4">
                              <ChatSection chatLog={chatLog}/>
                              {
                                  isLoading &&

                                  <div key={chatLog.length} className="flex justify-start">
                                      <div className="bg-transparent rounded-lg p-4 max-w-sm">
                                          <TypingAnimation/>
                                      </div>
                                  </div>
                              }
                          </div>
                      </div>
                      <div className={`w-full flex items-center z-2`}>
                          <form onSubmit={handleSubmit} className="min-w-[200px] sm:min-w-[400px] md:min-w-[700px] lg:min-w-[910px] flex-none p-6">
                              <div className={`flex rounded-lg border border-gray-700`}>
                                  <input
                                      type="text"
                                      className={`flex-grow px-4 py-2 bg-transparent ${isDarkTheme ? 'text-white' : 'text-gray-900'} focus:outline-none`}
                                      placeholder="Message MedisSync..."
                                      value={inputMessage}
                                      onChange={(e) => setInputMessage(e.target.value)}
                                      required={true}
                                  />
                                  <button
                                      type="submit"
                                      className={`${isDarkTheme ? 'bg-[#F58426]' : 'bg-blue-700'} rounded-lg px-4 py-2 text-white focus:outline-none hover:bg-[#F58426] transition-colors duration-300`}
                                  >
                                      Send
                                  </button>
                              </div>
                          </form>
                          <div className={`min-w-[100px]`}>
                              <button
                                  type="submit"
                                  className={`${isDarkTheme ? 'bg-[#F58426]' : 'bg-blue-700'} rounded-lg px-4 py-2 font-semibold text-white focus:outline-none hover:bg-[#F58426] transition-colors duration-300`}
                                  onClick={handleRefresh}
                              >
                                  <IoRefresh
                                    size={25}

                                  />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </article>

  )
}

export default ChatPage;