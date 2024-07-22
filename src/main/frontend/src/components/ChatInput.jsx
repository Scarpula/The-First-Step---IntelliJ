import React, { useState } from 'react';
import './ChatUI.css'

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
      <form onSubmit={handleSubmit} className="chat-input-container">
        <div className="chat-input">
          <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
          />
          <button type="submit">전송</button>
        </div>
        <div className="disclaimer">추천 투자를 맹신해서는 안됩니다.</div>
      </form>
  );
};

export default ChatInput;