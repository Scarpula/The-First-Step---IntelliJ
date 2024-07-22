import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';

const StockChart = () => {
    const [data, setData] = useState([]);
    const [symbol, setSymbol] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { CanvasJSStockChart } = CanvasJSReact;

    const fetchData = (symbol) => {
        fetch(`http://localhost:8082/api/stock-data?assetName=${symbol}`)
            .then(response => response.json())
            .then(data => {
                // 데이터가 배열인지 확인
                if (Array.isArray(data)) {
                    const formattedData = data.map(item => ({
                        x: new Date(item.tradeDate),
                        y: [item.open, item.high, item.low, item.close]
                    }));
                    setData(formattedData);
                } else {
                    setData([]);
                }
            });
    };

    useEffect(() => {
        if (symbol) {
            fetchData(symbol);
        }
    }, [symbol]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSymbol(inputValue);
    };

    const options = {
        title: {
            text: `${symbol} Stock Chart`
        },
        charts: [{
            data: [{
                type: "candlestick",
                dataPoints: data
            }]
        }]
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter stock symbol"
                />
                <button type="submit">Search</button>
            </form>
            <CanvasJSStockChart options={options} />
        </div>
    );
}

export default StockChart;
