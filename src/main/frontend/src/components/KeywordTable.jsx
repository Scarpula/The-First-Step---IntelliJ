import React, { useState } from 'react';

const KeywordTable = ({ onKeywordClick }) => {
  const [activeTab, setActiveTab] = useState('KOR');

  const keywords = {
    KOR: [
      '기아', 'SK하이닉스', '삼성화재', '대한항공', 'LG', '포스코퓨처엠', '현대차', 'POSCO홀딩스', '삼성전자', '삼성전자우',
      '삼성SDI', '삼성전기', 'HD한국조선해양', '고려아연', '현대상선', '현대모비스', '한화에어로스페이스', '한국전력', 'SK텔레콤', '삼성에스디에스',
      '기업은행', '삼성물산', 'KT', '삼성생명', 'KT&G', '두산에너빌리티', 'SK', 'NAVER', '카카오', '한화오션',
      '한미반도체', '포스코인터내셔널', 'LG화학', '신한지주', 'LG전자', '셀트리온', '현대글로비스', '하나금융지주', '아모레퍼시픽', 'SK이노베이션',
      'KB금융', '메리츠금융지주', '삼성바이오로직스', '크래프톤', 'HD현대일렉트릭', '우리금융지주', '카카오뱅크', 'HD현대중공업', 'LG에너지솔루션', 'SK스퀘어'
    ],
    USA: [
      '애플', '애브비', '애보트', '액센츄어', '어도비', '아마존', '뱅크오브아메리카', '브리스톨마이어스스큅', '버크셔해서웨이', '컴캐스트',
      '코스트코', '세일즈포스', '시스코', '셰브론', '다나허', '디즈니', '구글', '홈디포', '허니웰', '인텔',
      '존슨앤존슨', '제이피모건', '코카콜라', '엘리릴리', '마스터카드', '메드트로닉', '메타', '페이스북', '머크', '마이크로소프트',
      '넥스트에라에너지', '넷플릭스', '나이키', '엔비디아', '오라클', '펩시코', '화이자', '프록터앤갬블', '필립모리스', '퀄컴',
      '에이티앤티', '서모피셔', '테슬라', '텍사스인스트루먼츠', '유나이티드헬스', '유니온퍼시픽', 'UPS', '비자', '버라이즌', '월마트', '엑손모빌'
    ]
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg" style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: '45px'
           }}>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'KOR' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('KOR')}
        >
          KOR
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'USA' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('USA')}
        >
          USA
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {Array(10).fill().map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array(5).fill().map((_, colIndex) => {
                const index = rowIndex * 5 + colIndex;
                const keyword = keywords[activeTab][index];
                return (
                  <td
                    key={colIndex}
                    className="KeywordTableTd"
                    onClick={() => keyword && onKeywordClick(keyword)}
                  >
                    {keyword || ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeywordTable;

const styles = `
  .KeywordTableTd {
    border: 2px solid black;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .KeywordTableTd:hover {
    background-color: #f0f0f0;
  }
`;

// 스타일을 document에 추가
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);