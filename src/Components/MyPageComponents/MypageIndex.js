import styled, { keyframes } from "styled-components";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

const colorChange = keyframes`
  0%, 100%{
    filter: contrast(100%);
  }
  50% {
    filter: contrast(400%);
  }
`;

const imgChange = keyframes`
  0%, 100%{
    filter: contrast(100%);
  }
  50% {
    filter: contrast(150%);
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  padding: 80px 0;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(40, 40, 40);
  padding: 40px 50px;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  &:first-child {
    flex-direction: row;
    align-items: center;
  }
  &:nth-child(2) {
    padding-left: 130px;
    a {
      color: rgb(190, 190, 190);
      text-decoration: none;
      font-weight: 400;
      font-size: 14px;
      padding: 6px 32px;
      border-radius: 1rem;
      border: 1px solid rgb(190, 190, 190);
      margin: 5px 0;
      transition: all 400ms;
    }
    a:hover {
      color: rgb(160, 160, 160);
      border: 1px solid rgb(160, 160, 160);
      cursor: pointer;
    }
  }
  &:nth-child(3) {
    border-left: 1px solid rgb(160, 160, 160);
    padding-left: 60px;
  }
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  animation: ${imgChange} 4s infinite alternate;
`;

const ProfileMes = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 400;
  h2 {
    b {
      font-size: 28px;
    }
    font-weight: 400;
    font-size: 24px;
    color: rgb(230, 230, 230);
  }
  h3 {
    font-weight: 400;
    font-size: 16px;
    padding: 4px 20px;
    margin-top: 10px;
    border-radius: 1rem;
    color: ${props => props.$color};
    border: 2px solid ${props => props.$color};
    animation: ${colorChange} 4s infinite alternate;
  }
`

const UserHaving = styled.ul`
  list-style: none;
  color: rgb(220, 220, 220);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  margin: 5px 0;
  & > li:first-child {
    display: flex;
    align-items: center;
  }
  & > li {
    font-size: 14px;
    svg {
      font-size: 20px;
      margin-right: 5px;
    }
    b {
      font-size: 18px;
      margin-right: 3px;
    }
  }
`;

const UserOverview = styled.div`
  margin-top: 30px;  
  width: 1200px;
  color: rgb(40, 40, 40);
  border-bottom: 1px solid rgb(190, 190, 190);
  h3 {
    font-size: 18px;
    font-weight: 400;
    padding: 20px 0;
    border-bottom: 1px solid rgb(40, 40, 40);
    display: flex;
    justify-content: space-between;
    a {
      font-size: 13px;
      text-decoration: none;
      padding: 3px 10px;
      border-radius: 16px;
      color: rgb(150 ,150, 150);
      border: 1px solid rgb(150, 150, 150);
      transition: all 400ms;
      cursor: pointer;
    }
    a:hover {
      color: rgb(190 ,190, 190);
      border: 1px solid rgb(190, 190, 190);
    }
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    flex-wrap: wrap;
  }
`;

const UserServiceOverview = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 100px;
`;

const OrderList = styled.li`
  text-align: center;
  width: calc( 18% );
  padding: 5px 0;
  line-height: 2.3;
  border-right: 1px solid rgb(220, 220, 220);
  font-size: 16px;
  b {
    font-size: 20px;
  }
  &:last-child {
    width: calc( 28% );
    padding: 20px 0;
    border-right: none;
    border-left: 1px solid rgb(190, 190, 190);
  }
`

const ServiceList = styled.li`
  text-align: center;
  width: calc( 50% );
  padding: 5px 0;
  line-height: 2.3;
  font-size: 16px;
  &:first-child {
    border-right: 1px solid rgb(220, 220, 220);
  }
  b {
    font-size: 20px;
  }
  &:last-child {
    margin-top: 20px;
    width: calc( 100% );
    padding: 20px 0;
    border-right: none;
    a {
      text-decoration: none;
      color: rgb(40, 40, 40);
      padding: 15px 150px;
      border-radius: 4px;
      border: 1px solid rgb(150, 150, 150);
      transition: all 400ms;
      cursor: pointer;
    }
    a:hover {
      color: rgb(250, 250, 250);
      background-color: rgb(80, 80, 80);
      border: 1px solid rgba(190, 190, 190, 0);
    }
  }
`

export default function MypageIndex({ setScreenNum, gradesInfo, userInfo, couponAmount, daysDifference, orderInfo }) {
  const [detailOrderNumInfo, setDetailOrderNumInfo] = useState([]);
  const [reviewStatus, setReviewStatus] = useState([]);

  useEffect(() => {
    if (orderInfo && orderInfo.length > 0) {
      const statusCounts = {};
      
      orderInfo.forEach(order => {
        const status = order.status;
        // status에 해당하는 카운트를 증가
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
  
      const updateOrderNum = {
        nonDeposit: statusCounts[0],
        wating: statusCounts[1],
        delivering: statusCounts[2],
        completed: statusCounts[3],
        cancle: statusCounts[4],
        exchange: statusCounts[5],
        return: statusCounts[6],
        refunds: statusCounts[4]+statusCounts[5]+statusCounts[6],
      }
      setDetailOrderNumInfo(updateOrderNum);
    }
  }, [orderInfo]);

  useEffect(() => {
    if (orderInfo && orderInfo.length > 0) {
      let zeroReviewCount = 0;
      let oneReviewCount = 0;
  
      const currentDate = new Date();
  
      orderInfo.forEach(order => {
        // 모든 주문에 대해서 처리
        if (order.product_list && order.product_list.length > 0) {
          order.product_list.forEach(product => {
            const reviewStatus = product.review_status;
  
            if (isWithin3Days(order.createdAt, currentDate) && reviewStatus === 0 && order.status === 3) {
              zeroReviewCount += 1;
            } else if (reviewStatus === 1) {
              oneReviewCount += 1;
            }
          });
        }
      });
  
      const updateReviewStatus = [zeroReviewCount, oneReviewCount];
      setReviewStatus(updateReviewStatus);
    }
  }, [orderInfo]);
  
  // createdAt + 18시간이 현재 날짜 3일 이내인지 확인하는 함수
  function isWithin3Days(createdAt, currentDate) {
    const createdAtDate = new Date(createdAt);
    createdAtDate.setHours(createdAtDate.getHours() + 18);
    const threeDaysAgo = new Date(currentDate);
    threeDaysAgo.setDate(currentDate.getDate() - 3);
  
    return createdAtDate >= threeDaysAgo;
  }


  return (
    <>
      <Title>MY 페이지</Title>
      <UserInfo>
        <UserInfoBox>
          <ProfileImg src={gradesInfo[userInfo.user_grades].image} alt="프로필 이미지" />
          <ProfileMes $grade={userInfo.user_grades} $color={gradesInfo[userInfo.user_grades].color}>
            <h2>
              {userInfo.user_name.length > 0 ? (
                <>
                  <b>{`${userInfo.user_name}`}</b>님 안녕하세요
                </>
              ) : (
                '이름을 확인할 수 없습니다'
              )}
            </h2>
            <h3>{gradesInfo[userInfo.user_grades].name}</h3>
          </ProfileMes>
        </UserInfoBox>
        <UserInfoBox>
          <a onClick={() => setScreenNum(3)}>등급혜택 안내</a>
          <a onClick={() => setScreenNum(2)}>회원정보 수정</a>
        </UserInfoBox>
        <UserInfoBox>
          <UserHaving>
            <li><Icon icon="mingcute:coin-2-line" />사용가능 포인트</li>
            <li><b>{(userInfo.user_points).toLocaleString()}</b>포인트</li>
          </UserHaving>
          <UserHaving>
            <li><Icon icon="mingcute:coupon-line" />보유중인 쿠폰</li>
            <li><b>{couponAmount}</b>장</li>
          </UserHaving>
          <UserHaving>
            <li><Icon icon="mdi:heart" />친구가 된지</li>
            <li><b>{daysDifference}</b>일</li>
          </UserHaving>
        </UserInfoBox>
      </UserInfo>
      <UserOverview style={{ width: "1200px" }}>
        <h3><span>나의 주문현황</span><a onClick={() => setScreenNum(4)}>더보기</a></h3>
        <ul>
        <OrderList>미입금<br/><b>{detailOrderNumInfo && detailOrderNumInfo.nonDeposit? detailOrderNumInfo.nonDeposit : 0}</b>건</OrderList>
        <OrderList>출고대기<br/><b>{detailOrderNumInfo && detailOrderNumInfo.wating? detailOrderNumInfo.wating : 0}</b>건</OrderList>
        <OrderList>배송중<br/><b>{detailOrderNumInfo && detailOrderNumInfo.delivering? detailOrderNumInfo.delivering : 0}</b>건</OrderList>
        <OrderList>배송완료<br/><b>{detailOrderNumInfo && detailOrderNumInfo.completed? detailOrderNumInfo.completed : 0}</b>건</OrderList>
        <OrderList>취소·교환·반품<br/><b>{detailOrderNumInfo && detailOrderNumInfo.refunds? detailOrderNumInfo.refunds : 0}</b>건</OrderList>
        </ul>
      </UserOverview>
      <UserServiceOverview>
        <UserOverview style={{ width: "580px" }}>
          <h3><span>1:1 문의</span><a onClick={() => setScreenNum(6)}>더보기</a></h3>
          <ul>
            <ServiceList>답변대기<br /><b>0</b>건</ServiceList>
            <ServiceList>답변완료<br /><b>0</b>건</ServiceList>
            <ServiceList><Link to="/">1:1 문의하기</Link></ServiceList>
          </ul>
        </UserOverview>
        <UserOverview style={{ width: "580px" }}>
          <h3><span>상품 후기</span><a onClick={() => setScreenNum(5)}>더보기</a></h3>
          <ul>
            <ServiceList>작성가능 후기<br /><b>{reviewStatus && reviewStatus.length > 0? reviewStatus[0] : 0}</b>건</ServiceList>
            <ServiceList>작성완료 후기<br /><b></b>건</ServiceList>
            <ServiceList><Link to="/">후기 작성하기</Link></ServiceList>
          </ul>
        </UserOverview>
      </UserServiceOverview>
    </>
  );
}
