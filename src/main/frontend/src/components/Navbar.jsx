import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const NavbarContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
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

const Navbar = ({ onLoginSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');

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
        console.log("Email:", loginEmail);
        console.log("Password:", loginPassword);
        try {
            const response = await axios.post('http://localhost:8082/api/login', {
                email: loginEmail,
                password: loginPassword,
            });

            if (response.status === 200 && response.data.message === 'Login successful') {
                setError(false);
                onLoginSuccess();  // 로그인 성공 시 콜백 호출
                setIsOpen(false);  // 사이드바 닫기
                const token = response.data.token;
                localStorage.setItem('token', response.data.token);
                onLoginSuccess(token);  // 로그인 성공 시 콜백 호출
            } else {
                setError(true);
                console.log("로그인 실패");
            }
        } catch (error) {
            setError(true);
            console.log("에러");
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // 입력된 값들을 로그로 출력
        console.log("UserId:", signupEmail);
        console.log("Password:", signupPassword);
        console.log("Username:", username);
        console.log("Birthdate:", birthdate);

        try {
            const response = await axios.post('http://localhost:8082/api/signup', {
                userId: signupEmail,
                password: signupPassword,
                name: username,
                birthdate,
            });

            if (response.status === 200) {
                setError(false);
                alert('Signup successful');
                // 회원가입 성공 후 추가 로직
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Error during signup:", error);
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
            <Overlay show={isOpen ? 'true' : undefined} onClick={toggleSidebar} />
            <NavbarContainer>
                <Logo></Logo>
                <MenuButton src="/images/density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu" onClick={toggleSidebar} />
            </NavbarContainer>
            <Sidebar show={isOpen}>
                <TextButton onClick={handleLoginClick}>로그인</TextButton>
                <FormContainer show={showLoginForm}>
                    <Form onSubmit={handleLoginSubmit}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            error={error}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            error={error}
                        />
                        <Button type="submit">Sign In</Button>
                    </Form>
                </FormContainer>
                <TextButton onClick={handleSignupClick}>회원가입</TextButton>
                <FormContainer show={showSignupForm}>
                    <Form onSubmit={handleSignupSubmit}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            error={error}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
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
                            type="date"
                            placeholder="생년월일"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            error={error}
                        />
                        <Button type="submit">회원가입</Button>
                    </Form>
                </FormContainer>
            </Sidebar>
        </>
    );
};

export default Navbar;
