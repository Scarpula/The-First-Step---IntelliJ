import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const MenuButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  right: 55px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 999;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.show ? '0' : '-350px')};
  width: 300px;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`;

const TextButton = styled.div`
  color: #007bff;
  cursor: pointer;
  margin: 10px;
  font-size: 18px;

  &:hover {
    color: #0056b3;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <NavbarContainer>
        <Logo>InvestGenius</Logo>
        <MenuButton src="/images/density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu" onClick={toggleSidebar} />
      </NavbarContainer>
      <Overlay show={isOpen} onClick={toggleSidebar} />
      <Sidebar show={isOpen}>
        <TextButton>로그인</TextButton>
        <TextButton>회원가입</TextButton>
      </Sidebar>
    </>
  );
};

export default Navbar;
