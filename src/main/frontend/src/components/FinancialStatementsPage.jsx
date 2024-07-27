import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './FinancialStatementsPage.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const API_KEY = 'f0615ca3d4e64374b6b3f427df3d4693093f5860';

const topCompanies = [
    { "name": "기아(KIA)", "code": "(X)" },
    { "name": "SK하이닉스", "code": "00164779" },
    { "name": "삼성화재(SAMSUNGFIRE)", "code": "00139214" },
    { "name": "대한항공", "code": "00113526" },
    { "name": "엘지(LG)", "code": "00120021" },
    { "name": "포스코퓨처엠", "code": "00155276" },
    { "name": "현대자동차(HYUNDAI)", "code": "00164742" },
    { "name": "POSCO홀딩스", "code": "00155319" },
    { "name": "삼성전자(SAMSUNG)", "code": "00126380" },
    { "name": "삼성전자서비스", "code": "(X)" },
    { "name": "삼성SDI", "code": "00126362" },
    { "name": "삼성전기", "code": "00126371" },
    { "name": "HD한국조선해양", "code": "00164830" },
    { "name": "고려아연", "code": "00102858" },
    { "name": "HMM", "code": "00164645" },
    { "name": "현대모비스", "code": "00164788" },
    { "name": "한화에어로스페이스", "code": "00126566" },
    { "name": "한국전력공사", "code": "00159193" },
    { "name": "SK텔레콤", "code": "00159023" },
    { "name": "삼성에스디에스", "code": "00126186" },
    { "name": "기업은행", "code": "00149646" },
    { "name": "삼성물산", "code": "(X)" },
    { "name": "케이티(KT)", "code": "(X)" },
    { "name": "삼성생명", "code": "00126256" },
    { "name": "KT&G", "code": "00244455" },
    { "name": "두산에너빌리티", "code": "00159616" },
    { "name": "SK", "code": "00181712" },
    { "name": "네이버(NAVER)", "code": "00266961" },
    { "name": "카카오(KAKAO)", "code": "00258801" },
    { "name": "한화오션", "code": "00111704" },
    { "name": "한미반도체", "code": "00161383" },
    { "name": "포스코인터내셔널", "code": "00124504" },
    { "name": "LG화학", "code": "00356361" },
    { "name": "신한지주", "code": "00382199" },
    { "name": "LG전자", "code": "00401731" },
    { "name": "셀트리온", "code": "(X)" },
    { "name": "현대글로비스", "code": "00360595" },
    { "name": "하나금융지주", "code": "00547583" },
    { "name": "아모레퍼시픽", "code": "00583424" },
    { "name": "SK이노베이션", "code": "00631518" },
    { "name": "KB금융", "code": "00688996" },
    { "name": "메리츠금융지주", "code": "00860332" },
    { "name": "삼성바이오로직스", "code": "00877059" },
    { "name": "크래프톤", "code": "00760971" },
    { "name": "HD현대일렉트릭", "code": "01205851" },
    { "name": "우리금융지주", "code": "01350869" },
    { "name": "카카오뱅크(KAKAOBANK)", "code": "(X)" },
    { "name": "HD현대중공업", "code": "01390344" },
    { "name": "LG에너지솔루션", "code": "01515323" },
    { "name": "SK스퀘어", "code": "01596425" }
];

const columns = [
    {
        Header: '계정명',
        accessor: 'account_nm',
    },
    {
        Header: '당기금액',
        accessor: 'thstrm_amount',
        Cell: ({ value }) => (value ? parseInt(value).toLocaleString() + '원' : '-'),
    },
    {
        Header: '당기누적금액',
        accessor: 'thstrm_add_amount',
        Cell: ({ value }) => (value ? parseInt(value).toLocaleString() + '원' : '-'),
    },
];

function FinancialStatementsPage() {
    const [corpCode, setCorpCode] = useState('');
    const [year, setYear] = useState('');
    const [quarter, setQuarter] = useState('');
    const [financials, setFinancials] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCompanyList, setShowCompanyList] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState('');
    const [selectedCompanyName, setSelectedCompanyName] = useState('');
    const [showGraph, setShowGraph] = useState(false);
    const companyListRef = useRef(null);

    const fetchFinancials = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8082/api/financials', {
                params: {
                    crtfc_key: API_KEY,
                    corp_code: corpCode,
                    bsns_year: year,
                    reprt_code: quarter,
                    fs_div: 'CFS',
                },
            });

            if (response.data.status !== '000') {
                throw new Error(response.data.message);
            }

            const processedData = response.data.list.reduce((acc, item) => {
                const existingItem = acc.find(i => i.account_nm === item.account_nm);
                if (!existingItem) {
                    acc.push({
                        account_nm: item.account_nm,
                        thstrm_amount: item.thstrm_amount,
                        thstrm_add_amount: item.thstrm_add_amount,
                    });
                }
                return acc;
            }, []);

            setFinancials(processedData);
            setShowCompanyList(false);

            const selectedCompany = topCompanies.find(company => company.code === corpCode);
            setSelectedCompanyName(selectedCompany ? selectedCompany.name : '');

        } catch (error) {
            console.error('API 요청 오류:', error);
            if (error.response) {
                console.error('응답 데이터:', error.response.data);
                console.error('응답 상태:', error.response.status);
                console.error('응답 헤더:', error.response.headers);
            } else if (error.request) {
                console.error('요청은 보냈으나 응답을 받지 못함:', error.request);
            } else {
                console.error('오류 메시지:', error.message);
            }
            setError('재무제표를 불러오는데 실패했습니다: ' + error.message);
            setFinancials(null);
        }
        setLoading(false);
    }, [corpCode, year, quarter]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (corpCode && year && quarter) {
            fetchFinancials();
        } else {
            setError('모든 필드를 선택해주세요.');
        }
    }, [corpCode, year, quarter, fetchFinancials]);

    const handleReset = useCallback(() => {
        setCorpCode('');
        setYear('');
        setQuarter('');
        setFinancials(null);
        setError(null);
        setShowCompanyList(true);
        setShowGraph(false);
    }, []);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        console.log("검색 시작:", searchTerm);

        const searchResult = topCompanies.find(
            company => company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.code.includes(searchTerm)
        );

        console.log("검색 결과:", searchResult);

        if (searchResult && companyListRef.current) {
            setSearchError('');
            const index = topCompanies.indexOf(searchResult);
            const element = companyListRef.current.children[index];
            console.log("찾은 요소:", element);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.backgroundColor = '#ffff99';
                    element.style.transition = 'background-color 0.5s';
                    setTimeout(() => {
                        element.style.backgroundColor = '';
                    }, 3000);
                }, 100);
            }
        } else {
            console.log('검색 결과를 찾을 수 없거나 목록이 준비되지 않았습니다.');
            setSearchError('기업명 또는 코드 검색을 다시 확인해주세요.');
        }
    }, [searchTerm]);

    const handleCompanyClick = useCallback((code) => {
        setCorpCode(code);
    }, []);

    const handleToggleView = () => {
        setShowGraph(!showGraph);
    };

    const prepareChartData = () => {
        const keyItems = ['매출액', '자산총계', '부채총계', '자본총계'];
        const data = keyItems.map(item => {
            const found = financials.find(f => f.account_nm === item);
            return found ? parseInt(found.thstrm_amount) / 100000000 : 0;
        });

        return {
            labels: keyItems,
            datasets: [
                {
                    label: '금액',
                    data: data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(54, 162, 235, 0.6)'
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(54, 162, 235)'
                    ],
                    borderWidth: 1,
                    barThickness: 50,
                    categoryPercentage: 0.8,
                    barPercentage: 0.9,
                }
            ]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '주요 재무항목',
                font: {
                    size: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(context.parsed.y * 100000000);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '(단위: 억원)',
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString();
                    },
                    font: {
                        size: 14
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false,
                    drawOnChartArea: true
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 14
                    }
                }
            }
        }
    };

    const tableData = useMemo(() => financials || [], [financials]);

    const tableOptions = useMemo(() => ({
        columns,
        data: tableData,
        initialState: {
            sortBy: [{ id: 'account_nm', desc: false }]
        }
    }), [tableData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(tableOptions, useSortBy);

    return (
        <div className="financial-page">
            <h1 style={{marginTop: 100}}>국내 기업 재무제표 조회</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={corpCode}
                    onChange={(e) => setCorpCode(e.target.value)}
                    placeholder="기업 코드 (예: 00126380)"
                />
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">연도 선택</option>
                    <option value="2023">2023년</option>
                    <option value="2024">2024년</option>
                </select>
                <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
                    <option value="">분기 선택</option>
                    <option value="11013">1분기</option>
                    <option value="11012">2분기</option>
                    <option value="11014">3분기</option>
                    <option value="11011">4분기</option>
                </select>
                <button type="submit">조회</button>
                <button type="button" onClick={handleReset}>리셋</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {showCompanyList && topCompanies.length > 0 && (
                <div className="company-list">
                    <h2>기업 목록 예시</h2>
                    <form onSubmit={handleSearch} className="company-search-form">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSearchError('');
                            }}
                            placeholder="기업명 또는 코드 검색"
                        />
                        <button type="submit">검색</button>
                    </form>
                    {searchError && <div style={{ color: 'red', marginTop: '10px' }}>{searchError}</div>}
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>기업명</th>
                                <th>기업코드</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="table-scroll-container">
                        <table>
                            <tbody ref={companyListRef}>
                            {topCompanies.map((company, index) => (
                                <tr key={index} onClick={() => handleCompanyClick(company.code)}>
                                    <td>{company.name}</td>
                                    <td>{company.code}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {financials && (
                <div className="financial-results">
                    <h3>
                        {selectedCompanyName && `${selectedCompanyName} - `}
                        {year}년 {quarter === '11013' ? '1분기' :
                        quarter === '11012' ? '2분기' :
                            quarter === '11014' ? '3분기' : '4분기'} 재무제표
                    </h3>
                    <button
                        onClick={handleToggleView}
                        style={{
                            marginBottom: 18,
                            padding: '10px 20px',
                            backgroundColor: showGraph ? '#4CAF50' : '#008CBA',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s, transform 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        {showGraph ? '재무제표 보기' : '주요 재무항목 그래프 보기'}
                    </button>

                    {!showGraph && (
                        <div className="table-container">
                            <table {...getTableProps()}>
                                <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? ' 🔽'
                                                            : ' 🔼'
                                                        : ''}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {showGraph && (
                        <div className="graph-container" style={{ height: '400px', width: '100%' }}>
                            <Bar data={prepareChartData()} options={chartOptions} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FinancialStatementsPage;