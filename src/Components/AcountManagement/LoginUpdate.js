import React, { useEffect } from 'react';

export default function LoginUpdate() {
  const userid = sessionStorage.getItem('user_id');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      // 서버로 아이디 전송
      fetch('http://localhost:3001/api/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            if (data.user) {
              if (data.user.userUid) {
                sessionStorage.setItem('user_uid', data.user.userUid);
              }
              if (data.user.userId) {
                sessionStorage.setItem('user_id', data.user.userId);
              }
              if (data.user.userName) {
                sessionStorage.setItem('user_name', data.user.userName);
              }
              if (data.user.userGender) {
                sessionStorage.setItem('user_gender', data.user.userGender);
              }
              if (data.user.userBirthdate) {
                const dateObject = new Date(data.user.userBirthDate);
                const year = dateObject.getUTCFullYear();
                const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
                const day = (dateObject.getUTCDate()).toString().padStart(2, '0');
                const formattedDate = `${year}${month}${day}`;
                sessionStorage.setItem('user_birthdate', formattedDate);
              }
              if (data.user.userJoinDate) {
                sessionStorage.setItem('user_joindate', data.user.userJoinDate);
              }
              if (data.user.userPhoneNum) {
                sessionStorage.setItem('user_phonenum', data.user.userPhoneNum);
              }
              if (data.user.userPermissions) {
                sessionStorage.setItem('user_permissions', data.user.userPermissions);
              }
              if (data.user.userPoints) {
                sessionStorage.setItem('user_points', data.user.userPoints);
              }
              if (data.user.userGrades) {
                sessionStorage.setItem('user_grades', data.user.userGrades);
              }
              if (data.user.userAddress) {
                sessionStorage.setItem('user_address', data.user.userAddress);
              }
              if (data.user.userDetailAddress) {
                sessionStorage.setItem('user_detail_address', data.user.userDetailAddress);
              }
              if (data.user.userPostCode) {
                sessionStorage.setItem('user_postcode', data.user.userPostCode);
              }
            } else {
              console.log('유효한 데이터가 없습니다.');
            }
          } else {
            console.log('갱신 실패');
          }
        })
        .catch((error) => {
          console.error('갱신 오류:', error);
        });
    } else {
      
    }
  }, []);

  return (
    <>
    </>
  );
}
