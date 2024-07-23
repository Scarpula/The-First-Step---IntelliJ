import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatUI from './components/ChatUI';
import BackgroundImages from './components/BackgroundImages';
import styled from 'styled-components';
import { SectionsContainer, Section } from 'react-fullpage';
import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import axios from 'axios';

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
  text-align: center;
  margin-top: 140px;
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
  border: 1px;
`;

const Home = ({ handleLoginSuccess }) => {
  const fullTitle = '투자의 ';
  const fullSubtitle = '시작';
  const fullSubtext = 'InvestGenius';
  const fullText = '당신의 투자 성향에 맞춘 전략을 제공해드립니다.\n당신이 원하는 정보를 검색해보세요!';
  const fullText2 = '채팅하는 장면 동영상 섹션';
  const options = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: '50px',
    sectionPaddingBottom: '50px',
    arrowNavigation: true,
  };

  return (
    <>
      <BackgroundImages />
      <h3 style={{ margin: '15px' }}>InGen</h3>
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
                fullTitle + fullSubtitle + '\n' + fullSubtext,
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
                marginBottom: '300px',
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
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '140px',
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
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '130px',
            }}
          />
        </SectionStyled>
      </SectionsContainer>
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/session', { withCredentials: true });
      if (response.status === 200 && response.data.user) {
        setIsLoggedIn(true);
        setUserId(response.data.user.id);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('인증 확인 실패:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태를 표시합니다.
  }

 return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route
            path="/chat/*"
            element={
              isLoggedIn ? (
                <ChatUIWrapper
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <ChatUI userId={userId} />
                </ChatUIWrapper>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/realtime-chart"
            element={
              isLoggedIn ? (
                <ChatUIWrapper
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <ChatUI userId={userId} />
                </ChatUIWrapper>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/financial-statements"
            element={
              isLoggedIn ? (
                <ChatUIWrapper
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <ChatUI userId={userId} />
                </ChatUIWrapper>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/user-info"
            element={
              isLoggedIn ? (
                <ChatUIWrapper
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <ChatUI userId={userId} />
                </ChatUIWrapper>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              <AnimatePresence>
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Home handleLoginSuccess={handleLoginSuccess} />
                </motion.div>
              </AnimatePresence>
            }
          />
        </Routes>
      </AppWrapper>
    </Router>
  );
};

export default App;