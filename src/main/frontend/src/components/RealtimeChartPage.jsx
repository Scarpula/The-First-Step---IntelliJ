import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from 'axios';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('AAPL');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8082/api/stock-data', {
        params: {
          assetName: symbol,
          startDate: `${year}-01-01`,
          endDate: `${year}-12-31`
        }
      });

      const formattedData = response.data.map(item => ({
        x: new Date(item.trade_date),
        y: [Number(item.open), Number(item.high), Number(item.low), Number(item.close)]
      }));

      setStockData(formattedData);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol, year]);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value.toUpperCase());
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const options = {
    title: {
      text: `${symbol} Stock Price - ${year}`
    },
    charts: [{
      data: [{
        type: "candlestick",
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
    <div className="flex flex-col items-center w-full h-screen bg-gray-100" style={{marginTop : '75px'}}>
      <div className="w-full p-4 bg-white shadow-md">
        <form onSubmit={handleSubmit} className="flex space-x-4" style={{position : 'relative',top:'30px',left:'290px',zIndex:1}}>
          <input
            type="text"
            value={symbol}
            onChange={handleSymbolChange}
            placeholder="Enter stock symbol"
            className="px-2 py-1 border rounded"
          />
          <select
            value={year}
            onChange={handleYearChange}
            className="px-2 py-1 border rounded"
          >
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button type="submit" className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            Search
          </button>
        </form>
      </div>

      <div className="flex-grow w-full p-4">
        {isLoading && <div className="text-center">로딩 중...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && !error && (
          <CanvasJSStockChart options={options} />
        )}
      </div>
    </div>
  );
};

export default StockChart;