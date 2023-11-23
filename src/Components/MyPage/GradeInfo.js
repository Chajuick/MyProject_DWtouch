import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// 유저 등급 프로필
import GradeErr from "../../assets/user/grades/user_grades_err.png";
import Grade1 from "../../assets/user/grades/user_grades_1.png";
import Grade2 from "../../assets/user/grades/user_grades_2.png";
import Grade3 from "../../assets/user/grades/user_grades_3.png";
import Grade4 from "../../assets/user/grades/user_grades_4.png";
import Grade5 from "../../assets/user/grades/user_grades_5.png";
import { useState, useEffect } from "react";

const gradesArr = [
  { 
    name: 'NONE', 
    image: GradeErr, 
    color: '#E3E3E3',
    description: null,
    perks: null 
  },
  { 
    name: 'NEW', 
    image: Grade1, 
    color: '#88E2FF',
    description: '최근 6개월간<br />구매경험이 없는 고객',
    perks: [
      { icon: null, text: '구매 후 등급별 맞춤 혜택을 만나보세요!' },
    ]
  },
  { 
    name: 'FRIEND', 
    image: Grade2, 
    color: '#F0F283', 
    description: '주문건수 <b class="redPoints">1건</b> 이상 고객',
    perks: [
      { icon: 'iconamoon:discount-light', text: '전상품 <b>10%</b> 할인' },
    ]
  },
  { 
    name: 'BEST FRIEND', 
    image: Grade3, 
    color: '#FF85EB',
    description: '주문건수 <b class="redPoints">3건</b> 이상 고객',
    perks: [
      { icon: 'iconamoon:discount-light', text: '전상품 <b>15%</b> 할인' },
    ]
  },
  { 
    name: 'FAMILY', 
    image: Grade4, 
    color: '#83F28E',
    description: '주문건수 <b class="redPoints">5건</b> 이상<br/>+<b class="browPoints">10만원</b> 이상 구매 고객', 
    perks: [
      { icon: 'iconamoon:discount-light', text: '전상품 <b>20%</b> 할인' },
      { icon: 'ph:truck', text: '무료배송 쿠폰 <b>x1</b>' },
      { icon: 'tdesign:service', text: '우수회원 고객센터' },
      { icon: 'tdesign:traffic-events', text: '우수회원 이벤트' }
    ]
  },
  { 
    name: 'KING', 
    image: Grade5,
    color: '#F2B283',
    description: '주문건수 <b class="redPoints">10건</b> 이상<br/>+<b class="browPoints">50만원</b> 이상 구매 고객',
    perks: [
      { icon: 'iconamoon:discount-light', text: '전상품 <b>25%</b> 할인' },
      { icon: 'ph:truck', text: '무료배송 쿠폰 <b>x2</b>' },
      { icon: 'tdesign:service', text: '우수회원 고객센터' },
      { icon: 'tdesign:traffic-events', text: '우수회원 이벤트' }
    ]
  },
  { 
    name: 'ADMIN', 
    image: Grade5, 
    color: 'black',
    description: null,
    perks: null
  },
];

const filteredGrades = gradesArr
.filter(grade => grade.name !== 'NONE' && grade.name !== 'ADMIN')
.reverse();

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  padding: 80px 0;
`;

const GradeInfoOverView = styled.div`
  margin-top: 80px;
  width: 1200px;
  h3 {
      font-size: 18px;
      padding: 20px 0;
      border-bottom: 1px solid rgb(40, 40, 40);
      display: flex;
      justify-content: space-between;
    }
`;

const GradeInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgb(220, 220, 220);
`;

const GradeInfoBox = styled.div`
  width: calc( 20% );
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 30px;
  padding-bottom: 110px;
  border-right: 1px solid rgb(220, 220, 220);
  &.sel {
    background-color: #fdfaf4;
  }
  &:last-child {
    border: none;
  }
  ul {
    list-style: none;
    li {
      font-size: 14px;
      color: rgb(80, 80, 80);
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      b {
        font-weight: 400;
      }
      svg {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
`;

const GradeDescription = styled.div`
  color: rgb(80, 80, 80);
  margin-top: 50px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 14px;
  height: 32px;
  b.redPoints {
    color: #e5362c;
  }
  b.brownPoints {
    color: #99844b;
  }
`

const GradeBenefitDescription = styled.span`
  b {
    color: #e5362c;
  }
`

const GradeInfoImg = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${props => filteredGrades[props.$grade].image}); // 등급 이미지 설정
  background-size: cover;
  &.myGrade {
    animation: imgColorChange 4s infinite alternate;
    @keyframes imgColorChange {
      0%, 100%{
        filter: contrast(100%);
      }
      50% {
        filter: contrast(120%);
      }
    }
  }
`;

const GradeName = styled.div`
  position: absolute;
  padding: 5px 10px;
  background-color: white;
  border-radius: 16px;
  color: ${props => filteredGrades[props.$grade].color};
  border: 1px solid ${props =>filteredGrades[props.$grade].color};
  top: 90px;
  &.myGrade {
    animation: imgColorChange 4s infinite alternate;
    @keyframes imgColorChange {
      0%, 100%{
        filter: contrast(100%);
      }
      50% {
        filter: contrast(120%);
      }
    }
  }
`;

const GradeFooter = styled.div`
  width: 1200px;
  margin-top: 120px;
  padding-bottom: 100px;
  h3 {
    font-size: 18px;
    color: rgb(80, 80, 80);
    margin-bottom: 20px;
  }
  ul {
    margin-left: 20px;
    li {
      font-size: 14px;
      color: rgb(150, 150, 150);
      margin-bottom: 5px;
    }
  }
`;

const GradeProfileOverView = styled.div`
  width: 1200px;
  height: 300px;
  background-color: rgb(40, 40, 40);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GradeProfileImg = styled.img`
  margin-left: 80px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${props => gradesArr[props.$grade].image}); // 등급 이미지 설정
  background-size: cover;
  background-position: center;
`;

const GradeProfileInfo = styled.div`
  color: rgb(210, 210, 210);
  padding-right: 150px;
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    b {
      animation: colorChange 4s infinite alternate;
    }
  }
  p {
    font-size: 15px;
    color: rgb(190, 190, 190);
  }
  p:last-child {
    margin-top: 50px;
    font-size: 14px;
    color: rgb(180, 180, 180);
  }
  @keyframes colorChange {
  0%, 100%{
    filter: contrast(100%);
  }
  50% {
    filter: contrast(400%);
  }
}
`;

const GradeProfileDetailInfo = styled.div`
  display: flex;
  padding-left: 50px;
  border-left: 1px solid rgb(100, 100, 100);
  margin-right: 120px;
  flex-direction: column;
  color: rgb(200, 200, 200);
  font-size: 15px;
  div {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(100, 100, 100);
    p {
      color: rgb(210, 210, 210);
    }
    p:last-child {
      color: rgb(180, 180, 180);
    }
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    li {
      display: flex;
      flex-direction: column;
      width: 140px;
      margin-bottom: 10px;
    }
  }
`;


export default function GradeInfo() {
  const [userGrade, setUserGrade] = useState(sessionStorage.getItem('user_grades') || 0);

  useEffect(() => {
    // userGrade가 0일 때만 세션에서 값을 받아오도록
    if (userGrade === 0) {
      const storedUserGrade = sessionStorage.getItem('user_grades');
      if (storedUserGrade !== null) {
        setUserGrade(storedUserGrade);
      }
    }
  }, [userGrade]);

  function calculateGradeCalculationPeriod() {
    const currentDate = new Date(2023, 11, 27);
    const currentYear = currentDate.getFullYear(); // 현재 연도를 가져옵니다.
    const currentMonth = currentDate.getMonth() + 1; // 현재 월을 가져옵니다. (월은 0부터 시작하므로 1을 더합니다.)
  
    // 기준 날짜를 설정합니다.
    let startDate;
    let endDate;
  
    // 현재 날짜로부터 6개월 전을 계산합니다.
    const sixMonthsAgo = new Date(currentDate);
    sixMonthsAgo.setMonth(currentDate.getMonth() - 7);

    // 6개월 전부터 시작합니다.
    startDate = new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth(), 1);

    // 현재 월의 첫 날을 구합니다.
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth - 2, 1);

    // 현재 월의 마지막 날을 계산합니다.
    endDate = new Date(firstDayOfCurrentMonth);
    endDate.setDate(endDate.getDate()-1);

    // 시작일과 종료일을 원하는 형식으로 포맷팅합니다.
    const formattedStartDate = `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}`;
    const formattedEndDate = `${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}`;

    // 결과를 반환합니다.
    return {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  }
  
  const gradeCalculationPeriod = calculateGradeCalculationPeriod();

  return (
    <>
      <Title>등급 안내</Title>
      <GradeProfileOverView>
        <GradeProfileImg $grade={userGrade}/>
        <GradeProfileInfo >
          <h2>
            {sessionStorage.getItem('user_name') ? (
              <>
                {`${sessionStorage.getItem('user_name')}`}님의 회원등급은 <b style={{ color: gradesArr[userGrade].color }}>{gradesArr[userGrade].name}</b>입니다.
              </>
            ) : (
              '이름을 확인할 수 없습니다'
            )}
          </h2>
          <p>{gradesArr[userGrade].name} 등급의 다양한 혜택을 누리세요.<br />쿠폰함을 확인하세요.</p>
          <p>등급 산정기간: {gradeCalculationPeriod.startDate}~{gradeCalculationPeriod.endDate}</p>
        </GradeProfileInfo>
        <GradeProfileDetailInfo>
          <div>
            {
              userGrade == 5 ? (
                <p>
                  감사합니다. 최고등급 <b style={{ color: gradesArr[userGrade].color }}>{gradesArr[userGrade].name}</b>입니다.
                </p>
              ) : (
                <p>
                  다음등급인 <b style={{ color: gradesArr[parseInt(userGrade, 10) + 1].color }}>{gradesArr[parseInt(userGrade, 10) + 1].name}</b>로 승급하시려면?
                </p>
              )
            }
            <p>등급 산정기간: {gradeCalculationPeriod.startDate}~{gradeCalculationPeriod.endDate}</p>
          </div>
          <ul>
            <li>
              <p>현재 누적 주문 건수</p>
              <p>4건</p>
            </li>
            <li>
              <p>현재 누적 구매 금액</p>
              <p>77,200원</p>
            </li>
          </ul>
          {
            userGrade == 5 ? (
              <></>
            ) : (
              <ul>
              <li>
                <p>필요 구매 건수</p>
                <p><b style={{ color: '#e5362c' }}>1</b>건</p>
              </li>
              <li>
                <p>필요 구매 금액</p>
                <p><b style={{ color: '#e5362c' }}>37,200</b>원</p>
              </li>
            </ul>
            )
          }

        </GradeProfileDetailInfo>
      </GradeProfileOverView>
      <GradeInfoOverView>
        <h3>전체 회원 등급 및 혜택 한 눈에 보기</h3>
        <GradeInfoContainer>
          {filteredGrades.map((grade, index) => (
            <GradeInfoBox key={index} className={userGrade == 5-index ? 'sel' : ''}>
              <GradeInfoImg $grade={index} />
              <GradeName $grade={index}>{grade.name}</GradeName>
              <GradeDescription dangerouslySetInnerHTML={{ __html: grade.description }} />
              <ul>
                {grade.perks && grade.perks.map((perk, perkIndex) => (
                  <li key={perkIndex}>
                    {perk.icon && <Icon icon={perk.icon} />}
                    <GradeBenefitDescription dangerouslySetInnerHTML={{ __html: perk.text }}/>
                  </li>
                ))}
              </ul>
            </GradeInfoBox>
          ))}
        </GradeInfoContainer>
      </GradeInfoOverView>
      <GradeFooter>
        <h3>꼭 알아두세요!</h3>
        <ul>
          <li>매월 1일, 최근 6개월간의 결제완료 된 주문건의 구매건수와 구매 금액을 합산하여 등급을 부여 합니다.</li>
          <li>등급 산정 반영에 누락된 주문건은 익월 1일에 반영됩니다.</li>
          <li>구매건수는 건수 기준이므로 한 주문건에서 여러 상품을 구매하셨더라도 구매건수는 1회로 반영됩니다.</li>
          <li>구매건수 집계 시 실 결제금액이 0원인 경우는 포함되지 않습니다. (단, 포인트로 결제 시는 포함)</li>
          <li>당사 내부 정책에 의하여 등급별 혜택은 사전 고지 없이 수시로 변동될 수 있습니다.</li>
        </ul>
      </GradeFooter>
    </>
  );
}
