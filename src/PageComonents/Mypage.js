import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from '../Components/CommonComponents/Footer';
import { Icon } from '@iconify/react';
import LoadingPage  from '../PageComonents/LoadingPage';

import MypageIndex from "../Components/MyPageComponents/MypageIndex";
import ProfileEdit from "../Components/MyPageComponents/ProfileEdit";
import GradeInfo from "../Components/MyPageComponents/GradeInfo";
import OrderList from "../Components/MyPageComponents/OrderInfo";
import ReviewEdit from "../Components/MyPageComponents/ReviewEdit";
import InquryInfo from "../Components/MyPageComponents/InquryInfo";

// 등급 정보
import GradeErr from "../assets/user/grades/user_grades_err.png";
import GradeNEW from "../assets/user/grades/user_grades_1.png";
import GradeFRIEND from "../assets/user/grades/user_grades_2.png";
import GradeBEST_FRIEND from "../assets/user/grades/user_grades_3.png";
import GradeFAMILY from "../assets/user/grades/user_grades_4.png";
import GradeKING from "../assets/user/grades/user_grades_5.png";

const gradesInfo = [
  { name: 'NONE', image: GradeErr, color: '#E3E3E3' },
  { name: 'NEW', image: GradeNEW, color: '#88E2FF' },
  { name: 'FRIEND', image: GradeFRIEND, color: '#F0F283' },
  { name: 'BEST FRIEND', image: GradeBEST_FRIEND, color: '#FF85EB' },
  { name: 'FAMILY', image: GradeFAMILY, color: '#83F28E' },
  { name: 'KING', image: GradeKING, color: '#F2B283' },
];

const Container = styled.div`
  width: 100vw;
  position: relative;
`

const Wrapper = styled.div`
  width: 1200px;
  margin: auto;
`
const Screen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FastNav = styled.div`
  position: fixed;
  top: 300px;
  left: ${props => props.$left}px;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => (props.$visible ? "visible" : "hidden")};
  transition: all 800ms;
  border-radius: 8px;
  background-color: rgb(40, 40, 40);
  box-shadow: 0 4px 8px 2px rgba(80, 80, 80, 0.5);
  z-index: 50;
  ul {
    list-style: none;
    padding: 30px 25px 15px 25px;
    li {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      transition: all 400ms;
      color: rgb(235, 235, 235);
      svg {
        margin-right: 10px;
        font-size: 20px;
      }
    }
    li:hover {
      cursor: pointer;
      color: rgb(190, 190, 190);
    }
  }
`

export default function Mypage({ locationReload }) {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem('isLoggedIn') === 'true';
  const [left, setLeft] = useState(90);
  const [fastNavVisible, setFastNavVisible] = useState(true);
  const [screenNum, setScreenNum] = useState(1);
  const userInfo = {
    user_id: sessionStorage.getItem('user_id'),
    user_name: sessionStorage.getItem('user_name'),
    user_grades: sessionStorage.getItem('user_grades'),
    user_points: parseInt(sessionStorage.getItem('user_points')),
    user_gender: sessionStorage.getItem('user_gender'),
    user_phonenum: sessionStorage.getItem('user_phonenum'),
    user_birthdate: sessionStorage.getItem('user_birthdate'),
    user_postcode: sessionStorage.getItem('user_postcode') || '',
    user_address: sessionStorage.getItem('user_address') || '',
    user_detail_address: sessionStorage.getItem('user_detail_address') || '',
    user_uid:  sessionStorage.getItem('user_uid'),
    user_joindate: new Date(sessionStorage.getItem('user_join_date')),
  };

  const currentDateTime = new Date();
  // 사용자의 시간대를 고려하여 시간 조정
  userInfo.user_joindate.setHours(userInfo.user_joindate.getHours() - userInfo.user_joindate.getTimezoneOffset() / 60);
  // 날짜 차이 계산 (밀리초 단위)
  const timeDifference = currentDateTime - userInfo.user_joindate;
  // 일 단위로 변환
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  
  const handleMoveScreen = (num) => {
    setScreenNum(num);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (!isLogin) {
      locationReload();
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const calculateLeft = () => {
      const screenWidth = window.innerWidth;
      const initialLeft = 90;
      const screenMaxWidth = 1920;
      const leftChangeRate = 0.25;
      const dynamicLeft = initialLeft - (screenMaxWidth - screenWidth) * leftChangeRate;
      return dynamicLeft < 0 ? 0 : dynamicLeft;
    };
    const updateLeft = () => {
      setLeft(calculateLeft());
      if( window.innerWidth > 1540 ){
        setFastNavVisible(true);
      } else {
        setFastNavVisible(false);
      }
    };
    window.addEventListener("resize", updateLeft);
    // Initial update
    updateLeft();

    return () => {
      window.removeEventListener("resize", updateLeft);
    };
  }, []);

  // 유저 쿠폰 정보 받아오기
  const [userCouponAmount, setUserCouponAmount] = useState(0);
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  function loadUserCouponAmount() {
    const userUID = userInfo.user_uid;
    // 서버로 POST 요청 보내기
    fetch('http://localhost:3001/api/coupon-point/user-coupon-amount-loading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userUID }),
    })
    .then(response => response.json())
    .then(data => {
      setUserCouponAmount(data.couponAmount);
      setIsCouponLoading(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    if (userInfo) {
      loadUserCouponAmount();
    }
  }, [isCouponLoading]);

  // 유저 주문현황 정보 받아오기
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  function loadUserOrderInfo() {
    const userUID = userInfo.user_uid;
    // 서버로 POST 요청 보내기
    fetch('http://localhost:3001/api/order/user-order-info-loading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userUID }),
    })
    .then(response => response.json())
    .then(data => {
      setOrderInfo(data.orderInfo);
      setIsOrderLoading(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    if (userInfo) {
      loadUserOrderInfo();
    }
  }, [isOrderLoading]);

  console.log(orderInfo);

  // 유저 정보 받아오기

  return (
    <>
      {isLogin && isCouponLoading && isOrderLoading ?
        <>
          <Container>
            <FastNav $left={left} $visible={fastNavVisible}>
              <ul>
                <li onClick={() => handleMoveScreen(1)}><Icon icon="material-symbols:overview-key-rounded" />한 눈에 보기</li>
                <li onClick={() => handleMoveScreen(2)}><Icon icon="ant-design:setting-filled" />회원정보 수정</li>
                <li onClick={() => handleMoveScreen(3)}><Icon icon="material-symbols:grade" />내 등급</li>
                <li onClick={() => handleMoveScreen(4)}><Icon icon="icon-park-solid:transaction-order" />주문현황</li>
                <li onClick={() => handleMoveScreen(5)}><Icon icon="ic:baseline-rate-review" />후기관리</li>
                <li onClick={() => handleMoveScreen(6)}><Icon icon="mingcute:service-fill" />문의내역</li>
              </ul>
            </FastNav>
            <Wrapper>
              <Screen>
                {screenNum === 1 && 
                <MypageIndex 
                  setScreenNum={setScreenNum}
                  userInfo={userInfo}
                  gradesInfo={gradesInfo}
                  couponAmount={userCouponAmount}
                  daysDifference={daysDifference}
                />
                }
                {screenNum === 2 && <ProfileEdit />}
                {screenNum === 3 && <GradeInfo />}
                {screenNum === 4 && <OrderList />}
                {screenNum === 5 && <ReviewEdit />}
                {screenNum === 6 && <InquryInfo />}
              </Screen>
            </Wrapper>
          </Container>
          <Footer />
        </> :
        <LoadingPage />
      }
    </>
  );
}
