import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactComponent as DensityIcon } from './density_medium_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as TableRowsIcon } from './table_rows_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as CloseIcon } from './close_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import './MainNavbar.css';
import { getSession, logout } from '../api'; // api 파일에서 getSession 함수 임포트
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
  left: ${props => (props.show ? '0' : '-350px')};
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
  height: 40px; /* 버튼 높이 지정 */
  background: transparent; /* 배경색 투명하게 설정 */
`;

const MainNavbar = ({ onTabClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [user, setUser] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response && response.user && response.user.email) {
          setUser(response.user);
          await fetchChatRooms(response.user.email);
        }else {
          console.log('NO active session or invalid user data');
          setUser(null);
          setChatRooms([]);
        }
      } catch (error) {
        console.error('Error during session check:', error);
        setUser(null)
        setChatRooms([])
      }
    };


    checkSession();
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onTabClick(tab);
    setIsSidebarOpen(false); // 탭 클릭 시 사이드바 닫기
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

  const fetchChatRooms = async (user) => {
    if (!user || !user.email){
      console.log('Invalid user data');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8082/api/rooms', {
        params: { userId: user.email },
        withCredentials: true
      });
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };


  const handleCreateChatRoom = async () => {
    if (chatRooms.length >= 3) {
      alert('채팅방은 최대 3개까지 생성할 수 있습니다.');
      return;
    }

    try {
      if (!user || !user.email) {
        alert('사용자 정보를 찾을 수 없습니다. 다시 로그인해 주세요.');
        return;
      }

      console.log('Sending request to create chat room for user:', user.email);

      const response = await axios.post('http://localhost:8082/api/room',
          { userId: user.email },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
      );

      console.log('Server response:', response.data);

      // 서버 응답 구조에 따라 이 부분을 수정
      if (response.data) {
        const newChatRoom = {
          id: response.data.id,
          name: response.data.name,
          userId: response.data.userId,
          openedAt: response.data.openedAt
        };

        setChatRooms(prevRooms => [...prevRooms, newChatRoom]);
        alert('새로운 채팅방이 생성되었습니다.');
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('채팅방 생성 오류:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`채팅방 생성 실패: ${error.response.data || '알 수 없는 오류'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        console.error('Error message:', error.message);
        alert('채팅방 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  };


  const handleDeleteChatRoom = async (room) => {
    if (!room || room.id){
      console.log('Invalid room object:',room);
      alert('유효하지 않은 채팅방 정보입니다')
    }


    try {
      await axios.delete(`http://localhost:8082/api/room/${room.id}`, {
        params: { userId: user.email },
        withCredentials: true
      });

      setChatRooms(prevRooms => prevRooms.filter(room => room.roomId !== room.id));
      alert('채팅바이 성공적으로 삭제되었습니다')
    } catch (error) {
      console.error('Error deleting chat room:', error);
      alert('채팅방 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleChatRoomClick = (room) => {
    const userId = user ? user.email : 'guest';
    navigate(`/chat?roomid=${room.id}&userid=${userId}`);
  };

  return (
      <div>
        <NavbarContainer>
          <ButtonContainer onClick={toggleLeftSidebar} style={{ cursor: 'pointer', position: 'fixed', top: '10px', left: '10px' }}>
            <TableRowsIcon />
          </ButtonContainer>
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
              style={{ listStyle: 'none', padding: '15px' }}
          >
            {['◎ 실시간 차트', '◎ 재무제표 확인', '◎ 챗봇', '◎ 내정보'].map((tab) => (
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
                      style={{ marginTop: '320px', cursor: 'pointer' }}
                  >
                    반가워요! <b>{user.name}</b>님
                  </motion.li>
                  <motion.li
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ marginTop: '5px', cursor: 'pointer' }}
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
                onClick={handleCreateChatRoom}
            >
              새 채팅방 만들기
            </motion.li>
            {chatRooms.map((room, index) => (
                <motion.li
                    key={room.id || index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ marginBottom: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                    onClick={() => handleChatRoomClick(room)}
                >
                  <span>{room.name || `채팅방${room.id}`}</span>
                  <button onClick={() => handleDeleteChatRoom(room)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: 'red' }}>
                    삭제
                  </button>
                </motion.li>
            ))}
          </motion.ul>
        </LeftSidebar>
      </div>
  );
};

export default MainNavbar;