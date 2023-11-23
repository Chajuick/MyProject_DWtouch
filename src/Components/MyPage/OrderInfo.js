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


const gradesArr = [
  { name: 'NONE', image: GradeErr, color: '#E3E3E3' },
  { name: 'NEW', image: Grade1, color: '#88E2FF' },
  { name: 'FRIEND', image: Grade2, color: '#F0F283' },
  { name: 'BEST FRIEND', image: Grade3, color: '#FF85EB' },
  { name: 'FAMILY', image: Grade4, color: '#83F28E' },
  { name: 'KING', image: Grade5, color: '#F2B283' },
];

const userGrade = sessionStorage.getItem('user_grades');
let updatedGrade = userGrade;

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
    }
  }
  &:nth-child(3) {
    border-left: 1px solid rgb(160, 160, 160);
    padding-left: 60px;
  }
`;

const ProfileImg = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${props => gradesArr[props.$grade].image}); // 등급 이미지 설정
  background-size: cover;
  background-position: center;
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
    color: ${props => gradesArr[props.$grade].color};
    border: 2px solid ${props => gradesArr[props.$grade].color};
    animation: colorChange 4s infinite alternate;
  }
  @keyframes colorChange {
    0%, 100%{
      filter: contrast(100%);
    }
    50% {
      filter: contrast(400%);
    }
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
    }
    a:hover {
      color: rgb(250, 250, 250);
      background-color: rgb(80, 80, 80);
      border: 1px solid rgba(190, 190, 190, 0);
    }
  }
`

function updateGrades() {
  if (userGrade >= 1 && userGrade <= 5) {
    updatedGrade = userGrade;
  } else {
    updatedGrade = 0;
  }
}


export default function OrderInfo() {

  updateGrades();

  return (
    <>
      <p>주문현황</p>
    </>
  );
}
