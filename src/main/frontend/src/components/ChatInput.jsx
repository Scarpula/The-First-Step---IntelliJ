import React, { useState, useCallback } from 'react';
import './ChatUI.css'

const ChatInput = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    }, [input, onSend]);

    const isInputEmpty = input.trim().length === 0;

    const buttonStyle = {
        background: isInputEmpty ? '#ccc' : 'linear-gradient(135deg, #4a90e2, #50e3c2)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: isInputEmpty ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        padding: '10px 20px',
        transition: 'all 0.3s ease',
        opacity: isInputEmpty ? 0.5 : 1,
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
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                        if (!isInputEmpty) {
                            e.target.style.transform = 'scale(1.05)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isInputEmpty) {
                            e.target.style.transform = 'scale(1)';
                        }
                    }}
                    disabled={isInputEmpty}
                >
                    전송
                </button>
            </div>
            <div className="disclaimer">추천 투자를 맹신해서는 안됩니다.</div>
        </form>
    );
};

export default ChatInput;