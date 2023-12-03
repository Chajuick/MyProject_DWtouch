import styled from "styled-components"
import { useState, useEffect } from "react";
import { Container } from "./FindAccount";

const PhoneNumInput = styled.input`
  width: 100%;
  padding: 12px 10px;
  outline: none;
  border: none;
  border-bottom: ${props => `1px solid ${props.$checkColor}`};
  margin-top: 40px;
  box-shadow: ${props => `0 0 ${props.$checkColor}`};
  transition: all 400ms;
  color: rgb(80, 80, 80);
  &:focus {
    box-shadow: ${props => `0 1px ${props.$checkColor}`};
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

export default function FindUserID() {
  const [phoneNum, setPhoneNum] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumCheckColor, setPhoneNumCheckColor] = useState('rgb(180, 180, 180)');
  const [phoneNumExist, setPhoneNumExist] = useState(false);
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
  },[phoneNum])

  const handleFindUsername = () => {
    fetch('http://localhost:3001/api/auth/find-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNum }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsername(data.username);
          setPhoneNumExist(true);
        } else {
          setPhoneNumExist(false);
          setErrMesShow(true);
        }
      })
      .catch((error) => {
        console.error('아이디 찾기 오류:', error.message);
        
      });
  };

  // 휴대폰 번호 입력
  function handlePhoneNumInput(event) {
    // 숫자만, 최대 11자리
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhoneNum(event.target.value);
  }

  return (
    <>
      {!phoneNumExist &&
      <Container>
        <PhoneNumInput
          type="text"
          placeholder="휴대폰 번호 (-빼고 숫자만 입력)"
          value={phoneNum}
          onInput={handlePhoneNumInput}
          $checkColor={phoneNumCheckColor}
        />
        <ErrMes style={{ opacity: errMesShow && !phoneNumExist? 1 : 0 }}>해당 번호로 가입한 아이디가 존재하지 않습니다.</ErrMes>

        <CautionList>유의사항
          <li>· 휴대폰 확인이 불가능한 경우, <b>고객센터(1234-5678)</b>로 연락주시기 바랍니다.</li>
          <li>· 휴대폰 번호 확인 오류가 뜨는 경우, 휴대폰 번호를 옳바르게 입력했는지 확인바랍니다. (-빼고 숫자만 입력)</li>
        </CautionList>
        <ConfirmBtn onClick={handleFindUsername} disabled={phoneNum.length === 11? false : true}>
          아이디 찾기
        </ConfirmBtn>
      </Container>
      }
      {phoneNumExist &&
      <Container>
        <IdBox>
          <span>해당 휴대폰 번호로 가입하신 아이디는</span>
          <span><b>{username}</b> 입니다.</span>
        </IdBox>
      </Container>
      }
    </>
  )
}