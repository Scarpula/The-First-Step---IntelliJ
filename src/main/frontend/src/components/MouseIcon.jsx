import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const MouseIconContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 2s infinite;
  z-index: 1000;
`;

const MouseIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Mouse = () => {
  return (
    <MouseIconContainer>
      <MouseIcon src="/images/496855-200.png" alt="Mouse Icon" />
    </MouseIconContainer>
  );
};

export default Mouse;
