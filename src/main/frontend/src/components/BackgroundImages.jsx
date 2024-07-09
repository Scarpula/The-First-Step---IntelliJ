import React from 'react';
import styled, { keyframes } from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const rotate1 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotate2 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const rotate3 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const BlurredImage = styled.img`
  position: absolute;
  width: 650px;
  height: 650px;
  filter: blur(45px);
  animation: ${props => props.animation} 20s linear infinite;
`;

const Image1 = styled(BlurredImage)`
  animation: ${rotate1} 20s linear infinite;
`;

const Image2 = styled(BlurredImage)`
  animation: ${rotate2} 20s linear infinite;
`;

const Image3 = styled(BlurredImage)`
  animation: ${rotate3} 20s linear infinite;
`;

const BackgroundImages = () => {
  return (
    <BackgroundContainer>
      <Image1 src="/images/circle_img1.png" alt="Background 1" />
      <Image2 src="/images/circle_img2.png" alt="Background 2" />
      <Image3 src="/images/circle_img3.png" alt="Background 3" />
    </BackgroundContainer>
  );
};

export default BackgroundImages;
