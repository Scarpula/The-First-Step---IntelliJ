import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const NavbarContainer = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: top 0.3s;
`;

const HeaderOptionsContainer = styled.div`
    position: fixed;
    top: ${({ isVisible }) => (isVisible ? '50px' : '-100px')};
    left: 0;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: top 0.3s;
    z-index : 999;
`;

const MainNavbar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavbarContainer>
                <h2 style={{ margin: '10px' }}>COMPANY</h2>
            </NavbarContainer>
            <HeaderOptionsContainer isVisible={isVisible}>
                <span>실시간 차트</span>
                <span>재무재표 확인</span>
                <span>모의 투자</span>
                <span>내정보</span>
            </HeaderOptionsContainer>
        </div>
    );
};

export default MainNavbar;
