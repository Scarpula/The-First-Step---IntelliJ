import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { TypeAnimation } from 'react-type-animation';
import styled from 'styled-components';
import './ChatUI.css';
import RotateIcon from './rotate_right_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import axios from 'axios';

const ChatContainerWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const DefaultButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
  position: relative;
  top: 300px;
`;

const DefaultButton = styled.button`
  padding: 10px 20px;
  background-color: #f3f3f38f;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  margin: 10px;
  width: 140px;
  height: 130px;

  &:hover {
    background-color: #6a7989;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

const ButtonLogo = styled.h3`
  font-family: 'Black Ops One', sans-serif;
  margin: 15px;
  position: relative;
  top: 300px;
  font-size: 36px;
`;

const ChatContainer = ({ roomId, messages, setMessages, onSend, showLogoAndButtons, setShowLogoAndButtons }) => {
  const prevMessagesLengthRef = useRef(messages.length);
  const prevRoomIdRef = useRef(roomId);
  const [renderTrigger, setRenderTrigger] = useState(false);
  const [typingCompleted, setTypingCompleted] = useState({});

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://112.217.124.195:30000/history', {
          params: { chatroom_id: roomId }
        });

        if (response.data && response.data.chat_history) {
          const chatHistory = response.data.chat_history.map(entry => ({
            id: entry.id,
            text: entry.message,
            sender: entry.speaker,
            isHistoryMessage: true,
            typingCompleted: false
          }));

          setMessages(prevMessages => ({
            ...prevMessages,
            [roomId]: chatHistory
          }));
        }
      } catch (error) {
      }
    };

    fetchChatHistory();
  }, [roomId, setMessages]);

  useEffect(() => {
    if (roomId !== prevRoomIdRef.current) {
      prevMessagesLengthRef.current = messages.length;
      prevRoomIdRef.current = roomId;
    } else if (messages.length > prevMessagesLengthRef.current) {
      const newMessage = messages[messages.length - 1];
      prevMessagesLengthRef.current = messages.length;
      setShowLogoAndButtons(false);
    }
  }, [messages, roomId, setShowLogoAndButtons]);

  const handleButtonClick = (message) => {
    onSend(message);
    setShowLogoAndButtons(false);
  };

  const handleTypingComplete = (messageId) => {
    setTypingCompleted((prev) => ({ ...prev, [messageId]: true }));
  };

  const customRenderers = {
    p: ({ children }) => <p style={{ marginBottom: '1em' }}>{children}</p>,
    h1: ({ children }) => <h1 style={{ marginTop: '1em', marginBottom: '0.5em' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ marginTop: '1em', marginBottom: '0.5em' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ marginTop: '1em', marginBottom: '0.5em' }}>{children}</h3>,
    ul: ({ children }) => <ul style={{ marginBottom: '1em', paddingLeft: '1.5em' }}>{children}</ul>,
    ol: ({ children }) => <ol style={{ marginBottom: '1em', paddingLeft: '1.5em' }}>{children}</ol>,
    li: ({ children, ordered }) => (
      <li style={{ marginBottom: ordered ? '0.5em' : '0.25em', paddingLeft: '0.5em' }}>
        {children}
      </li>
    ),
    strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
  };

  const renderMessage = (message) => {
    if (message.id === 'loading') {
      return <img src={RotateIcon} alt="Loading..." className="loading-icon" />;
    }

    const shouldAnimate = message.sender === 'bot' && !message.isHistoryMessage && !typingCompleted[message.id];

    const renderContent = (text) => (
      <ReactMarkdown
        components={customRenderers}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {text}
      </ReactMarkdown>
    );

    if (shouldAnimate) {
      return (
        <TypeAnimation
          sequence={[
            message.text,
            () => {
              handleTypingComplete(message.id);
            }
          ]}
          wrapper="span"
          cursor={false}
          repeat={0}
          speed={85}
          deletionSpeed={99}
          omitDeletionAnimation={true}
          style={{ whiteSpace: 'pre-line' }}
        />
      );
    } else {
      return renderContent(message.text);
    }
  };

  return (
    <ChatContainerWrapper className="chat-container">
      {showLogoAndButtons && (
        <>
          <ButtonLogo>InGen</ButtonLogo>
          {messages.length === 0 && (
            <DefaultButtonsContainer>
              <DefaultButton onClick={() => handleButtonClick('사이트 소개를 해줘!')}>
                사이트 소개 <br/>알려주기
              </DefaultButton>
              <DefaultButton onClick={() => handleButtonClick('투자성향 분석을 도와줘!')}>
                투자성향 <br />분석하기
              </DefaultButton>
              <DefaultButton onClick={() => handleButtonClick('오늘의 전략을 추천해줘!')}>
                전략 추천 받기
              </DefaultButton>
              <DefaultButton onClick={() => handleButtonClick('어제 시장에 대해서 알려줘!')}>
                어제 시장 <br />알아보기
              </DefaultButton>
            </DefaultButtonsContainer>
          )}
        </>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-bubble ${message.sender === 'user' ? 'right' : 'left'}`}
        >
          {renderMessage(message)}
        </div>
      ))}
    </ChatContainerWrapper>
  );
};

export default ChatContainer;
