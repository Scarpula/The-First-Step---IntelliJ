import React, { useState, useEffect, useRef } from 'react';
import MainNavbar from './components/MainNavbar';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
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

  const handleSend = (messageText) => {
    const userMessage = { text: messageText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botMessage = { text: `챗봇의 응답: ${messageText}`, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
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