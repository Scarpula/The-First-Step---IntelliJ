import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatUI from './components/ChatUI';
import BackgroundImages from './components/BackgroundImages';
import styled, { keyframes } from 'styled-components';
import { SectionsContainer, Section } from 'react-fullpage';
import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import axios from 'axios';
import { useFollowPointer } from './useFollowPointer'; // Import the custom hook

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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
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

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const TextWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;

    @media (max-width: 962px) {
        margin-left: 40px;
        margin-bottom: 190px;
    }
`;

const TextWrapperSmallScreen = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 50px;
    color: black;
    margin-left: 130px;
    height : 450px;
    margin-top : 220px;
    margin-right : 60px;
    position : relative;
    bottom : 60px;

    @media (max-width: 962px) {
        margin-left: 40px;
        margin-bottom: 0px;
        font-size: 35px;
        position : relative;
        top : 10px;
        height : 450px;
        width : 40%;
    }
`;

const TypeAnimationStyled = styled(TypeAnimation)`
    display: flex;
    white-space: pre-wrap;
    font-family: 'Istok Web', sans-serif;
    font-size: 24px;
    color: black;
    text-align: right;
    justify-content: center;
    margin-top: 85px;
    margin-right: 40px;
    position : relative;
    top : 60px;


    @media (max-width: 962px) {
        margin-top: 140px;
    }
`;

const TypeAnimationStyled2 = styled(TypeAnimation)`
    display: flex;
    white-space: pre-wrap;
    font-family: 'Istok Web', sans-serif;
    font-size: 24px;
    color: black;
    text-align: right;
    justify-content: center;
    margin-top: 125px;
    margin-left: 0;

    @media (max-width: 962px) {
        margin-left: -122px;
    }
`;

const TypeAnimationStyled3 = styled(TypeAnimation)`
    display: flex;
    white-space: pre-wrap;
    font-family: 'Istok Web', sans-serif;
    font-size: 24px;
    color: black;
    text-align: right;
    justify-content: center;
    margin-top: 30px;
    margin-left: 77px;

    @media (max-width: 962px) {
        margin-left: -46px;
    }
`;

const TypeAnimationStyled4 = styled(TypeAnimation)`
    display: flex;
    white-space: pre-wrap;
    font-family: 'Istok Web', sans-serif;
    font-size: 24px;
    color: black;
    text-align: right;
    justify-content: center;
    margin-top: 30px;
    margin-left: 52px;

    @media (max-width: 962px) {
        margin-left: -71px;
    }
`;

const ImageWrapper1 = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-image: url('/images/Section2.png'); /* 이미지 파일 경로를 설정 */
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.5s;

    &.visible {
        opacity: 1;
    }

    @media (max-width : 962px){
        margin-left : 0px;
    }
`;

const ImageWrapper2 = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    perspective: 1000px;

    &:hover .image1 {
        transform: rotateY(-40deg) scale(1.1) translateX(100px);
    }

    &:hover .image2 {
        transform: rotateY(-40deg) scale(1.1) translateX(-150px);
    }

    .image {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        transition: transform 0.5s;
    }

    .image1 {
        background-image: url('/images/section2-1.png');
    }

    .image2 {
        background-image: url('/images/section2-2.png');
    }
`;

const Home = ({ handleLoginSuccess }) => {
    const fullTitle = '투자의 ';
    const fullSubtitle = '시작';
    const fullSubtext = 'InvestGenius';
    const fullText = '최적의 포트폴리오를 제시!\n당신의 성향에 맞는 포트폴리오를 추천받아보세요!';
    const fullText2 = '◎ 실시간 주식 차트 기능';
    const fullText3 = '◎ 국내 주요 회사 재무제표 조회';
    const fullText4 = '◎ 주식에 전문화 된 챗봇 기능';
    const options = {
        sectionClassName: 'section',
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
        scrollBar: false,
        navigation: true,
        verticalAlign: false,
        arrowNavigation: true,
        onLeave: (origin, destination, direction) => {
            const imageWrapper1 = document.querySelector('.image-wrapper-1');
            const textWrapper = document.querySelector('.text-wrapper-small-screen');

            if (destination.index === 1) {
                imageWrapper1.classList.add('visible');
                textWrapper.style.animation = `0.5s ${fadeOut} forwards`;
                textWrapper.style.transform = 'translateY(20px)';
            } else {
                imageWrapper1.classList.remove('visible');
                textWrapper.style.animation = 'none';
                textWrapper.style.transform = 'none';
            }
        }
    };

    return (
        <>
            <BackgroundImages />
            <h3 style={{ margin: '15px', fontFamily: 'Black Ops One, sans-serif' }}>InGen</h3>
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
                                fontFamily: "Hahmlet, serif",
                                fontWeight : '300',
                                fontSize: '70px',
                                color: 'black',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                textAlign: 'center',
                                marginBottom: '165px',
                            }}
                        />
                    </TitleContainer>
                </SectionStyled>
                <SectionStyled>
                    <Container>
                        <TextWrapperSmallScreen className="text-wrapper-small-screen" style={{fontFamily : 'Hahmlet, serif', fontWeight : '800'}}>
                            AI 기반 투자 성향 분석
                            <TypeAnimationStyled
                                sequence={[fullText]}
                                wrapper="div"
                                cursor={false}
                                repeat={0}
                                style = {{
                                    fontFamily : 'Hahmlet, serif',
                                    fontWeight : '300'
                                }}
                            />
                        </TextWrapperSmallScreen>
                        <ImageWrapper1 className="image-wrapper-1" style={{ height: '450px', marginTop: '150px', marginRight: '60px',marginLeft : '60px' }} />
                    </Container>
                </SectionStyled>
                <SectionStyled>
                    <Container>
                        <TextWrapperSmallScreen style={{ marginBottom: '270px' ,fontFamily : 'Hahmlet, serif', fontWeight : '800'}}>
                            투자에 필요한 시각적인 자료 지원
                            <TypeAnimationStyled2
                                sequence={[fullText2]}
                                wrapper="div"
                                cursor={false}
                                repeat={0}
                                style={{
                                    fontFamily : 'Hahmlet, serif',
                                    fontWeight : '300'
                                }}
                            />
                            <TypeAnimationStyled3
                                sequence={[fullText3]}
                                wrapper="div"
                                cursor={false}
                                repeat={0}
                                style={{
                                    fontFamily : 'Hahmlet, serif',
                                    fontWeight : '300'
                                }}
                            />
                            <TypeAnimationStyled4
                                sequence={[fullText4]}
                                wrapper="div"
                                cursor={false}
                                repeat={0}
                                style={{
                                    fontFamily : 'Hahmlet, serif',
                                    fontWeight : '300'
                                }}
                            />
                        </TextWrapperSmallScreen>
                        <ImageWrapper2 style={{ height: '450px', marginTop: '150px', marginRight: '60px' }}>
                            <div className="image image1" />
                            <div className="image image2" />
                        </ImageWrapper2>
                    </Container>
                </SectionStyled>
            </SectionsContainer>
        </>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

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
                <motion.div ref={ref} className="box" style={{ x, y }} />
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
