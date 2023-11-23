import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import React, { useState } from "react";
import bcrypt from 'bcryptjs';
import * as MS from '../Modal/ModalStyle'
import styled from "styled-components";

import ProfilePasswordCheck from "./ProfilePasswordCheck";
import ErrorModal from "../Modal/ErrorModal";
import PhoneVerification from "../AcountManagement/PhoneVerification";
import AddressInput from "../AcountManagement/AddressInput";


const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  padding: 80px 0;
`;

const ProfileEditContainer = styled.div`
  h2 {
    font-size: 17px;
    font-weight: 400;
    color: rgb(80, 80, 80);
    padding: 10px 0;
    border-bottom: 1px solid rgb(120, 120, 120);
  }
  padding-bottom: 200px;
`;

const ProfileEditerForm = styled.form``;

const InputBox = styled.div`
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgb(200, 200, 200);
  color: rgb(80, 80, 80);
  & > p:first-child {
    font-size: 14px;
    width: 100px;
    position: relative;
    margin-right: 80px;
  }
  & > p.must {
    font-weight: bold;
  }
  & > p.must::after {
    content: "*";
    color: #e5362c;
    position: absolute;
    top: 50%;
    transform: translateY(-50%); // 중앙 정렬
    margin-left: 5px; // 원하는 간격 조절
  }
  input[type="radio"]{
    vertical-align: middle;
    appearance: none;
    border: 2px solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: box-shadow 400ms;
  }
  input[type="radio"]:checked {
    border: 0.3rem solid rgb(150, 200, 50);
  }
  input[type="radio"]:focus-visible {
    outline: max(2px, 0.1em) dotted rgb(150, 200, 50);
    outline-offset: max(2px, 0.1em);
  }
  input[type="radio"]:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }
  input[type="radio"]:hover + span {
    cursor: pointer;
  }
  & div#phoneVerificationBox {
    margin-left: 180px;
    margin-top: 10px;
    width: 500px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
  }
  & input#phonenumInput {
    width: 180px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 5px;
    color: rgb(120, 120, 120);
    margin: 2px 0;
  }
  & button#phoneVerificationSendBtn {
    margin-left: 15px;
    color: rgb(120, 120, 120);
    background-color: rgb(250, 250, 250);
    padding: 7px 15px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 4px;
    transition: all 400ms;
    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(150, 150, 150);
      cursor: pointer;
    }
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
  & input#phoneVerificationInput {
    margin-left: 180px;
    width: 150px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 5px;
    color: rgb(120, 120, 120);
    margin: 2px 0;
  }
  & button#phoneVerificationCheckBtn {
    margin-left: 15px;
    color: rgb(120, 120, 120);
    background-color: rgb(250, 250, 250);
    padding: 7px 15px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 4px;
    transition: all 400ms;
    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(150, 150, 150);
      cursor: pointer;
    }
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    }
    & div#verificationTimeOut {
      color: rgb(230, 40, 40);
      font-size: 13px;
      margin-left: 15px;
    }
    & input#postCodeInput {
      width: 100px;
      padding: 8px 0 8px 8px;
      border: 1px solid rgb(150, 150, 150);
      border-radius: 5px;
      margin-bottom: 5px;
      margin-top: 5px;
    }
  & button#postCodeSearchBtn {
    margin-left: 15px;
    color: rgb(120, 120, 120);
    background-color: rgb(250, 250, 250);
    padding: 7px 15px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 4px;
    transition: all 400ms;
    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(150, 150, 150);
      cursor: pointer;
    }
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
  & input.addressInput {
    width: 300px;
    margin-left: 180px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(150, 150, 150);
    border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

const NoneInputBox = styled.div`
  width: 700px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  padding: 19px 0;
  border-bottom: 1px solid rgb(200, 200, 200);
  color: rgb(80, 80, 80);
  font-size: 14px;
  & > p:first-child {
    font-size: 14px;
    width: 100px;
    position: relative;
    margin-right: 80px;
  }
  div {
    color: rgb(120, 120, 120);
  }
`;

const PasswordInputBox = styled.div`
  margin: 10px 0 0 180px;
`;

const PasswordModifyBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > p:first-child {
    font-size: 13px;
    width: 100px;
    position: relative;
    margin-right: 20px;
  }
  flex-wrap: wrap;
`;

const Input = styled.input`
  width: 420px;
  padding: 8px 0 8px 8px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  color: rgb(120, 120, 120);
`;

const PwInput = styled.input`
  width: 300px;
  padding: 8px 0 8px 8px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  color: rgb(120, 120, 120);
  margin: 2px 0;
`

const PnInput = styled.input`
  width: 110px;
  padding: 8px 0 8px 8px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  color: rgb(120, 120, 120);
  margin: 2px 0;
  background-color: 'rgb(240, 240, 240)';
`

const Hiddener = styled.button`
  color: rgb(120, 120, 120);
  background-color: rgb(250, 250, 250);
  padding: 7px 15px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  transition: all 400ms;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(150, 150, 150);
    cursor: pointer;
  }
`;

const ErrMes = styled.p`
  margin-left: 180px;
  margin-top: 10px;
  width: 320px;
  font-size: 12px;
  color: rgb(255, 51, 51);
`;

const PwErrMes = styled.p`
  margin: 5px 0 5px 120px;
  font-size: 12px;
  color: rgb(255, 51, 51);
`;

const CancleBtn = styled.button`
  color: rgb(40, 40, 40);
  border: none;
  background: none;
  text-decoration: underline;
  transition: all 400ms;
  cursor: pointer;
  &:hover {
    color: rgb(120, 120, 120);
  }
`;

const ModifyBtn = styled.button`
  margin-left: 15px;
  color: rgb(120, 120, 120);
  background-color: rgb(250, 250, 250);
  padding: 7px 15px;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 4px;
  transition: all 400ms;
  &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(150, 150, 150);
    cursor: pointer;
  }
`;

const GenderInput = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  span {
    margin-left: 7px;
  }
  padding: 5px 0;
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  margin-top: 20px;
  margin-left: 617px;
  background-color: rgb(20, 20, 20);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 400ms;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(20, 20, 20);
  }
`

export default function ProfileEdit() {
  let reBirthDate;
  const [postCode, setPostCode] = useState(sessionStorage.getItem('user_postcode') || '');
  const [address, setAddress] = useState(sessionStorage.getItem('user_address') || '');
  const [detailAddress, setDetailAddress] = useState(sessionStorage.getItem('user_detail_address') || '');
  const [name, setName] = useState(sessionStorage.getItem('user_name') || '');
  const [gender, setGender] = useState(sessionStorage.getItem('user_gender') || '');
  const [birthDate, setBirthDate] = useState(sessionStorage.getItem('user_birthdate') || '');
  const [phoneNumber, setPhoneNumber] = useState(formatPhoneNumber(sessionStorage.getItem('user_phonenum')) || '');
  
  const [errCode, setErrCode] = useState(''); // 에러코드
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isPwHidden, setIsPwHidden] = useState(true);
  const [phoneNumModify, setPhoneNumModify] = useState(false);
  const [postcodeModify, setPostcodeModify] = useState(false);
  const [phoneNumModifyCompleted, setPhoneNumModifyCompleted] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [phoneVerifyStatus, setPhoneVerifyStatus] = useState(false);
  const [isPhoneVerificationCompleted, setIsPhoneVerificationCompleted] = useState(false); // 휴대폰 인증 여부
  const [phoneVerifyTimeout, setPhoneVerifyTimeout] = useState(180); // 초기 타이머 값 (3분 = 180초)

  const [showErrorModal, setShowErrorModal] = useState(false); // 에러메시지 on/off
  const [showProfileEditFinModal, setShowProfileEditFinModal] = useState(false);

  // 생년월일 입력 칸 조절
  function handleBirthInput(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 8); // 0부터 9까지 숫자만, 최대 8자리
    setBirthDate(event.target.value);
  }

  const regexPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/; // 8~16자 사이, 숫자와 알파벳, 특수문자 모두 포함
  // 패스워드 유효성을 검사하는 함수
  const validatePassword = (password) => {
    return regexPW.test(password);
  };

  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  function pwClose() {
    setIsPwHidden(true);
  }

  function pwOpen() {
    setIsPwHidden(false);
  }

  function openPhoneNumModify() {
    setPhoneNumModify(true);
    if (!isPhoneVerificationCompleted){
      setPhoneNumber('');
    }
  }

  function closePhoneNumModify() {
    if (isPhoneVerificationCompleted) {
      setPhoneNumber(phoneNumber);
    } else {
      setPhoneNumber(formatPhoneNumber(sessionStorage.getItem('user_phonenum')) || '');
    }
    setPhoneNumModify(false);
  }

  function openPostcodeModify() {
    setPostcodeModify(true);
  }

  function closePostcodeModify() {
    setPostcodeModify(false);
  }
  

  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber && typeof phoneNumber === 'string') {
      const cleaned = phoneNumber.replace(/\D/g, '');
      const formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      return formatted;
    } else {
      console.error('Invalid phoneNumber:', phoneNumber);
      return ''; 
    }
  }

  function submitProfileEdit() {
    if (name.length == 0) {
      setName(sessionStorage.getItem('user_id'));
    }
    if (birthDate.length == 8) {
      reBirthDate = `${birthDate.substr(0, 4)}-${birthDate.substr(4, 2)}-${birthDate.substr(6, 2)}`;
    } else {
      reBirthDate = '';
    }
    if (phoneNumber.length !== 11) {
      setPhoneNumber(sessionStorage.getItem('user_phonenum') || '');
    }
    if (validatePassword(password) && passwordsMatch) {
       // 비밀번호 해싱
       bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('비밀번호 해싱 오류:', err);
          setErrCode('PE01 : 비밀번호 해싱 오류');
          setShowErrorModal(true);
        } else {
          const userData = {
            uid: sessionStorage.getItem('user_uid'),
            password: hashedPassword, // 해싱된 비밀번호를 서버로 전송
            name,
            gender,
            reBirthDate,
            phoneNumber,
            postCode,
            address,
            detailAddress,
          };
          // 서버로 회원 정보를 전송
          fetch('http://localhost:3001/api/mypage/editpwprofile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('서버 응답이 실패하였습니다.');
            }
          })
          .then((data) => {
            if (data.message) {
              if (data.success) {
                setShowProfileEditFinModal(true);
              }
            } else {
              console.error('오류:', data.error);
              setErrCode('PE02 : 회원 정보 수정 오류');
              setShowErrorModal(true);
            }
          })
          .catch((error) => {
            console.error('오류:', error);
            setErrCode('PE03 : 서버 응답 오류');
            setShowErrorModal(true);
          });
        }
      })
    } else {
      const userData = {
        uid: sessionStorage.getItem('user_uid'),
        name,
        gender,
        reBirthDate,
        phoneNumber,
        postCode,
        address,
        detailAddress,
      };
      // 서버로 회원 정보를 전송
      fetch('http://localhost:3001/api/mypage/editprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('서버 응답이 실패하였습니다.');
        }
      })
      .then((data) => {
        if (data.message) {
          if (data.success) {
            setShowProfileEditFinModal(true);
          }
        } else {
          console.error('오류:', data.error);
          setErrCode('PE02 : 회원 정보 수정 오류');
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error('오류:', error);
        setErrCode('PE03 : 서버 응답 오류');
        setShowErrorModal(true);
      });
    }
  }

  function handleProfileEditModalClose() {
    setShowProfileEditFinModal(false);
    window.location.reload();
  }
  
  return (
    <>
      <Title>회원정보 수정</Title>
      {!isPasswordCheck && <ProfilePasswordCheck isPasswordCheck={isPasswordCheck} setIsPasswordCheck={setIsPasswordCheck}/>}
      {isPasswordCheck &&
        <ProfileEditContainer>
          <h2>기본 정보</h2>
          <ProfileEditerForm>
            <InputBox>
              <p>이름</p>
              <Input 
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              ></Input>
            </InputBox>
            <InputBox>
              <p>성별</p>
              <GenderInput><input type='radio' name='gender' value="0" 
                checked={gender === '0'}
                onChange={(e) => setGender(e.target.value)}
              /><span>남</span></GenderInput>
              <GenderInput><input type='radio' name='gender' value="1" 
                checked={gender === '1'}
                onChange={(e) => setGender(e.target.value)}
              /><span>여</span></GenderInput>
            </InputBox>
            <InputBox>
              <p>생년월일</p>
              <Input
                type="text"
                placeholder="숫자만 8자리 입력 (예: 19970826)"
                onInput={handleBirthInput}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </InputBox>
            <NoneInputBox>
              <p>아이디</p>
              <div>{sessionStorage.getItem('user_id')}</div>
            </NoneInputBox>
            <InputBox>
                <p>비밀번호</p>
                <Hiddener type="button" onClick={pwOpen} disabled={!isPwHidden}>변경</Hiddener>
                {!isPwHidden && 
                  <PasswordInputBox>
                    <PasswordModifyBox>
                      <p>새 비밀번호</p>
                      <PwInput
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></PwInput>
                      <PwErrMes
                        $showErr={password.length > 0}
                        style={{
                          color: !validatePassword(password) ? 'rgb(250, 50, 50)' : 'rgb(150, 200, 50)'
                        }}
                      >
                        {password.length > 0 ? ( 
                          !validatePassword(password)
                            ? '8~16자 사이, 숫자와 알파벳, 특수문자 모두 포함되어야 합니다.'
                            : '옳바른 비밀번호입니다'
                        ) : null}
                      </PwErrMes>
                    </PasswordModifyBox>
                    <PasswordModifyBox>
                      <p>새 비밀번호 확인</p>
                      <PwInput
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      >
                      </PwInput>
                      <PwErrMes 
                        $showErr={confirmPassword.length > 0}
                        style={{
                          color: !passwordsMatch() ? 'rgb(250, 50, 50)' : 'rgb(150, 200, 50)'
                        }}
                        >
                        {confirmPassword.length > 0 ? (
                          !passwordsMatch()
                            ? '비밀번호와 일치하지 않습니다'
                            : '비밀번호와 일치합니다'
                        ) : null}
                      </PwErrMes>
                    </PasswordModifyBox>
                    <CancleBtn type="button" onClick={pwClose} style={{ marginLeft: '398px' }}>취소</CancleBtn>
                  </PasswordInputBox>
                }
            </InputBox>
            <InputBox>
              <p className='must'>휴대폰 번호</p>
              {!phoneNumModify &&
                <PnInput
                  type="text"
                  placeholder="휴대폰 번호"
                  value={phoneNumber}
                  disabled
                />
              }
              {!phoneNumModify &&
                <ModifyBtn
                type='button'
                onClick={openPhoneNumModify}
                >
                  수정
                </ModifyBtn>
              }
              {phoneNumModify &&
                <PhoneVerification onError={() => setShowErrorModal(true)}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  phoneVerifyStatus={phoneVerifyStatus}
                  setPhoneVerifyStatus={setPhoneVerifyStatus}
                  isPhoneVerificationCompleted={isPhoneVerificationCompleted}
                  setIsPhoneVerificationCompleted={setIsPhoneVerificationCompleted}
                  errCode={errCode}
                  setErrCode={setErrCode}
                />  
              }
              {phoneNumModify &&
                <CancleBtn
                  type='button'
                  onClick={closePhoneNumModify}
                  style={{ marginLeft: '580px' }}
                >
                  취소
                </CancleBtn>
              }
            </InputBox>
            <InputBox>
              <p>주소</p>
              {!postcodeModify &&
                <>
                  <input id='postCodeInput' type="text" placeholder="우편번호" disabled value={postCode} /> 
                  <ModifyBtn
                    type='button'
                    onClick={openPostcodeModify}
                  >
                    수정
                  </ModifyBtn>
                  <input className='addressInput' type="text" placeholder="주소" disabled value={address} />
                </>
              }
              {postcodeModify &&
                <AddressInput 
                  postCode={postCode}
                  setPostCode={setPostCode}
                  address={address}
                  setAddress={setAddress}
                  detailAddress={detailAddress}
                  setDetailAddress={setDetailAddress}
                />
              }
              {postcodeModify &&
                <CancleBtn
                  type='button'
                  onClick={closePostcodeModify}
                  style={{ marginLeft: '15px' }}
                >
                  취소
                </CancleBtn>  
              }
            </InputBox>
          </ProfileEditerForm>
          <SubmitButton onClick={submitProfileEdit} type='button' >
            수정
          </SubmitButton>
        </ProfileEditContainer>
      }
    <MS.AlertOverlay $showAlertModal={showProfileEditFinModal}/>
    <ErrorModal 
      showErrorModal={showErrorModal}
      setShowErrorModal={setShowErrorModal}
      errCode={errCode}
      setErrCode={setErrCode}
    />
    <MS.AlertOverlay $showAlertModal={showProfileEditFinModal}/>
    <MS.AlertModal $showAlertModal={showProfileEditFinModal}>
      <p>수정이 완료되었습니다.</p>
      <div>
        <button onClick={handleProfileEditModalClose}>확인</button>
      </div>
    </MS.AlertModal>
    </>
  );
}
