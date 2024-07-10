import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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
  padding-top: 15px; /* 사이드탭 상단에 마진 15px 추가 */
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

const slideDown = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 500px;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  max-height: ${props => (props.show ? '500px' : '0')};
  transition: max-height 0.5s ease;
  animation: ${props => (props.show ? slideDown : slideUp)} 0.5s ease forwards;
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${props => (props.error ? 'red' : '#ccc')};
  border-radius: 4px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RadioButtonInput = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;

  &:hover {
    background-color: #e0e0e0;
  }

  img {
    margin-right: 10px;
  }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [investmentType, setInvestmentType] = useState('');
    const [error, setError] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLoginClick = () => {
        setShowLoginForm(!showLoginForm);
        setShowSignupForm(false);
    };

    const handleSignupClick = () => {
        setShowSignupForm(!showSignupForm);
        setShowLoginForm(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // Spring 서버와 통신하여 로그인 인증
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const result = await response.json();

            if (result.success) {
                setError(false);
                // 로그인 성공 로직 추가
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Spring 서버와 통신하여 회원가입 처리
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username, birthdate, investmentType }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const result = await response.json();

            if (result.success) {
                setError(false);
                // 회원가입 성공 로직 추가
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        if (isOpen || showLoginForm || showSignupForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen, showLoginForm, showSignupForm]);

    return (
        <>
            <NavbarContainer>
                <Logo>InvestGenius</Logo>
                <MenuButton src="/images/density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu" onClick={toggleSidebar} />
            </NavbarContainer>
            <Overlay show={isOpen ? 'true' : undefined} onClick={toggleSidebar} />
            <Sidebar show={isOpen}>
                <TextButton onClick={handleLoginClick}>로그인</TextButton>
                <FormContainer show={showLoginForm}>
                    <Form onSubmit={handleLoginSubmit}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={error}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                        />
                        <Button type="submit">Sign In</Button>
                    </Form>
                    <TextButton>Forgot password?</TextButton>
                    <LoginButton>
                        <img src="/images/google_icon.svg" alt="Google" />
                        Google로 계속하기
                    </LoginButton>
                    <LoginButton>
                        <img src="/images/microsoft_icon.svg" alt="Microsoft" />
                        Microsoft 계정으로 계속하기
                    </LoginButton>
                    <LoginButton>
                        <img src="/images/apple_icon.svg" alt="Apple" />
                        Apple로 계속하기
                    </LoginButton>
                </FormContainer>
                <TextButton onClick={handleSignupClick}>회원가입</TextButton>
                <FormContainer show={showSignupForm}>
                    <Form onSubmit={handleSignupSubmit}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={error}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                        />
                        <Input
                            type="text"
                            placeholder="이름"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={error}
                        />
                        <Input
                            type="text"
                            placeholder="생년월일"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            error={error}
                        />
                        <span>★투자유형 선택★</span>
                        <RadioButtonContainer>
                            <RadioButtonLabel>
                                <RadioButtonInput
                                    type="radio"
                                    name="investmentType"
                                    value="공격투자형"
                                    checked={investmentType === "공격투자형"}
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                />
                                공격투자형
                            </RadioButtonLabel>
                            <RadioButtonLabel>
                                <RadioButtonInput
                                    type="radio"
                                    name="investmentType"
                                    value="적극투자형"
                                    checked={investmentType === "적극투자형"}
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                />
                                적극투자형
                            </RadioButtonLabel>
                            <RadioButtonLabel>
                                <RadioButtonInput
                                    type="radio"
                                    name="investmentType"
                                    value="위험중립형"
                                    checked={investmentType === "위험중립형"}
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                />
                                위험중립형
                            </RadioButtonLabel>
                            <RadioButtonLabel>
                                <RadioButtonInput
                                    type="radio"
                                    name="investmentType"
                                    value="안정추구형"
                                    checked={investmentType === "안정추구형"}
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                />
                                안정추구형
                            </RadioButtonLabel>
                            <RadioButtonLabel>
                                <RadioButtonInput
                                    type="radio"
                                    name="investmentType"
                                    value="안정형"
                                    checked={investmentType === "안정형"}
                                    onChange={(e) => setInvestmentType(e.target.value)}
                                />
                                안정형
                            </RadioButtonLabel>
                        </RadioButtonContainer>
                        <Button type="submit">회원가입</Button>
                    </Form>
                </FormContainer>
            </Sidebar>
        </>
    );
};

export default Navbar;
