import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatUI from './components/ChatUI';
import BackgroundImages from './components/BackgroundImages';
import styled from 'styled-components';
import { SectionsContainer, Section } from 'react-fullpage';
import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from 'framer-motion'; // 이 줄을 추가
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
  text-align:center;
  margin-top : 140px;
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
const ChatUIWrapper = styled(motion.div)`
  display: flex;
    flex-direction: column;
    height: 100vh;
    border : 1px;
  `;

const App = ({ in: inProp }) => {

  const [showChat, setShowChat] = useState(false);

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
        <AnimatePresence>
          {!showChat && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BackgroundImages />
              <img className="MainLogo" alt="" src="images/MainLogo.png" style={{width : "115px", height : "55px", margin : "25px"}} />
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
                        marginBottom : '300px',
                      }}
                    />
                  </TitleContainer>
                </SectionStyled>
                <SectionStyled>
                    <TypeAnimation
                      sequence={[fullText]}
                      wrapper="div"
                      cursor={true}
                      repeat={0}
                      style={{
                        display: 'flex',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Istok Web, sans-serif',
                        fontSize: '24px',
                        color: 'black',
                        textAlign : 'center',
                        justifyContent : 'center',
                        marginTop : '140px',
                      }}
                    />
                </SectionStyled>
                <SectionStyled>
                    <TypeAnimation
                      sequence={[fullText2]}
                      wrapper="div"
                      cursor={true}
                      repeat={0}
                      style={{
                        display: 'flex',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Istok Web, sans-serif',
                        fontSize: '24px',
                        color: 'black',
                        textAlign : 'center',
                        justifyContent : 'center',
                        marginTop : '130px',
                      }}
                    />
                </SectionStyled>
              </SectionsContainer>
            </motion.div>
          )}
          {showChat && (
            <ChatUIWrapper
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <ChatUI />
            </ChatUIWrapper>
          )}
        </AnimatePresence>
      </AppWrapper>
    );
  };

  export default App;