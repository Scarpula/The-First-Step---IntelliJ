import React from 'react';
import './ChatUI.css';
import { TypeAnimation } from 'react-type-animation';

const ChatContainer = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-bubble ${message.sender === 'user' ? 'right' : 'left'}`}
        >
          {message.sender === 'bot' ? (
            <TypeAnimation
              sequence={[message.text]}
              speed={50}
              wrapper="p"
              cursor={false}
              repeat={0}
            />
          ) : (
            <p>{message.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
