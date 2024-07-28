import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactComponent as DensityIcon } from './density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as TableRowsIcon } from './table_rows_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as CloseIcon } from './close_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import './MainNavbar.css';
import { getSession, logout } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const menuVariants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3 },
  },
};

const underlineVariants = {
  hidden: { opacity: 0, width: '0%' },
  visible: { opacity: 1, width: '100%' },
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 999;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.show ? '0' : '-350px')};
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

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: rotate(45deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const LeftSidebar = styled.div`
  position: fixed;
  top: 150px;
  left: ${(props) => (props.show ? '0' : '-350px')};
  width: 300px;
  height: 70%;
  background: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 998;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  border-right: 1px solid #fff7f7;
  border-radius: 8px;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background: transparent;
`;

const ChatRoomListItem = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
  opacity: 1 !important;
  transform: none !important;
`;

const ChatRoomName = styled.p`
  flex-grow: 1;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: red;
`;

const MainNavbar = ({ onTabClick, isChatPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [user, setUser] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response && response.user && response.user.email) {
          setUser(response.user);
          await fetchChatRooms(response.user.email);
        } else {
          console.log('NO active session or invalid user data');
          setUser(null);
          setChatRooms([]);
        }
      } catch (error) {
        console.error('Error during session check:', error);
        setUser(null);
        setChatRooms([]);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (user) {
      fetchChatRooms(user.email);
    }
  }, [user]);

  const fetchChatRooms = async (userEmail) => {
    if (!userEmail) {
      console.log('Invalid user data');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8082/api/rooms', {
        params: { userId: userEmail },
        withCredentials: true
      });
      console.log('Fetched chat rooms:', response.data);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);

    }
  };

  const handleTabClick = async (tab) => {
    setSelectedTab(tab);
    onTabClick(tab);
    setIsSidebarOpen(false);

    if (tab === '챗봇') {
      navigate(`/chat`);
    } else {
      switch (tab) {
        case '실시간 차트':
          navigate('/realtime-chart');
          break;
        case '재무제표 조회':
          navigate('/financial-statements');
          break;
        case '내정보':
          navigate('/user-info');
          break;
        default:
          navigate('/');
          break;
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        setUser(null);
        navigate('/'); // 로그아웃 후 홈으로 리디렉션합니다.
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleChatRoomClick = async (room) => {
    const userId = user ? user.email : 'guest';
    navigate(`/chat?roomid=${room.chatroomId}&userid=${userId}`);
  };

  const handleDeleteChatRoom = async (room) => {
    try {
      const response = await axios.post('http://112.217.124.195:30000/delete-chatroom', {
        chatroom_id: room.chatroomId,
        user_id: user.email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setChatRooms(prevRooms => prevRooms.filter(r => r.chatroomId !== room.chatroomId));

      } else {
        alert('채팅방 삭제 실패');
      }
    } catch (error) {
      console.error('Error deleting chat room:', error);
    }
  };

  const createNewChatRoom = async () => {
    try {
      const response = await fetch('http://112.217.124.195:30000/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.email }),
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const data = await response.json();
      const newRoomId = data.room_id;
      console.log('New room ID:', newRoomId);

      // 새로운 채팅방 객체 생성
      const newRoom = {
        chatroomId: newRoomId,
        roomName: `채팅방${newRoomId}`,
      };

      // 새로운 채팅방을 현재 채팅방 목록에 즉시 추가 (낙관적 업데이트)
      setChatRooms(prevRooms => [...prevRooms, newRoom]);

      // navigate를 사용하여 새 채팅방으로 이동
      navigate(`/chat?roomid=${newRoomId}&userid=${user.email}`);

    } catch (error) {
      console.error('새 채팅방 생성 중 오류:', error);

    } finally {
      // 에러 발생 여부와 관계없이 채팅방 목록을 다시 가져옴
      await fetchChatRooms(user.email);
    }
  };


  return (
    <div>
      <NavbarContainer>
        {isChatPage && (
          <ButtonContainer onClick={toggleLeftSidebar} style={{ cursor: 'pointer', position: 'fixed', top: '10px', left: '10px' }}>
            <TableRowsIcon />
          </ButtonContainer>
        )}
        <ButtonContainer onClick={toggleSidebar} style={{ cursor: 'pointer', position: 'fixed', top: '10px', right: '10px' }}>
          <DensityIcon style={{ width: '30px', height: '30px' }} />
        </ButtonContainer>
      </NavbarContainer>
      <Overlay show={isSidebarOpen} onClick={toggleSidebar} />
      <Sidebar show={isSidebarOpen}>
        <CloseButton onClick={toggleSidebar} />
        <motion.ul
          initial="closed"
          animate={isSidebarOpen ? 'open' : 'closed'}
          variants={menuVariants}
          style={{ listStyle: 'none', padding: '15px', color:"skyblue" }}
        >
          {['실시간 차트', '재무제표 조회', '챗봇', '내정보'].map((tab) => (
            <motion.li
              key={tab}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hahmlet-text"
              style={{ marginTop: '65px', marginBottom: '65px', cursor: 'pointer', fontSize: '32px' }}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
              {selectedTab === tab && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={underlineVariants}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.li>
          ))}
          {user && (
            <>
              <motion.li
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: '320px', cursor: 'pointer' ,color:'black'}}
              >
                반가워요! <b>{user.name}</b>님
              </motion.li>
              <motion.li
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: '5px', cursor: 'pointer',color:'black' }}
                onClick={handleLogout}
              >
                로그아웃
              </motion.li>
            </>
          )}
        </motion.ul>
      </Sidebar>
      <LeftSidebar show={isLeftSidebarOpen}>
        <motion.ul
          initial="closed"
          animate={isLeftSidebarOpen ? 'open' : 'closed'}
          variants={menuVariants}
          style={{ listStyle: 'none', padding: '15px' }}
        >
          <motion.li
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hahmlet-text"
            style={{ marginBottom: '35px', cursor: 'pointer', fontSize: '24px' }}
            onClick={createNewChatRoom}
          >
            새 채팅방 만들기
          </motion.li>
          {console.log('Rendering chat rooms:', chatRooms)}
          {chatRooms.map((room, index) => (
            <ChatRoomListItem
              key={room.chatroomId || index}
              variants={itemVariants}
              onClick={() => handleChatRoomClick(room)}
            >
              <ChatRoomName>{room.roomName || `채팅방${room.chatroomId}`}</ChatRoomName>
              <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteChatRoom(room); }}>
                삭제
              </DeleteButton>
            </ChatRoomListItem>
          ))}
        </motion.ul>
      </LeftSidebar>
    </div>
  );
};

export default MainNavbar;
