import React from 'react';
import Navbar from './components/Navbar';
import BackgroundImages from './components/BackgroundImages';
import Mouse from './components/MouseIcon';
import styled from 'styled-components';
import { SectionsContainer, Section } from 'react-fullpage';
import { TypeAnimation } from 'react-type-animation';



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
      <BackgroundImages />
      <Navbar/>
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
      <Mouse />
    </AppWrapper>
  );
};

export default App;
