import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from 'axios';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
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

const DropdownContainer = styled(motion.ul)`
  position: absolute;
  pointer-events: ${props => (props.isOpen ? "auto" : "none")};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled(motion.li)`
  padding: 10px;
  margin: 5px 0;
  background: #f9f9f9;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  list-style-type: none;

  &:hover {
    background: #e9e9e9;
    transform: translateX(5px);
  }

  &:active {
    background: #d9d9d9;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 300px;
  z-index: 1;
`;

const Input = styled.input`
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

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    outline: none;
  }

  &:focus ~ label, &:valid ~ label {
    font-size: 16px;
    bottom: 40px;
    color: #666;
    font-weight: bold;
  }

  &:focus ~ span, &:valid ~ span {
    width: 100%;
  }
`;

const Label = styled.label`
  position: absolute;
  color: #aaa;
  left: 10px;
  font-size: 20px;
  bottom: 8px;
  transition: all 0.2s;
`;

const Span = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #666;
  width: 0;
  height: 2px;
  border-radius: 2px;
  transition: 0.5s;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #4a90e2, #50e3c2);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  height: 50px;

  &:hover {
    background: linear-gradient(135deg, #50e3c2, #4a90e2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
`;

const LoadingOverlay = styled.div`
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
`;

const LoadingContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

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
      <DropdownContainer
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
            top: dropdownPosition ? `${dropdownPosition.bottom + window.scrollY}px` : '0',
            left: dropdownPosition ? `${dropdownPosition.left + window.scrollX}px` : '0',
          }}
          isOpen={isOpen}
          ref={dropdownRef}
      >
        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <DropdownItem
                key={year}
                variants={itemVariants}
                onClick={() => onYearChange(year)}
            >
              {year}
            </DropdownItem>
        ))}
      </DropdownContainer>,
      document.body
  );
};

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('Apple');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [displayedCompanyName, setDisplayedCompanyName] = useState('Apple');
  const [showKeywordTable, setShowKeywordTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const yearButtonRef = useRef(null);

  const fetchData = async (company = companyName, fetchYear = year) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8082/api/stock-data', {
        params: {
          companyName: company,
          startDate: `${fetchYear}-01-01`,
          endDate: `${fetchYear}-12-31`
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
        setDisplayedCompanyName(company);
      }
    } catch (err) {
      setError('해당 주식 데이터는 없습니다...');
      console.error('Error fetching data:', err);
      setShowKeywordTable(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData('Apple', new Date().getFullYear().toString());
  }, []);

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
    fetchData(keyword, year);
  };

  const options = {
    title: {
      text: `${displayedCompanyName} Stock Price - ${year}`,
      fontColor: "#4a90e2"
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
        <div className="w-full p-4 bg-white shadow-md" style={{display : 'flex', justifyContent:'center'}}>
          <form onSubmit={handleSubmit} className="flex space-x-4" style={{
            position: 'absolute',
            top: '41px',
            zIndex: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            flexFlow: 'row',
          }}>
            <InputContainer>
              <Input
                  type="text"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  required
                  className="SearchingInput"
              />
              <Label>회사 이름</Label>
              <Span></Span>
            </InputContainer>
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                className="selectYear"
            >
              <Button
                  ref={yearButtonRef}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  style={{
                    marginLeft: '45px',
                    marginRight: '25px',
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
              </Button>
              <YearDropdown
                  isOpen={isOpen}
                  year={year}
                  onYearChange={handleYearChange}
                  buttonRef={yearButtonRef}
              />
            </motion.nav>
            <Button
                type="submit"
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  top: '2px'
                }}
            >
              검색
            </Button>
          </form>
        </div>

        <div className="flex-grow w-full p-4 relative flex justify-center items-center" style={{ marginTop: '65px' }}>
          {isLoading && (
              <LoadingOverlay>
                <LoadingContent>로딩 중...</LoadingContent>
              </LoadingOverlay>
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