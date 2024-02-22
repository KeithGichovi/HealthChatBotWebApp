import React, { useContext } from 'react';
import AiMessage from '../../components/AiMessage';
import UserMessage from '../../components/UserMessage';

const ChatSection = ({ messages }) => {

  return (
    <div className={`flex ${messages.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        {messages.map((message, index) => {
          if (message.role === 'user') {
            return <UserMessage key={index} UserMessageProp={message.message} />;
          } else if (message.role === 'assistant') {
            return <AiMessage key={index} ChatbotMessageProp={message.message} />;
          }
          return null;
        })}
    </div>
  );
};

export default ChatSection;
