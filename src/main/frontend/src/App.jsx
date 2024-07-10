import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BackgroundImages from './components/BackgroundImages';
import Mouse from './components/MouseIcon';
import styled from 'styled-components';
import { SectionsContainer, Section } from 'react-fullpage';



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

const Title = styled.span`
  font-family: 'Istok Web', sans-serif;
  font-size: 70px;
  color: black;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.span`
  font-family: 'Istok Web', sans-serif;
  font-size: 70px;
  color: white;
  -webkit-text-stroke: 3px black;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtext = styled.p`
  font-family: 'Gurajada', serif;
  font-size: 70px;
  color: black;
  margin: 20px 0 0 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const fullText = "당신의 투자 성향에 맞춘 전략을 제공해드립니다.\n당신이 원하는 정보를 검색해보세요!";
  const fullText2 = "채팅하는 장면 동영상 섹션";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed here
    return () => clearInterval(intervalId);
  }, [fullText]);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText2.length) {
        setText2((prev) => prev + fullText2[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed here
    return () => clearInterval(intervalId);
  }, [fullText2]);

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
      <BackgroundImages />
      <Navbar/>
      <SectionsContainer {...options}>
        <SectionStyled>
          <TitleContainer>
            <div>
              <Title>투자의 </Title>
              <Subtitle>시작</Subtitle>
            </div>
            <Subtext>InvestGenius</Subtext>
          </TitleContainer>
        </SectionStyled>
        <SectionStyled>
          <TypingContent>{text}</TypingContent>
        </SectionStyled>
        <SectionStyled>
          <TypingContent>{text2}</TypingContent>
        </SectionStyled>
      </SectionsContainer>
      <Mouse />
    </AppWrapper>
  );
};

export default App;
