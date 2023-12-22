import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  h2 {
    font-size: 22px;
    margin: 60px 0 20px;
    color: rgb(40, 40, 40);
  }
  p {
    font-size: 14px;
    text-align: center;
    color: rgb(120, 120, 120);
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

const Input = styled.input`
  margin: 10px;
  padding: 8px;
  width: 100%;
  border: 1px solid rgb(40, 40, 40);
  outline: none;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 113px;
  background-color: rgb(40, 40, 40);
  color: rgb(230, 230, 230);
  border: none;
  cursor: pointer;
  transition: all 400ms;
  &:hover {
    background-color: rgb(200, 200, 200);
    color: rgb(40, 40, 40);
  }
`;

const ErrMes = styled.div`
  font-size: 14px;
  color: rgb(255, 51, 51);
`


export default function ProfilePasswordCheck({ isPasswordCheck, setIsPasswordCheck }) {
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleCheckPw() {
    if (password.trim() !== '') {
        // 서버로 아이디와 비밀번호 전송
        const userid = sessionStorage.getItem('user_id');
  
        fetch('http://192.168.0.7:3001/api/mypage/checkpw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log('비밀번호 확인 성공');
              setIsPasswordCorrect(true);
              setIsPasswordCheck(true);
            } else {
              console.log('비밀번호 확인 실패');
              setIsPasswordCorrect(false);
            }
          })
          .catch((error) => {
            console.error('비밀번호 확인 오류:', error);
          });
    } else {
  
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // 폼 서브밋 기본 동작 막기
    handleCheckPw();
  };

  return (
    <Container>
      <h2>비밀번호 확인</h2>
      <p>회원 정보 수정 및 조회 전 본인확인을<br />위한 비밀번호 확인이 필요합니다.</p>
      <Form onSubmit={handleFormSubmit}>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="button" onClick={handleCheckPw}>확인</Button>
      </Form>
      {!isPasswordCorrect && <ErrMes>비밀번호가 올바르지 않습니다.</ErrMes>}
    </Container>
  );
}
