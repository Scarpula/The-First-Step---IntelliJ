import React from 'react';
import '../ChatUI.css';

const ChatContainer = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-bubble ${message.sender === 'user' ? 'right' : 'left'}`}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;