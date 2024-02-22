import React, {useContext, useState} from 'react';
import Navbar from "../../components/Navbar";
import CursorAnimated from "../../components/CursorAnimated";
import { ThemeContext } from "../../contexts/ThemeContext";
import TypingAnimation from "../../components/TypingAnimation";
import { IoRefresh } from "react-icons/io5";

const ChatPage = () => {

    const [inputMessage, setInputMessage] = useState('');
    const [response, setResponse] = useState(null)
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {  isDarkTheme  } = useContext(ThemeContext);

    const handleRefresh = () => {
        setChatLog([]);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setChatLog((prev) => [...prev,  {role: "user", message:inputMessage}])

        setInputMessage('');

        try {
            const response = await fetch("http://127.0.0.1:5000/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"user": inputMessage}),
            });

            setIsLoading(true);

            if (!response.ok) {
                new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setResponse(responseData);
            setIsLoading(false);
            setChatLog((prev) => [...prev,  {role: "assistant", message:responseData.message}])

        } catch (e) {
            console.error("Error: ", e);
        }
    }

  return (
      <>
          <CursorAnimated/>
          <Navbar/>
          <div className={`eas-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821]' : ''}`}>
              <div className="container mx-auto max-w-[1000px]">
                  <div className={`flex flex-col lg:rounded-3xl min-h-screen ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex-grow p-6">
                          <div className="flex flex-col space-y-4">
                              {
                                  chatLog.map((message, index) => (
                                      <div key={index} className={`flex ${
                                          message.role === 'user' ? 'justify-end' : 'justify-start'
                                      }`}>
                                          <div className={`${
                                              message.role === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                                          } rounded-lg p-4 text-white max-w-sm`}>
                                              {message.message}
                                          </div>
                                      </div>
                                  ))
                              }
                              {
                                  isLoading &&
                                  <div key={chatLog.length} className="flex justify-start">
                                      <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                                          <TypingAnimation/>
                                      </div>
                                  </div>
                              }
                          </div>
                      </div>
                      <div className={`w-full flex items-center`}>
                          <form onSubmit={handleSubmit} className="min-w-[200px] sm:min-w-[400px] md:min-w-[700px] lg:min-w-[910px] flex-none p-6">
                              <div className={`flex rounded-lg border border-gray-700`}>
                                  <input
                                      type="text"
                                      className={`flex-grow px-4 py-2 bg-transparent ${isDarkTheme ? 'text-white' : 'text-gray-900'} focus:outline-none`}
                                      placeholder="Message MedisSync..."
                                      value={inputMessage}
                                      onChange={(e) => setInputMessage(e.target.value)}
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
      </>

  )
}

export default ChatPage;