import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatUI from './components/ChatUI';
import BackgroundImages from './components/BackgroundImages';
import styled from 'styled-components';
import { SectionsContainer, Section } from 'react-fullpage';
import { TypeAnimation } from 'react-type-animation';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SectionStyled = styled(Section)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Content = styled.p`
  font-family: 'Istok Web', sans-serif;
  font-size: 24px;
  color: black;
  margin: 20px 0;
  white-space: pre-wrap;
  overflow: hidden;
`;

const TypingContent = styled(Content)`
  &::after {
    content: '|';
    animation: blink 0.7s infinite;
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const App = () => {
  const [apiResponse, setApiResponse] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/api/hello')
      .then(response => response.text())
      .then(data => setApiResponse(data));
  }, []);

  const handleLoginSuccess = () => {
    setShowChat(true);
  };

  const fullTitle = "투자의 ";
  const fullSubtitle = "시작";
  const fullSubtext = "InvestGenius";
  const fullText = "당신의 투자 성향에 맞춘 전략을 제공해드립니다.\n당신이 원하는 정보를 검색해보세요!";
  const fullText2 = "채팅하는 장면 동영상 섹션";

  const options = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '50px',
    sectionPaddingBottom: '50px',
    arrowNavigation: true
  };

  return (
    <AppWrapper>
      <TransitionGroup>
        {!showChat && (
          <CSSTransition
            key="home"
            timeout={500}
            classNames="fade"
          >
            <div>
              <BackgroundImages />
              <Navbar onLoginSuccess={handleLoginSuccess} />
              <SectionsContainer {...options}>
                <SectionStyled>
                  <TitleContainer>
                    <TypeAnimation
                      sequence={[
                        fullTitle,
                        1000,
                        fullTitle + fullSubtitle,
                        1000,
                        fullTitle + fullSubtitle + "\n" + fullSubtext,
                      ]}
                      wrapper="div"
                      cursor={true}
                      repeat={0}
                      style={{
                        display: 'inline-block',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Istok Web, sans-serif',
                        fontSize: '70px',
                        color: 'black',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        textAlign: 'center',
                      }}
                    />
                  </TitleContainer>
                </SectionStyled>
                <SectionStyled>
                  <TypingContent>
                    <TypeAnimation
                      sequence={[fullText]}
                      wrapper="div"
                      cursor={true}
                      repeat={0}
                      style={{
                        display: 'inline-block',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Istok Web, sans-serif',
                        fontSize: '24px',
                        color: 'black',
                      }}
                    />
                  </TypingContent>
                </SectionStyled>
                <SectionStyled>
                  <TypingContent>
                    <TypeAnimation
                      sequence={[fullText2]}
                      wrapper="div"
                      cursor={true}
                      repeat={0}
                      style={{
                        display: 'inline-block',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Istok Web, sans-serif',
                        fontSize: '24px',
                        color: 'black',
                      }}
                    />
                  </TypingContent>
                </SectionStyled>
              </SectionsContainer>
            </div>
          </CSSTransition>
        )}
        {showChat && (
          <CSSTransition
            key="chat"
            timeout={500}
            classNames="fade"
          >
            <ChatUI />
          </CSSTransition>
        )}
      </TransitionGroup>
    </AppWrapper>
  );
};

export default App;
