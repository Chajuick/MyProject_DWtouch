import React, { useState } from 'react';
import styled from 'styled-components';
import * as MS from '../Modal/ModalStyle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  button{
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background-color: rgb(240, 240, 240);
    transition: all 400ms;
    cursor: pointer;
  }

  button:hover{
    background-color: rgb(40, 40, 40);
    color: rgb(240, 240, 240);
  }
`


export default function Logout({ showModal, setShowModal }) {

  const handleLogoutConfirm = () => {
    // 로그아웃 확인 시 실행되는 함수
    fetch('http://localhost:3001/api/auth/logout', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('로그아웃 성공');
          sessionStorage.removeItem('isLoggedIn'); // isLoggedIn 아이템 삭제
          sessionStorage.setItem('user_birthdate', '');
          sessionStorage.setItem('user_joindate', '');
          sessionStorage.setItem('user_phonenum', '');
          sessionStorage.setItem('user_permissions', '');
          sessionStorage.setItem('user_points', '');
          sessionStorage.setItem('user_grades', 0);
          sessionStorage.setItem('user_address', '');
          sessionStorage.setItem('user_detail_address', '');
          sessionStorage.setItem('user_postcode', '');
          setShowModal(false);
          window.location.reload();
        } else {
          console.log('로그아웃 실패: ' + data.error);
        }
      })
      .catch((error) => {
        console.error('로그아웃 오류:', error);
      });
  };

  return (
    <Container>
      <MS.Overlay $showModal={showModal}/>
      <MS.Modal $showModal={showModal}>
        <p>로그아웃 하시겠습니까?</p>
        <ButtonWrapper>
          <button onClick={handleLogoutConfirm}>확인</button>
          <button onClick={() => setShowModal(false)}>취소</button>
        </ButtonWrapper>
      </MS.Modal>
    </Container>
  );
}

