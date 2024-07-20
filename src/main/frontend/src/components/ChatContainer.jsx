import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { TypeAnimation } from 'react-type-animation';
import styled from 'styled-components';
import './ChatUI.css';
import RotateIcon from './rotate_right_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';

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
  background-color: #4850588f;
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
`;

const ButtonLogo = styled.h3`
  font-family: 'Black Ops One', sans-serif;
  margin: 15px;
  position: relative;
  top: 300px;
  font-size: 36px;
`;

const ChatContainer = ({ roomId, messages, onSend, showLogoAndButtons, setShowLogoAndButtons, animatedMessageIds, setAnimatedMessageIds }) => {
  const prevMessagesLengthRef = useRef(messages.length);
  const prevRoomIdRef = useRef(roomId);

  useEffect(() => {
    if (roomId !== prevRoomIdRef.current) {
      console.log('Room changed:', roomId);
      prevMessagesLengthRef.current = messages.length;
      prevRoomIdRef.current = roomId;
      setAnimatedMessageIds(new Set()); // Reset animated message IDs when room changes
    } else if (messages.length > prevMessagesLengthRef.current) {
      const newMessage = messages[messages.length - 1];
      console.log('New message added:', newMessage);
      if (newMessage.sender === 'bot' && newMessage.id !== 'loading') {
        setAnimatedMessageIds((prevIds) => {
          const updatedIds = new Set(prevIds).add(newMessage.id);
          localStorage.setItem(`animatedMessageIds_${roomId}`, JSON.stringify(Array.from(updatedIds)));
          return updatedIds;
        });
      }
      prevMessagesLengthRef.current = messages.length;
      setShowLogoAndButtons(false); // Hide logo and buttons when a new message is added
    }
  }, [messages, roomId, setAnimatedMessageIds, setShowLogoAndButtons]);

  useEffect(() => {
    const storedAnimatedIds = localStorage.getItem(`animatedMessageIds_${roomId}`);
    if (storedAnimatedIds) {
      setAnimatedMessageIds(new Set(JSON.parse(storedAnimatedIds)));
    }
  }, [roomId, setAnimatedMessageIds]);

  const handleButtonClick = (message) => {
    console.log('Button clicked:', message);
    onSend(message);
    setShowLogoAndButtons(false);
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
  };

  const preprocessMarkdown = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    text = text.replace(/(\d+\.)\s/g, '\n$1 ');

    return text;
  };

  const renderMessage = (message) => {
    const processedText = preprocessMarkdown(message.text);

    if (message.id === 'loading') {
      return <img src={RotateIcon} alt="Loading..." className="loading-icon" />;
    }

    const shouldAnimate = message.sender !== 'user' && !animatedMessageIds.has(message.id);

    return shouldAnimate ? (
      <TypeAnimation
        sequence={[processedText]}
        speed={50}
        wrapper="div"
        cursor={false}
        repeat={0}
        onComplete={() => {
          setAnimatedMessageIds((prevIds) => {
            const updatedIds = new Set(prevIds).add(message.id);
            localStorage.setItem(`animatedMessageIds_${roomId}`, JSON.stringify(Array.from(updatedIds)));
            return updatedIds;
          });
        }}
      />
    ) : (
      <ReactMarkdown
        components={customRenderers}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {processedText}
      </ReactMarkdown>
    );
  };

  return (
    <ChatContainerWrapper className="chat-container">
      {showLogoAndButtons && (
        <>
          <ButtonLogo>InGen</ButtonLogo>
          {messages.length === 0 && (
            <DefaultButtonsContainer>
              <DefaultButton onClick={() => handleButtonClick('사이트 소개를 해줘!')}>
                사이트 소개 알려주기
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
