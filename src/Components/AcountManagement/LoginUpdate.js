import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginUpdate({ updateLogin, updateLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    const session = {
      session_key: localStorage.getItem('session_key'),
      user_uid: localStorage.getItem('session_user'), 
    };
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
          const updatedUser = data.user;
          sessionStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 세션 스토리지에 설정
          sessionStorage.setItem('user_uid', data.user.user_uid);
          sessionStorage.setItem('user_id', data.user.user_id);
          sessionStorage.setItem('user_name', data.user.user_name);
          sessionStorage.setItem('user_gender', data.user.user_gender);
          const dateObject = new Date(data.user.user_birth_date);
          const year = dateObject.getUTCFullYear();
          const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
          const day = (dateObject.getUTCDate()).toString().padStart(2, '0');
          const formattedDate = `${year}${month}${day}`;
          sessionStorage.setItem('user_birthdate', formattedDate);
          sessionStorage.setItem('user_phonenum', data.user.user_phone_num);
          sessionStorage.setItem('user_points', data.user.user_points);
          sessionStorage.setItem('user_grades', data.user.user_grades);
          sessionStorage.setItem('user_address', data.user.user_address);
          sessionStorage.setItem('user_detail_address', data.user.user_detailaddress);
          sessionStorage.setItem('user_postcode', data.user.user_postcode);
          updateLogin();
        } else {
          // 유저 정보 갱신에 실패한 경우
          console.error('유저 정보 갱신 실패:', data.message);
          sessionStorage.clear();
          localStorage.removeItem('session_key');
          localStorage.removeItem('session_user');
          updateLogout();
          navigate('/');
        }
      })
      .catch((error) => {
        // 네트워크 오류 등 예상치 못한 오류 발생 시
        console.error('유저 정보 갱신 중 오류 발생:', error);
      });
  },[]);
}
