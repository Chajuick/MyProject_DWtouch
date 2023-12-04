import { useEffect, useState } from 'react';
import * as MS from '../Modal/ModalStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  button {
    margin-top: 30px;
    padding: 10px 30px;
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    border: 1px solid rgb(40, 40, 40);
    transition: all 400ms;
  }
  button:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40 ,40);
  }
`;

const formatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const month = (newDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = (newDate.getUTCDate()).toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

const checkSessionKey = (item) => {
  return item !== null && item !== undefined;
};

export default function UserInfoUpdate({ updateStatus, setUpdateStatus }) {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const navigate = useNavigate();

  function updateLogin() {
    const session = {
      session_key: localStorage.getItem('session_key'),
      user_uid: localStorage.getItem('session_user'),
    };
    const isSessionKeyPresent = checkSessionKey(session.session_key);
    if (isSessionKeyPresent) {
      fetch('http://localhost:3001/api/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session }),
      })
      .then((response) => response.json())
      .then((data) => {
        // 서버 응답에 따른 동작 수행
        if (data.success) {
          // 성공적으로 유저 정보가 갱신된 경우
          sessionStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 세션 스토리지에 설정
          sessionStorage.setItem('user_uid', data.user.user_uid);
          sessionStorage.setItem('user_id', data.user.user_id);
          sessionStorage.setItem('user_name', data.user.user_name);
          sessionStorage.setItem('user_gender', data.user.user_gender);
          sessionStorage.setItem('user_birthdate', formatDate(data.user.user_birth_date));
          sessionStorage.setItem('user_phonenum', data.user.user_phone_num);
          sessionStorage.setItem('user_points', data.user.user_points);
          sessionStorage.setItem('user_grades', data.user.user_grades);
          sessionStorage.setItem('user_address', data.user.user_address);
          sessionStorage.setItem('user_detail_address', data.user.user_detailaddress);
          sessionStorage.setItem('user_postcode', data.user.user_postcode);
          sessionStorage.setItem('user_join_date', data.user.createdAt);
          setUpdateStatus(true);
        } else {
          // 유저 정보 갱신에 실패한 경우
          console.error('유저 정보 갱신 실패:', data.message);
          sessionStorage.clear();
          localStorage.removeItem('session_key');
          localStorage.removeItem('session_user');
          setShowAlertModal(true);
        }
      })
      .catch((error) => {
        // 네트워크 오류 등 예상치 못한 오류 발생 시
        console.error('유저 정보 갱신 중 오류 발생:', error);
      });
    }
  }

  useEffect(() => {
      updateLogin();
  },[updateStatus]);

  function handleModalCloseBtn() {
    navigate('/');
    setShowAlertModal(false);
    window.location.reload(true);
  };

  return (
    <>
      <MS.Overlay $showModal={showAlertModal}/>
      <MS.Modal $showModal={showAlertModal}>
        <ModalContent>
          <p>잘못된 접근입니다!</p>
          <button onClick={handleModalCloseBtn}>확인</button>
        </ModalContent>
      </MS.Modal>
    </>
  )
}
