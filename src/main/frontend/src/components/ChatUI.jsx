import React, { useState, useEffect, useRef } from 'react';
import MainNavbar from './MainNavbar';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';
import styled from 'styled-components';
import './ChatUI.css';

const ChatUIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatUIContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
`;

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const chatContentRef = useRef(null);

  useEffect(() => {
    if (chatContentRef.current) {
      const { scrollHeight, clientHeight } = chatContentRef.current;
      chatContentRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  const handleSend = async (messageText) => {
    const userMessage = { text: messageText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await fetch('http://112.217.124.195:30001/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: messageText })
      });

      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }

      const data = await response.json();
      const botMessage = { text: data.response, sender: 'bot' };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: '챗봇이 응답할 수 없습니다.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <ChatUIWrapper>
      <MainNavbar />
      <ChatUIContent ref={chatContentRef} className="custom-scrollbar">
        <ChatContainer messages={messages} />
      </ChatUIContent>
      <ChatInput onSend={handleSend} />
    </ChatUIWrapper>
  );
};

export default ChatUI;