import React, { useState } from 'react';
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
  max-width: 140px;
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
  position : relative;
  top : 300px;
  font-size : 36px;
`;

const ChatContainer = ({ messages, loadingMessageId, onSend }) => {
  const [showLogoAndButtons, setShowLogoAndButtons] = useState(true);

  const handleButtonClick = (message) => {
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
                투자성향 분석하기
              </DefaultButton>
              <DefaultButton onClick={() => handleButtonClick('오늘의 전략을 추천해줘!')}>
                전략 추천 받기
              </DefaultButton>
              <DefaultButton onClick={() => handleButtonClick('어제 시장에 대해서 알려줘!')}>
                어제 시장 알아보기
              </DefaultButton>
            </DefaultButtonsContainer>
          )}
        </>
      )}
      {messages.map((message) => {
        const processedText = preprocessMarkdown(message.text);

        return (
          <div
            key={message.id}
            className={`chat-bubble ${message.sender === 'user' ? 'right' : 'left'}`}
          >
            {message.sender === 'bot' && message.id === 'loading' ? (
              <img src={RotateIcon} alt="Loading..." className="loading-icon" />
            ) : (
              message.sender === 'bot' ? (
                <TypeAnimation
                  sequence={[processedText]}
                  speed={50}
                  wrapper="div"
                  cursor={false}
                  repeat={0}
                >
                  {(text) => (
                    <ReactMarkdown
                      components={customRenderers}
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      children={text}
                      linkTarget="_blank"
                      className="markdown-content"
                    />
                  )}
                </TypeAnimation>
              ) : (
                <p>{message.text}</p>
              )
            )}
          </div>
        );
      })}
    </ChatContainerWrapper>
  );
};

export default ChatContainer;
