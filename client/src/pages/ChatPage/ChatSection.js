import React from 'react';
import AiMessage from '../../components/AiMessage';
import UserMessage from '../../components/UserMessage';

/***
 * 
 * @component ChatSection
 * @description - This component is used to display the chat section.
 * @param {Object} chatLog - The chat log object.
 * @returns {JSX.Element} - The rendered ChatSection component.
 * 
 */
const ChatSection = ({ chatLog }) => {

  return (
      <>
        {
          chatLog.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {
                      message.role === 'user'? <UserMessage UserMessageProp={message.message}/>
                      : <AiMessage ChatbotMessageProp={message.message}/>
                  }
              </div>
          ))
        }
      </>
  )

};

export default ChatSection;
