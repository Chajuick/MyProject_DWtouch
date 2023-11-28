import styled from "styled-components"
import { useState, useEffect } from "react";
import { Container } from "./FindAccount";

const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  outline: none;
  border: none;
  border-bottom: ${props => `1px solid ${props.$checkColor}`};
  margin-top: 10px;
  box-shadow: ${props => `0 0 ${props.$checkColor}`};
  transition: all 400ms;
  color: rgb(80, 80, 80);
  &:focus {
    box-shadow: ${props => `0 1px ${props.$checkColor}`};
  }
  &:nth-child(1) {
    margin-top: 40px;
  }
`;

const ErrMes = styled.p`
  width: 100%;
  margin-top: 10px;
  font-size: 13px;
  color: rgba(250, 50, 50, 0.8);
  text-align: left;
  transition: all 400ms;
`;

const ConfirmBtn = styled.button`
  margin-top: 40px;
  width: 100%;
  padding: 10px 0;
  background-color: rgb(80, 80, 80);
  border: 1px solid rgb(80, 80, 80);
  cursor: pointer;
  transition: all 400ms;
  color: rgb(245, 245, 245);
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: rgb(250, 250, 250);
    color: rgb(80, 80, 80);
  }
`;

const CautionList = styled.ul`
  color: rgb(40, 40, 40);
  font-size: 14px;
  margin-top: 30px;
  list-style: none;
  li {
    color: rgb(120, 120, 120);
    line-height: 1.2;
    margin-top: 2px;
    b {
      color: rgba(250, 50, 50, 0.8);
      font-weight: 400;
    }
  }
  li:first-child {
    margin-top: 20px;
  }
`;

const IdBox = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: rgb(80, 80, 80);
  span {
    margin-bottom: 10px;
  }
  b {
    font-size: 16px;
    color: rgb(50, 200, 50);
  }
`;

export default function FindUserPW() {
  const [phoneNum, setPhoneNum] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumCheckColor, setPhoneNumCheckColor] = useState('rgb(180, 180, 180)');
  const [idCheckColor, setIdCheckColor] = useState('rgb(180, 180, 180)');
  const [nameCheckColor, setNameCheckColor] = useState('rgb(180, 180, 180)');
  const [errMesShow, setErrMesShow] = useState(false);

  useEffect(()=> {
    if (phoneNum.length == 0) {
      setPhoneNumCheckColor('rgb(180, 180, 180)')
    } else if (phoneNum.length == 11) {
      setPhoneNumCheckColor('rgba(50, 205, 50, 0.5)');
    } else {
      setPhoneNumCheckColor('rgba(250, 50, 50, 0.5)');
    }
    setErrMesShow(false);
  },[phoneNum]);

  useEffect(()=> {
    if (userId.length == 0) {
      setIdCheckColor('rgb(180, 180, 180)')
    } else if (userId.length > 3 && userId.length < 17) {
      setIdCheckColor('rgba(50, 205, 50, 0.5)');
    } else {
      setIdCheckColor('rgba(250, 50, 50, 0.5)');
    }
    setErrMesShow(false);
  },[userId]);

  useEffect(()=> {
    if (userName.length == 0) {
      setNameCheckColor('rgb(180, 180, 180)');
    } else {
      setNameCheckColor('rgba(50, 205, 50, 0.5)');
    }
  },[userName])


  // 휴대폰 번호 입력
  function handlePhoneNumInput(event) {
    // 숫자만, 최대 11자리
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhoneNum(event.target.value);
  };

  function handleIdInput(event) {
    event.target.value = event.target.value.slice(0,16);
    setUserId(event.target.value);
  };

  function handleNameInput(event) {
    setUserName(event.target.value);
  };

  const checkUserInfo = async (userid, username, phoneNum) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/check-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, username, phoneNum }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('회원정보 확인 성공:', data.user);
        // 여기에서 받은 사용자 정보(data.user)를 원하는 대로 활용할 수 있습니다.
      } else {
        console.log('회원정보 확인 실패:', data.message);
      }
    } catch (error) {
      console.error('회원정보 확인 오류:', error.message);
    }
  };



  return (
    <>
      <Container>
        <Input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onInput={handleIdInput}
          $checkColor={idCheckColor}
        />
        <Input
          type="text"
          placeholder="이름 입력"
          value={userName}
          onInput={handleNameInput}
          $checkColor={nameCheckColor}
        />
        <Input
          type="text"
          placeholder="휴대폰 번호 (-빼고 숫자만 입력)"
          value={phoneNum}
          onInput={handlePhoneNumInput}
          $checkColor={phoneNumCheckColor}
        />
        <CautionList>유의사항
          <li>· 휴대폰 확인이 불가능한 경우, <b>고객센터(1234-5678)</b>로 연락주시기 바랍니다.</li>
          <li>· 휴대폰 번호 확인 오류가 뜨는 경우, 휴대폰 번호를 옳바르게 입력했는지 확인바랍니다. (-빼고 숫자만 입력)</li>
          <li>· 회원 정보 일치 시 해당 휴대폰 번호로 새로운 비밀번호를 발송합니다.</li>
          <li>· 로그인 후 꼭 비밀번호를 변경해주세요.</li>
        </CautionList>
        <ConfirmBtn onClick={() => {checkUserInfo(userId, userName, phoneNum)}} disabled={phoneNum.length === 11 && userId.length > 3 && userId.length < 17 ? false : true}>
          비밀번호 찾기
        </ConfirmBtn>
      </Container>
    </>
  )
}