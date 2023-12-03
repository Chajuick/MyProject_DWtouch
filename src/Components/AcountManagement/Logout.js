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
    const session = {
      session_key: localStorage.getItem('session_key'),
      user_uid: localStorage.getItem('session_user'), 
    };
    fetch('http://localhost:3001/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('로그아웃 성공');
          sessionStorage.clear();
          localStorage.removeItem('session_user', data.session.userUid);
          localStorage.removeItem('session_key', data.session.randomKey);
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

