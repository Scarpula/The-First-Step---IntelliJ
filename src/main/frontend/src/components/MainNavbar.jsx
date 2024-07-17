import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactComponent as TableRowsIcon } from './table_rows_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import './MainNavbar.css';

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
