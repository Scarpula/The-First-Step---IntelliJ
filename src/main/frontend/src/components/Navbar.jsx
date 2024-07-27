import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Global styles
const GlobalStyle = createGlobalStyle`
    body {
        background: #e9e9e9;
        color: #666666;
        font-family: 'RobotoDraft', 'Roboto', sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

// Navbar styles
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

// Sidebar styles
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

// Container and Card styles
const Container = styled.div`
    position: relative;
    max-width: 460px;
    width: 100%;
    margin: 0 auto 100px;
`;

const Card = styled.div`
    position: relative;
    background: #ffffff;
    border-radius: 5px;
    padding: 60px 0 40px 0;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: 0.3s ease;

    &:first-child {
        background: #fafafa;
        height: 10px;
        border-radius: 5px 5px 0 0;
        margin: 0 10px;
        padding: 0;
    }
`;

const Title = styled.h1`
    position: relative;
    z-index: 1;
    border-left: 5px solid skyblue;
    margin: 0 0 35px;
    padding: 10px 0 10px 50px;
    color: skyblue;
    font-size: 32px;
    font-weight: 600;
    text-transform: uppercase;
`;

// Input and Label styles
const InputContainer = styled.div`
    position: relative;
    margin: 0 60px 50px;
`;

const Input = styled.input`
    outline: none;
    z-index: 1;
    position: relative;
    background: none;
    width: 100%;
    height: 60px;
    border: 0;
    color: #212121;
    font-size: 24px;
    font-weight: 400;

    &:focus ~ label,
    &:valid ~ label {
        color: #9d9d9d;
        transform: translate(-12%, -50%) scale(0.75);
    }

    &:focus ~ .bar:before,
    &:focus ~ .bar:after {
        width: 50%;
    }
`;

const InputLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    color: #757575;
    font-size: 24px;
    font-weight: 300;
    line-height: 60px;
    transition: 0.2s ease;
`;

const Bar = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    background: #757575;
    width: 100%;
    height: 1px;

    &:before,
    &:after {
        content: '';
        position: absolute;
        background: skyblue;
        width: 0;
        height: 2px;
        transition: 0.2s ease;
    }

    &:before {
        left: 50%;
    }

    &:after {
        right: 50%;
    }
`;

// Button styles
const Button = styled.button`
    outline: 0;
    cursor: pointer;
    position: relative;
    display: inline-block;
    background: 0;
    width: 240px;
    border: 2px solid #e3e3e3;
    padding: 20px 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.3s ease;

    span {
        position: relative;
        z-index: 1;
        color: #ddd;
        transition: 0.3s ease;
    }

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        background: skyblue;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        margin: -15px 0 0 -15px;
        opacity: 0;
        transition: 0.3s ease;
    }

    &:hover,
    &:active,
    &:focus {
        border-color: skyblue;

        span {
            color: skyblue;
        }
    }

    &:active,
    &:focus {
        span {
            color: #ffffff;
        }

        &:before {
            opacity: 1;
            transform: scale(10);
        }
    }
`;

// Footer styles
const Footer = styled.div`
    margin: 40px 0 0;
    color: #d3d3d3;
    font-size: 24px;
    font-weight: 300;
    text-align: center;

    a {
        color: inherit;
        text-decoration: none;
        transition: 0.3s ease;

        &:hover {
            color: #bababa;
        }
    }
`;

// Success animation styles
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


// Navbar component
const Navbar = ({ onLoginSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);
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

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Toggle between login and signup forms
    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    // Handle login form submission
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



    const KAKAO_REST_API_KEY = 'd30a03746900aa2ed901790716355981';
    const KAKAO_REDIRECT_URI = 'http://localhost:8081/api/kakao';

    const handlekakaologin = () => {
        console.log("Redirecting to Kakao login...");
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    };



    const handleKakaoCallback = async () => {
        const code = new URL(window.location.href).searchParams.get("code");
        console.log("Received authorization code:", code);

        if (code) {
            try {
                console.log("Requesting access token with code:", code);

                const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: KAKAO_REST_API_KEY,
                        redirect_uri: KAKAO_REDIRECT_URI,
                        code: code,
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                });

                console.log("Received token response:", tokenResponse.data);

                const { access_token, refresh_token } = tokenResponse.data;

                console.log("Sending tokens to backend...");

                const response = await axios.post('http://localhost:8082/api/kakao', {
                    accessToken: access_token,
                    refreshToken: refresh_token
                });

                console.log('Backend response:', response.data);
                await checkLoginStatus();
                onLoginSuccess();
                navigate('/chat');  // 성공 시에만 채팅 페이지로 이동
            } catch (error) {
                console.error('Error in Kakao login process:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                }
                // 에러 발생 시 처리 (예: 에러 페이지로 이동 또는 에러 메시지 표시)
                navigate('/error');  // 또는 적절한 에러 처리
            }
        } else {
            console.log("No authorization code found in URL");
            navigate('/');  // 코드가 없을 경우 홈페이지로 이동
        }
    };





    // Handle signup form submission
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
                    setShowLoginForm(true);
                }, 2000);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    // Check user session
    const checkSession = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/session', { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Error during session check:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Checking for Kakao authorization code...");
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            handleKakaoCallback().then(() => {
                checkSession();
            });
        } else {
            console.log("No code found, not calling handleKakaoCallback");
            checkSession();
        }
    }, []);

    return (
        <>
            <GlobalStyle />
            <Overlay show={isOpen} onClick={toggleSidebar} />
            <NavbarContainer>
                <Logo></Logo>
                <MenuButton src="/images/density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu" onClick={toggleSidebar} />
            </NavbarContainer>
            <Sidebar show={isOpen}>
                <Container>
                    <Card />
                    <Card>
                        <Title style={{marginRight:200}}>{showLoginForm ? 'Login' : 'Join'}</Title>
                        <form onSubmit={showLoginForm ? handleLoginSubmit : handleSignupSubmit}>
                            <InputContainer>
                                <Input
                                    type="email"
                                    id="email"
                                    required
                                    value={showLoginForm ? loginEmail : signupEmail}
                                    onChange={(e) => showLoginForm ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)}
                                />
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Bar />
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    type="password"
                                    id="password"
                                    required
                                    value={showLoginForm ? loginPassword : signupPassword}
                                    onChange={(e) => showLoginForm ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
                                />
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Bar />
                            </InputContainer>
                            {!showLoginForm && (
                                <>
                                    <InputContainer>
                                        <Input
                                            type="text"
                                            id="username"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Bar />
                                    </InputContainer>
                                    <InputContainer>
                                        <Input
                                            type="date"
                                            id="birthdate"
                                            required
                                            value={birthdate}
                                            onChange={(e) => setBirthdate(e.target.value)}
                                        />
                                        <InputLabel htmlFor="birthdate"></InputLabel>
                                        <Bar />
                                    </InputContainer>
                                </>
                            )}
                            <Button type="submit" style={{marginLeft:30}}>
                                <span>{showLoginForm ? 'Login' : 'Join'}</span>
                            </Button>
                            <Button onClick={handlekakaologin} style={{marginTop:10, marginLeft:30, backgroundColor:"#fee500",
                                border:"none"}}>
                                <span  style={{color:"#3c1a1a",fontSize:"18px", fontWeight:"bold"}}>카카오톡 로그인</span>
                            </Button>
                        </form>
                        <Footer>
                            <a href="#" onClick={toggleForm} style={{ fontSize: 18, color: "black" }}>
                                {showLoginForm
                                    ? <>계정이 없으신가요? <strong>가입하기</strong></>
                                    : <>이미 계정이 있으신가요? <strong>로그인</strong></>}
                            </a>
                        </Footer>
                        <AnimatePresence>
                            {signupSuccess && (
                                <SuccessOverlay
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.svg
                                        width="100"
                                        height="100"
                                        viewBox="0 0 50 50"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <SuccessCircle
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        />
                                        <SuccessCheckmark
                                            d="M14 26 L 22 33 L 36 18"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.8 }}
                                        />
                                    </motion.svg>
                                </SuccessOverlay>
                            )}
                        </AnimatePresence>
                    </Card>
                </Container>
            </Sidebar>
        </>
    );
};

export default Navbar;