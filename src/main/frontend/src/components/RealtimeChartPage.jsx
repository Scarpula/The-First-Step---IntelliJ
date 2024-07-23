import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from 'axios';
import { motion, Variants } from 'framer-motion';
import KeywordTable from './KeywordTable';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const YearDropdown = ({ isOpen, year, onYearChange, buttonRef }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        onYearChange(year);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onYearChange, year, buttonRef]);

  const dropdownPosition = buttonRef.current?.getBoundingClientRect();

  return createPortal(
    <motion.ul
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: {
          clipPath: "inset(0% 0% 0% 0% round 10px)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05
          }
        },
        closed: {
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3
          }
        }
      }}
      style={{
        position: 'absolute',
        top: dropdownPosition ? `${dropdownPosition.bottom + window.scrollY}px` : '0',
        left: dropdownPosition ? `${dropdownPosition.left + window.scrollX}px` : '0',
        pointerEvents: isOpen ? "auto" : "none",
        zIndex: 1000
      }}
      className="year-dropdown"
      ref={dropdownRef}
    >
      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
        <motion.li
          key={year}
          variants={itemVariants}
          onClick={() => onYearChange(year)}
          className="year-item"
        >
          {year}
        </motion.li>
      ))}
    </motion.ul>,
    document.body
  );
};

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [showKeywordTable, setShowKeywordTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const yearButtonRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8082/api/stock-data', {
        params: {
          companyName: companyName,
          startDate: `${year}-01-01`,
          endDate: `${year}-12-31`
        }
      });

      if (response.data.length === 0) {
        setError('검색 결과가 없습니다.');
        setShowKeywordTable(true);
        setStockData([]);
      } else {
        const formattedData = response.data.map(item => ({
          x: new Date(item.trade_date),
          y: [Number(item.open), Number(item.high), Number(item.low), Number(item.close)]
        }));
        setStockData(formattedData);
        setShowKeywordTable(false);
      }
    } catch (err) {
      setError('해당 주식 데이터는 없습니다...');
      console.error('Error fetching data:', err);
      setShowKeywordTable(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleKeywordClick = (keyword) => {
    setCompanyName(keyword);
    fetchData();
  };

  const options = {
    title: {
      text: `${companyName} Stock Price - ${year}`
    },
    charts: [{
      data: [{
        name: "Price (in USD)",
        type: "candlestick",
        risingColor: "#008000",
        fallingColor: "#FF0000",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMM DD YYYY",
        dataPoints: stockData
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date(`${year}-01-01`),
        maximum: new Date(`${year}-12-31`)
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100" style={{ marginTop: '75px' }}>
      <div className="w-full p-4 bg-white shadow-md">
        <form onSubmit={handleSubmit} className="flex space-x-4" style={{
            position: 'absolute',
            top: '80px',
            zIndex: 0,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'baseline'
        }}>
          <div className="input-container" style={{zIndex: '1px'}}>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              required
              className="SearchingInput"
            />
            <label>회사 이름</label>
            <span></span>
          </div>
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="selectYear"
          >
            <motion.button
              ref={yearButtonRef}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-1 border rounded bg-blue-500 text-white"
              type="button"
              style={{
                marginLeft: '30px',
                borderRadius: '8px',
                height: '50px',
                zIndex: '1px'
              }}
            >
              {year}
              <motion.div
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.2 }}
                style={{ originY: 0.55, display: 'inline-block', marginLeft: '5px' }}
              >
                <svg width="15" height="15" viewBox="0 0 20 20">
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg>
              </motion.div>
            </motion.button>
            <YearDropdown
              isOpen={isOpen}
              year={year}
              onYearChange={handleYearChange}
              buttonRef={yearButtonRef}
            />
          </motion.nav>
          <motion.button
            type="submit"
            className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{ marginLeft: '10px', borderRadius: '8px', height: '50px'}}
          >
            검색
          </motion.button>
        </form>
      </div>

      <div className="flex-grow w-full p-4 relative flex justify-center items-center" style={{ marginTop: '65px' }}>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">로딩 중...</div>
          </div>
        )}
        {error && <div className="text-center text-red-500 mb-4" style={{ textAlign: 'center' }}>{error}</div>}
        {!isLoading && !error && stockData.length > 0 && (
          <div className="w-full">
            <CanvasJSStockChart options={options} />
          </div>
        )}
        {showKeywordTable && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <KeywordTable onKeywordClick={handleKeywordClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StockChart;

// 스타일을 컴포넌트 내부에 추가
const styles = `
  .input-container {
    position: relative;
    width: 300px;
  }

  .SearchingInput {
    font-size: 15px;
    color: #222222;
    width: 300px;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;
  }

  input::placeholder { color: #aaaaaa; }
  input:focus { outline: none; }

  span {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #666;
    width: 0;
    height: 2px;
    border-radius: 2px;
    transition: 0.5s;
  }

  label {
    position: absolute;
    color: #aaa;
    left: 10px;
    font-size: 20px;
    bottom: 8px;
    transition: all .2s;
  }

  input:focus ~ label, input:valid ~ label {
    font-size: 16px;
    bottom: 40px;
    color: #666;
    font-weight: bold;
  }

  input:focus ~ span, input:valid ~ span {
    width: 100%;
  }

  button {
    background-color: #87ceeb;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #00bfff;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .loading-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .year-dropdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .year-item {
    padding: 10px;
    margin: 5px 0;
    background: #f9f9f9;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    list-style-type: none;
  }

  .year-item:hover {
    background: #e9e9e9;
    transform: translateX(5px);
  }

  .year-item:active {
    background: #d9d9d9;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);