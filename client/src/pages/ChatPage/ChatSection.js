import React from 'react';
import AiMessage from '../../components/AiMessage';
import UserMessage from '../../components/UserMessage';

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
