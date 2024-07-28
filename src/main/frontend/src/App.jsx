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
import { useFollowPointer } from './useFollowPointer';

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
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const delayedFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x : hidden;
    overflow-y : hidden;
`;

const TextWrapperSmallScreen = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 34px;
    color: black;
    width: 50%; // 고정 너비 설정
    max-width: 847px; // 최대 너비 설정
    height: 450px;
    margin-top: 220px;
    margin-left: 4%; // 왼쪽 여백을 퍼센트로 변경
    position: relative;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 2.0s, transform 0.8s;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 962px){
        font-size : 24px;
    }

`;

const TypeAnimationStyled = styled.div`
    display: flex;
    white-space: pre-wrap;
    font-family: 'Hahmlet', serif;
    font-weight : 300;
    font-size: 24px;
    color: black;
    text-align: start;
    justify-content: center;
    margin-top: 85px;
    margin-right: 40px;
    position: relative;
    top: 60px;
    opacity: 0;
    animation: ${fadeIn} 0.5s forwards;
    animation-delay: 0.5s;

    @media (max-width: 962px) {
        margin-top: 140px;
    }
`;

const TypeAnimationStyled2 = styled.div`
    opacity: 0;
    font-family: 'Hahmlet', serif;
    font-weight : 300;
    transform: translateY(-20px);
    animation: ${delayedFadeIn} 0.5s forwards;
    animation-delay: 0.5s;
    font-size : 22px;
    margin-top : 90px;

    @media (max-width: 962px) {
        margin-left: 23px;
    }
`;

const TypeAnimationStyled3 = styled.div`
    opacity: 0;
    font-family: 'Hahmlet', serif;
    font-weight : 300;
    transform: translateY(-20px);
    animation: ${delayedFadeIn} 0.5s forwards;
    animation-delay: 1.0s;
    font-size : 22px;
    margin-top : 25px;

    @media (max-width: 962px) {
        margin-left: 21px;
    }
`;

const TypeAnimationStyled4 = styled.div`
    opacity: 0;
    font-family: 'Hahmlet', serif;
    font-weight : 300;
    transform: translateY(-20px);
    animation: ${delayedFadeIn} 0.5s forwards;
    animation-delay: 1.5s;
    font-size : 22px;
    margin-top : 25px;

    @media (max-width: 962px) {
        margin-left: 20px;
    }
`;

const ImageWrapper1 = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-image: url('/images/Section2.png');
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: translateX(450px); /* 초기 위치를 줄임 */
    transition: opacity 0.7s, transform 0.8s;
    overflow: hidden; /* 요소가 프레임을 벗어나지 않도록 설정 */
    min-width: 300px; /* 최소 너비 설정 */
    min-height: 300px; /* 최소 높이 설정 */
    flex-shrink: 0; /* 크기 축소 방지 */

    &.visible {
        opacity: 1;
        transform: translateX(65px);
    }

    @media (max-width: 962px){
        margin-left: 0px;
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
    overflow: visible;

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
    const Section2Text = 'LLM과의 편안한 대화를 통해 여러분이 원하는 투자 스타일을 발견 하세요.';
    const Section2Text2 = 'LLM이 여러분의 심리 상태, 개인 성향을 이해하고 적절한 투자 스타일을 제시 합니다.';
    const Section2Text3 = '또한, 여러분에 투자 스타일에 알맞은 포트폴리오를 제공합니다.';
    const fullText2 = '실시간 차트와 국내 주요 회사의 재무제표를 제공 합니다.';
    const fullText3 = '전략을 전달하는 과정에서, 해당 전략의 과거 백테스트를 통해';
    const fullText4 = '기대수익률과 변동성은 물론 적절한 보유 비중까지 제공합니다.';
    const [showTypeAnimation, setShowTypeAnimation] = useState(false);
    const [showAdditionalText, setShowAdditionalText] = useState(false);
    const options = {
        sectionClassName: 'section',
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
        scrollBar: false,
        navigation: true,
        verticalAlign: false,
        arrowNavigation: true,
    };

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('text-wrapper-small-screen1')) {
                        setTimeout(() => setShowTypeAnimation(true), 1000);
                    }
                    if (entry.target.classList.contains('text-wrapper-small-screen2')) {
                        setTimeout(() => setShowAdditionalText(true), 1000);
                    }
                } else {
                    entry.target.classList.remove('visible');
                    if (entry.target.classList.contains('text-wrapper-small-screen1')) {
                        setShowTypeAnimation(false);
                    }
                    if (entry.target.classList.contains('text-wrapper-small-screen2')) {
                        setShowAdditionalText(false);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const imageWrapper1 = document.querySelector('.image-wrapper-1');
        const textWrapper1 = document.querySelector('.text-wrapper-small-screen1');
        const textWrapper2 = document.querySelector('.text-wrapper-small-screen2');
        const imageWrapper2 = document.querySelector('.image-wrapper-2');

        if (imageWrapper1) observer.observe(imageWrapper1);
        if (textWrapper1) observer.observe(textWrapper1);
        if (imageWrapper2) observer.observe(imageWrapper2);
        if (textWrapper2) observer.observe(textWrapper2);

        return () => {
            if (imageWrapper1) observer.unobserve(imageWrapper1);
            if (textWrapper1) observer.unobserve(textWrapper1);
            if (imageWrapper2) observer.unobserve(imageWrapper2);
            if (textWrapper2) observer.unobserve(textWrapper2);
        };
    }, []);

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
                                fontWeight: '300',
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
                        <TextWrapperSmallScreen className="text-wrapper-small-screen1" style={{fontFamily: 'Hahmlet, serif', fontWeight: '800'}}>
                            LLM(Large Language Model)을 활용한 투자 성향 분석
                            {showTypeAnimation && (
                                <>
                                    <TypeAnimationStyled2>
                                        {Section2Text}
                                    </TypeAnimationStyled2>
                                    <TypeAnimationStyled3>
                                        {Section2Text2}
                                    </TypeAnimationStyled3>
                                    <TypeAnimationStyled4>
                                        {Section2Text3}
                                    </TypeAnimationStyled4>
                                  </>
                            )}
                        </TextWrapperSmallScreen>
                        <ImageWrapper1 className="image-wrapper-1" style={{ height: '450px', marginTop: '150px', marginRight: '60px'}} />
                    </Container>
                </SectionStyled>
                <SectionStyled>
                    <Container>
                        <TextWrapperSmallScreen className="text-wrapper-small-screen2" style={{ marginBottom: '270px', fontFamily: 'Hahmlet, serif', fontWeight: '800',marginLeft : '165px'}}>
                            의사결정에 필요한 각종 자료 제공
                            {showAdditionalText && (
                                <>
                                    <TypeAnimationStyled2>
                                        {fullText2}
                                    </TypeAnimationStyled2>
                                    <TypeAnimationStyled3>
                                        {fullText3}
                                    </TypeAnimationStyled3>
                                    <TypeAnimationStyled4>
                                        {fullText4}
                                    </TypeAnimationStyled4>
                                </>
                            )}
                        </TextWrapperSmallScreen>
                        <ImageWrapper2 className="image-wrapper-2" style={{ height: '450px', marginTop: '150px', marginRight: '60px',marginLeft : '0' }}>
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
        return <div>Loading...</div>;
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
