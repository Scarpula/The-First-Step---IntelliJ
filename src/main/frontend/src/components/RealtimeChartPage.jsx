import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockChart from './StockChart';

const RealtimeChartPage = () => {
    const [data, setData] = useState([]);
    const [stockSymbol, setStockSymbol] = useState('AAPL'); // 기본 값으로 AAPL 설정
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(
                    `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=1min&apikey=95ef3c3a9b8c463c89607ea05b562248`
                );
                const stockData = response.data.values;
                setData(stockData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStockData();
        const interval = setInterval(fetchStockData, 60000); // 1분마다 업데이트

        return () => clearInterval(interval);
    }, [stockSymbol]);

    const handleSearch = () => {
        setStockSymbol(searchInput.toUpperCase()); // 대문자로 변환하여 설정
    };

    return (
        <div className="App">
            <h1 style={{ marginTop: '130px' }}>{stockSymbol} Chart</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="주식 종목을 입력(예: AAPL)"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <StockChart data={data} stockName={stockSymbol} />
        </div>
    );
};

export default RealtimeChartPage;
