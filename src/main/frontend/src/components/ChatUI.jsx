import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';
import BackgroundImages from './BackgroundImages';
import styled from 'styled-components';
import './ChatUI.css';
import { ReactComponent as ArrowDownwardIcon } from './arrow_downward_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import RealtimeChartPage from "./RealtimeChartPage";
import FinancialStatementsPage from "./FinancialStatementsPage";
import UserInfo from './UserInfo';
import { getSession } from '../api'; // Import the getSession function

const ChatUIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatUIContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  position: relative;
`;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 85px;
  left: 470px;
  background: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 1200px) {
    left: 915px;
  }
`;

const ChatUI = () => {
  const [messages, setMessages] = useState({});
  const [animatedMessageIds, setAnimatedMessageIds] = useState(new Set());
  const [showLogoAndButtons, setShowLogoAndButtons] = useState({});
  const chatContentRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error during session check:', error);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (chatContentRef.current) {
      const { scrollHeight, clientHeight } = chatContentRef.current;
      chatContentRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContentRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10);
      }
    };

    const chatContentNode = chatContentRef.current;
    if (chatContentNode) {
      chatContentNode.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chatContentNode) {
        chatContentNode.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scroll({
        top: chatContentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleSend = async (messageText) => {
    const roomId = new URLSearchParams(location.search).get('roomid') || '1';
    const messageId = Date.now();
    const userMessage = { id: messageId, text: messageText, sender: 'user' };
    console.log('User message sent:', userMessage);
    setMessages((prevMessages) => {
      const updatedMessages = {
        ...prevMessages,
        [roomId]: [...(prevMessages[roomId] || []), userMessage],
      };
      return updatedMessages;
    });

    const loadingMessage = { id: 'loading', text: '...', sender: 'bot' };
    setMessages((prevMessages) => {
      const updatedMessages = {
        ...prevMessages,
        [roomId]: [...(prevMessages[roomId] || []), loadingMessage],
      };
      return updatedMessages;
    });

    try {
      const response = await fetch('http://112.217.124.195:30001/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: messageText }),
      });

      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }

      const data = await response.json();
      const botMessage = { id: Date.now(), text: data.response, sender: 'bot' };
      console.log('Bot response received:', botMessage);

      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: prevMessages[roomId].filter((message) => message.id !== 'loading'),
        };
        return updatedMessages;
      });

      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: [...(prevMessages[roomId] || []), botMessage],
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { id: Date.now(), text: '챗봇이 응답할 수 없습니다.', sender: 'bot' };
      console.log('Bot error message:', errorMessage);
      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: prevMessages[roomId].filter((message) => message.id !== 'loading'),
        };
        return updatedMessages;
      });

      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: [...(prevMessages[roomId] || []), errorMessage],
        };
        return updatedMessages;
      });
    }
  };

  const handleTabClick = (tab) => {
    console.log('Tab clicked:', tab);
    // URL 변경은 MainNavbar에서 처리됩니다.
  };

  const renderCurrentPage = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const roomId = searchParams.get('roomid') || '1';

    if (path.startsWith('/chat')) {
      return (
          <>
            <ChatUIContent ref={chatContentRef} className="custom-scrollbar">
              <ChatContainer
                  roomId={roomId}
                  messages={messages[roomId] || []}
                  onSend={handleSend}
                  showLogoAndButtons={showLogoAndButtons[roomId] !== false}
                  setShowLogoAndButtons={(value) => setShowLogoAndButtons((prev) => ({ ...prev, [roomId]: value }))}
                  animatedMessageIds={animatedMessageIds}
                  setAnimatedMessageIds={setAnimatedMessageIds}
              />
              <ScrollButton visible={showScrollButton} onClick={scrollToBottom}>
                <ArrowDownwardIcon />
              </ScrollButton>
            </ChatUIContent>
            <ChatInput onSend={handleSend} />
          </>
      );
    } else if (path === '/realtime-chart') {
      return <RealtimeChartPage />;
    } else if (path === '/financial-statements') {
      return <FinancialStatementsPage />;
    } else if (path === '/user-info') {
      return <UserInfo />;
    }
  };

  return (
      <ChatUIWrapper>
        <BackgroundImages />
        <MainNavbar onTabClick={handleTabClick} isChatPage={location.pathname.startsWith('/chat')} />
        {renderCurrentPage()}
      </ChatUIWrapper>
  );
};

export default ChatUI;