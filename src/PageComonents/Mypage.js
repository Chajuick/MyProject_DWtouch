import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderBar from '../Components/IndexPage/HeaderBar';
import NavBar from '../Components/IndexPage/NavBar';
import Footer from '../Components/IndexPage/Footer';
import { Icon } from '@iconify/react';

import MypageIndex from "../Components/MyPage/MypageIndex";
import ProfileEdit from "../Components/MyPage/ProfileEdit";
import GradeInfo from "../Components/MyPage/GradeInfo";
import OrderList from "../Components/MyPage/OrderInfo";
import ReviewEdit from "../Components/MyPage/ReviewEdit";
import InquryInfo from "../Components/MyPage/InquryInfo";


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

export default function Mypage() {
  const [left, setLeft] = useState(90);
  const [fastNavVisible, setFastNavVisible] = useState(true);
  const [screenNum, setScreenNum] = useState(1);

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

  return (
    <>
      <HeaderBar />
      <NavBar />
      <Container>
        <FastNav $left={left} $visible={fastNavVisible}>
          <ul>
            <li onClick={() => setScreenNum(1)}><Icon icon="material-symbols:overview-key-rounded" />한 눈에 보기</li>
            <li onClick={() => setScreenNum(2)}><Icon icon="ant-design:setting-filled" />회원정보 수정</li>
            <li onClick={() => setScreenNum(3)}><Icon icon="material-symbols:grade" />내 등급</li>
            <li onClick={() => setScreenNum(4)}><Icon icon="icon-park-solid:transaction-order" />주문현황</li>
            <li onClick={() => setScreenNum(5)}><Icon icon="ic:baseline-rate-review" />후기관리</li>
            <li onClick={() => setScreenNum(6)}><Icon icon="mingcute:service-fill" />문의내역</li>
          </ul>
        </FastNav>
        <Wrapper>
          <Screen>
            {screenNum === 1 && <MypageIndex screenNum={screenNum} setScreenNum={setScreenNum}/>}
            {screenNum === 2 && <ProfileEdit />}
            {screenNum === 3 && <GradeInfo />}
            {screenNum === 4 && <OrderList />}
            {screenNum === 5 && <ReviewEdit />}
            {screenNum === 6 && <InquryInfo />}
          </Screen>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}
