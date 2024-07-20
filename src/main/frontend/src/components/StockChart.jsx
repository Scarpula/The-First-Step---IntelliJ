import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './StockChart.css';

const StockChart = ({ data, stockName }) => {
    const [timeFrame, setTimeFrame] = useState('minute');
    const svgRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            const { clientWidth, clientHeight } = svgRef.current;
            setDimensions({ width: clientWidth, height: clientHeight });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 50, right: 30, bottom: 50, left: 50 };
        const width = dimensions.width - margin.left - margin.right;
        const height = dimensions.height - margin.top - margin.bottom;

        const filteredData = filterDataByTimeFrame(data, timeFrame);

        const x = d3.scaleTime()
            .domain(d3.extent(filteredData, d => new Date(d.datetime)))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([d3.min(filteredData, d => +d.close), d3.max(filteredData, d => +d.close)])
            .nice()
            .range([height, 0]);

        const xAxis = g => g
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        const yAxis = g => g
            .call(d3.axisLeft(y))
            .call(g => g.select('.domain').remove())
            .call(g => g.append('text')
                .attr('x', 3)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start')
                .text('Price'));

        const line = d3.line()
            .defined(d => !isNaN(d.close))
            .x(d => x(new Date(d.datetime)))
            .y(d => y(d.close))
            .curve(d3.curveMonotoneX);

        svg.append('rect')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('fill', '#f3f4f6');

        svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(xAxis);

        svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .call(yAxis);

        svg.append('path')
            .datum(filteredData)
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background', '#f4f4f4')
            .style('padding', '5px 10px')
            .style('border', '1px solid #ddd')
            .style('border-radius', '5px')
            .style('opacity', 0);

        svg.selectAll('circle')
            .data(filteredData)
            .enter()
            .append('circle')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('cx', d => x(new Date(d.datetime)))
            .attr('cy', d => y(d.close))
            .attr('r', 4)
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => {
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip.html(`날짜(Date): ${d.datetime}<br/>가격(Price): ${d.close}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                tooltip.transition().duration(500).style('opacity', 0);
            });

        svg.append('text')
            .attr('x', (width + margin.left + margin.right) / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '24px')
            .attr('fill', 'black')
            .text(stockName);

    }, [data, stockName, timeFrame, dimensions]);

    const filterDataByTimeFrame = (data, timeFrame) => {
        const currentDate = new Date();
        switch (timeFrame) {
            case 'second':
                return data.filter(d => new Date(d.datetime) >= d3.timeSecond.offset(currentDate, -60));
            case 'minute':
                return data.filter(d => new Date(d.datetime) >= d3.timeMinute.offset(currentDate, -60));
            case 'hour':
                return data.filter(d => new Date(d.datetime) >= d3.timeHour.offset(currentDate, -24));
            case 'day':
                return data.filter(d => new Date(d.datetime) >= d3.timeDay.offset(currentDate, -30));
            case 'month':
                return data.filter(d => new Date(d.datetime) >= d3.timeMonth.offset(currentDate, -12));
            default:
                return data;
        }
    };

    return (
        <div className="chart-container">
            <div className="controls">
                <label>기간(Time Frame): </label>
                <select value={timeFrame} onChange={e => setTimeFrame(e.target.value)}>
                    <option value="second">초봉(Seconds)</option>
                    <option value="minute">분봉(Minutes)</option>
                    <option value="hour">시봉(Hours)</option>
                    <option value="day">일봉(Days)</option>
                    <option value="month">월봉(Months)</option>
                </select>
            </div>
            <svg ref={svgRef} width="80%" height="400"></svg>
        </div>
    );
};

export default StockChart;