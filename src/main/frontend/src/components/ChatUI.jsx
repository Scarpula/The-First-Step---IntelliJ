import React, { useState, useEffect, useRef } from 'react';
import MainNavbar from './MainNavbar';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';
import BackgroundImages from './BackgroundImages';  // Import the BackgroundImages component
import styled from 'styled-components';
import './ChatUI.css';
import { ReactComponent as ArrowDownwardIcon } from './arrow_downward_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';

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
  position: relative;
`;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 85px;
  left: 470px;
  background: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 1200px) {
    left: 915px;
  }
`;

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const chatContentRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (chatContentRef.current) {
      const { scrollHeight, clientHeight } = chatContentRef.current;
      chatContentRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContentRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10); // 맨 하단에 있지 않은 경우에만 버튼 표시
      }
    };

    if (chatContentRef.current) {
      chatContentRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatContentRef.current) {
        chatContentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scroll({
        top: chatContentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleSend = async (messageText) => {
    const messageId = Date.now();
    const userMessage = { id: messageId, text: messageText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const loadingMessage = { id: 'loading', text: '', sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    setLoadingMessageId(messageId);

    try {
      const response = await fetch('http://112.217.124.195:30001/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: messageText }),
      });

      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }

      const data = await response.json();
      const botMessage = { id: Date.now(), text: data.response, sender: 'bot' };

      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== 'loading'));
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { id: Date.now(), text: '챗봇이 응답할 수 없습니다.', sender: 'bot' };
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== 'loading'));
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoadingMessageId(null);
    }
  };

  return (
    <ChatUIWrapper>
      <BackgroundImages /> {/* Add the BackgroundImages component here */}
      <MainNavbar />
      <ChatUIContent ref={chatContentRef} className="custom-scrollbar">
        <ChatContainer messages={messages} loadingMessageId={loadingMessageId} onSend={handleSend} />
        <ScrollButton visible={showScrollButton} onClick={scrollToBottom}>
          <ArrowDownwardIcon />
        </ScrollButton>
      </ChatUIContent>
      <ChatInput onSend={handleSend} />
    </ChatUIWrapper>
  );
};

export default ChatUI;
