import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import { getSession } from '../api';
import axios from "axios"; // Import the getSession function

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
  const [currentPage, setCurrentPage] = useState('chat');
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response && response.user) {
          setUser(response.user);
          const roomIdFromParams = searchParams.get('roomid');
          if (roomIdFromParams) {
            setRoomId(roomIdFromParams);
          } else {
            const userRooms = await fetchUserRooms(response.user.email);
            if (userRooms.length > 0) {
              setRoomId(userRooms[0].id);
              setSearchParams({ roomid: userRooms[0].id, userid: response.user.email });
            }
          }
        }
      } catch (error) {
        console.error('Error during session check:', error);
      }
    };

    checkSession();
  }, [searchParams, setSearchParams]);

  const fetchUserRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/rooms?userId=${user.email}`);
      return response.data.map(room => ({
        id: room.roomId,
        name: room.name || `채팅방 ${room.id}`,
        userId: room.userId,
        openedAt: room.openedAt
      }));
    } catch (error) {
      console.error('Error fetching user rooms:', error);
      return [];
    }
  };

  // Load messages from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat_messages_${roomId}`);
    if (storedMessages) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [roomId]: JSON.parse(storedMessages),
      }));
    }
  }, [roomId]);

  // Load animated message IDs from localStorage
  useEffect(() => {
    const storedAnimatedIds = localStorage.getItem(`animatedMessageIds_${roomId}`);
    if (storedAnimatedIds) {
      setAnimatedMessageIds(new Set(JSON.parse(storedAnimatedIds)));
    }
  }, [roomId]);

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
    const messageId = Date.now().toString();
    const userMessage = { id: messageId, text: messageText, sender: 'user' };
    console.log('User message sent:', userMessage);

    setMessages((prevMessages) => ({
      ...prevMessages,
      [roomId]: [...(prevMessages[roomId] || []), userMessage],
    }));

    // 사용자 메시지를 서버에 저장
    console.log('Sending user message for roomId:', roomId);
    try {
      const userMessageResponse = await axios.post('http://localhost:8082/api/save/user', {
        roomId: roomId,
        chatting: userMessage.text,  // 'chatting' 대신 'content'로 변경
        sender: userMessage.sender
      });
      console.log('Sending user message for roomId:', roomId);
      console.log('User message saved:', userMessageResponse.data);
    } catch (error) {
      console.error('Error saving user message:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }


    const loadingMessage = { id: 'loading', text: '...', sender: 'bot' };
    setMessages((prevMessages) => {
      const updatedMessages = {
        ...prevMessages,
        [roomId]: [...(prevMessages[roomId] || []), loadingMessage],
      };
      localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages[roomId]));
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
        localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages[roomId]));
        return updatedMessages;
      });

      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: [...(prevMessages[roomId] || []), botMessage],
        };
        localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages[roomId]));
        return updatedMessages;
      });
      console.log('Sending bot message for roomId:', roomId);
      try {
        const botMessageResponse = await axios.post('http://localhost:8082/api/save/chatbot', {
          roomId: roomId,
          content: data.response,
          sender: 'BOT'
        });
        console.log('Bot message saved:', botMessageResponse.data);
      } catch (error) {
        console.error('Error saving bot message:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { id: Date.now(), text: '챗봇이 응답할 수 없습니다.', sender: 'bot' };
      console.log('Bot error message:', errorMessage);
      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: prevMessages[roomId].filter((message) => message.id !== 'loading'),
        };
        localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages[roomId]));
        return updatedMessages;
      });

      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [roomId]: [...(prevMessages[roomId] || []), errorMessage],
        };
        localStorage.setItem(`chat_messages_${roomId}`, JSON.stringify(updatedMessages[roomId]));
        return updatedMessages;
      });
    }
  };

  const handleTabClick = (tab) => {
    console.log('Tab clicked:', tab);
    switch (tab) {
      case '◎ 실시간 차트':
        setCurrentPage('realtime-chart');
        break;
      case '◎ 재무제표 확인':
        setCurrentPage('financial-statements');
        break;
      case '◎ 챗봇':
        setCurrentPage('chat');
        break;
      case '◎ 내정보':
        setCurrentPage('user-info');
        break;
      default:
        setCurrentPage('chat');
        break;
    }
  };

  return (
    <ChatUIWrapper>
      <BackgroundImages />
      <MainNavbar onTabClick={handleTabClick} />
      {currentPage === 'chat' ? (
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
      ) : currentPage === 'realtime-chart' ? (
        <RealtimeChartPage />
      ) : currentPage === 'financial-statements' ? (
        <FinancialStatementsPage />
      ) : (
        <UserInfo />
      )}
    </ChatUIWrapper>
  );
};

export default ChatUI;
