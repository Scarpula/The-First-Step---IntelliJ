import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Styled components for Navbar
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
    color: #ABDFF1;
    cursor: pointer;
    margin: 10px;
    font-size: 18px;

    &:hover {
        color: #0C4A60;
    }
`;

const FormContainer = styled.div`
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    max-height: ${props => (props.show ? '500px' : '0')};
    transition: max-height 0.5s ease;
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
    background-color:#ABDFF1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #0C4A60;
    }
`;

const SuccessOverlay = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SuccessCheckmark = styled(motion.path)`
    fill: none;
    stroke: #4caf50;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
`;

const SuccessCircle = styled(motion.circle)`
    fill: none;
    stroke: #4caf50;
    stroke-width: 2;
`;

// Navbar Component
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
    const [user, setUser] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

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
        resetSignupForm();
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/login', {
                email: loginEmail,
                password: loginPassword,
            }, { withCredentials: true });

            if (response.status === 200 && response.data.message === 'Login successful') {
                setError(false);
                onLoginSuccess();
                setIsOpen(false);
                checkSession();
                navigate('/chat');
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/signup', {
                userId: signupEmail,
                password: signupPassword,
                name: username,
                birthdate,
            });

            if (response.status === 200) {
                setError(false);
                setSignupSuccess(true);
                setTimeout(() => {
                    setSignupSuccess(false);
                    setShowSignupForm(false);
                    resetSignupForm();
                }, 2000);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/logout', { withCredentials: true });
            if (response.status === 200) {
                setUser(null);
                alert('Logout successful');
            } else {
                alert('Logout failed');
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/session', { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Error during session check:", error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    useEffect(() => {
        if (isOpen || showLoginForm || showSignupForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen, showLoginForm, showSignupForm]);

    useEffect(() => {
        if (!isOpen) {
            resetSignupForm();
        }
    }, [isOpen]);

    const resetSignupForm = () => {
        setSignupEmail('');
        setSignupPassword('');
        setUsername('');
        setBirthdate('');
    };

    return (
        <>
            <Overlay show={isOpen ? 'true' : undefined} onClick={toggleSidebar} />
            <NavbarContainer>
                <Logo />
                <MenuButton src="/images/density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu" onClick={toggleSidebar} />
            </NavbarContainer>
            <Sidebar show={isOpen}>
                {!user ? (
                    <>
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
                                <Button type="submit">로그인</Button>
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
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    error={error}
                                />
                                <Input
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    error={error}
                                />
                                <Button type="submit">회원가입</Button>
                            </Form>
                        </FormContainer>
                    </>
                ) : (
                    <>
                        <TextButton onClick={handleLogout}>로그아웃</TextButton>
                    </>
                )}
                {signupSuccess && (
                    <SuccessOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <svg width="50" height="50" viewBox="0 0 50 50">
                            <SuccessCircle cx="25" cy="25" r="20" />
                            <SuccessCheckmark d="M15 25l10 10 20-20" />
                        </svg>
                    </SuccessOverlay>
                )}
            </Sidebar>
        </>
    );
};

export default Navbar;
