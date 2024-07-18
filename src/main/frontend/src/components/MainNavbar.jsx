import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactComponent as TableRowsIcon } from './table_rows_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import './MainNavbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트합니다.

const itemVariants: Variants = {
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
      duration: 0.3,
    },
  },
};

const MainNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  useEffect(() => {
    // 컴포넌트 마운트 시 세션을 확인하여 사용자 정보를 설정합니다.
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/session', { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error during session check:', error);
      }
    };

    checkSession();
  }, []);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/logout', { withCredentials: true });
      if (response.status === 200) {
        setUser(null);
        alert('Logout successful');
        navigate('/'); // 로그아웃 후 홈으로 리디렉션합니다.
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const spanVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const underlineVariants = {
    hidden: { opacity: 0, width: '0%' },
    visible: { opacity: 1, width: '100%' },
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-120%' },
  };

  return (
    <div>
      <div
        className="main-navbar"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleSidebar}>
          <TableRowsIcon style={{ marginLeft: '25px' }} />
        </div>
        <div className={`header-options ${isVisible ? 'visible' : ''}`}>
          <AnimatePresence>
            {isVisible && (
              <>
                {['실시간 차트', '재무재표 확인', '모의 투자', '내정보'].map((tab) => (
                  <motion.span
                    key={tab}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={spanVariants}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleTabClick(tab)}
                    style={{ position: 'relative', cursor: 'pointer' }}
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
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '25px' }}>
            <span>{user.name}님</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}>
              로그아웃
            </button>
          </div>
        )}
      </div>
      <motion.div
        className="menu"
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setIsVisible(false)}
      >
        <motion.ul
          initial="closed"
          animate={isSidebarOpen ? 'open' : 'closed'}
          variants={menuVariants}
          style={{ listStyle: 'none', padding: 0 }}
        >
          {['Chat Room 1', 'Chat Room 2', 'Chat Room 3', 'Chat Room 4', 'Chat Room 5'].map((room, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
            >
              {room}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default MainNavbar;
