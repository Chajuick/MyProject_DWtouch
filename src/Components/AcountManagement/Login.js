import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import * as MS from '../Modal/ModalStyle';
import FindAccount from '../FindUser/FindAccount';

const Logo = styled.img`
  width: 200px;
  margin: 0 auto 20px;
  display: block;
`;

const InputBox = styled.div`
  position: relative;
  margin: 5px 0;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  position: relative;
`;

const FormButton = styled.button`
  margin-top: 100px;
  background-color: rgb(20, 20, 20);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 14px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 400ms;

  &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(20, 20, 20);
  }
`;

const CheckIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: green;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
`;

const ErrorMessage = styled.div`
  margin-top: 0.6rem;
  margin-right: 10px;
  font-size: 12px;
  color: red;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  &.LoginChecker{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 10px 0;
`;

const RememberMeCheckbox = styled.input`
  margin-right: 5px;
`;

const HelpBox = styled.div`
  margin: 1.5rem 0 1rem 0;
  display: flex;
  justify-content: center;
  font-size: 14px;
  a, div {
    margin: 0 0.5rem;
    color: rgb(80, 80, 80);
    transition: color 400ms;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: rgb(15, 15, 15);
      text-decoration-line: underline;
    }
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const ERR_MESSAGES = {
  id: '아이디를 입력해주세요',
  password: '비밀번호를 입력해주세요',
};

export default function Login({ showModal, setShowModal, showRegisterModal, setShowRegisterModal }) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [useridFocus, setUseridFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);
  const [isId, setIsId] = useState(true);

  useEffect(() => {
    const savedUserid = localStorage.getItem('rememberedUserid');
    if (savedUserid) {
      setUserid(savedUserid);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    setPassword(''); // 모달이 닫힐 때 비밀번호 필드 초기화
    setUseridFocus(true); // 아이디 입력 필드 포커스 상태 초기화
    setPasswordFocus(true); // 비밀번호 입력 필드 포커스 상태 초기화
  }, [showModal])

  const handleCloseModal = () => {
    setShowModal(false);
    if (!rememberMe) {
      localStorage.removeItem('rememberedUserid'); // 아이디를 삭제
    }
    setUseridFocus(true); // 아이디 입력 필드 포커스 상태 초기화
    setPasswordFocus(true); // 비밀번호 입력 필드 포커스 상태 초기화
    setLoginError(''); // 로그인 에러 메시지 초기화
  };

  const handleLogin = () => {
    if (userid.trim() !== '' && password.trim() !== '') {
        // 서버로 아이디와 비밀번호 전송
        fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid, password }),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('로그인 성공');
            setLoginError('');
            // 세션 토큰 저장
            if (rememberMe) {
              localStorage.setItem('rememberedUserid', userid); // 아이디 저장
            }
            sessionStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 세션 스토리지에 설정
            sessionStorage.setItem('user_uid', data.user.userUid);
            sessionStorage.setItem('user_id', data.user.userId);
            sessionStorage.setItem('user_name', data.user.userName);
            sessionStorage.setItem('user_gender', data.user.userGender);
            const dateObject = new Date(data.user.userBirthDate);
            const year = dateObject.getUTCFullYear();
            const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
            const day = (dateObject.getUTCDate()).toString().padStart(2, '0');
            const formattedDate = `${year}${month}${day}`;
            sessionStorage.setItem('user_birthdate', formattedDate);
            sessionStorage.setItem('user_joindate', data.user.userJoinDate);
            sessionStorage.setItem('user_phonenum', data.user.userPhoneNum);
            sessionStorage.setItem('user_permissions', data.user.userPermissions);
            sessionStorage.setItem('user_points', data.user.userPoints);
            sessionStorage.setItem('user_grades', data.user.userGrades);
            sessionStorage.setItem('user_address', data.user.userAddress);
            sessionStorage.setItem('user_detail_address', data.user.userDetailAddress);
            sessionStorage.setItem('user_postcode', data.user.userPostCode);
            handleCloseModal();
            window.location.reload();
          } else {
            setLoginError(data.message);
            console.log('로그인 실패');
          }
        })
        .catch((error) => {
          console.error('로그인 오류:', error);
          setLoginError('로그인에 실패했습니다.');
        });
    } else {
      setLoginError('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const isButtonDisabled = userid.trim() === '' || password.trim() === '';

  function handleRegister() {
    setShowModal(false);
    setShowRegisterModal(true);
  };

  function handleFindModalOpen(num) {
    setShowModal(false);
    setShowFindModal(true);
    if (num === 0) {
      setIsId(true);
    } else if (num === 1) {
      setIsId(false);
    };
  };

  return (
    <>
      <MS.Overlay $showModal={showModal} />
      <MS.Modal $showModal={showModal}>
        <MS.ModalCloseBtn onClick={() => handleCloseModal()}>&times;</MS.ModalCloseBtn>
        <Logo src={logo} alt="로고" />
        <LoginForm>
          <InputBox>
            <Input
              type="text"
              placeholder="아이디"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              onFocus={() => setUseridFocus(true)}
              onBlur={() => setUseridFocus(false)} 
            />
            <CheckIcon $show={userid.trim() !== ''}>&#10003;</CheckIcon>
            <ErrorMessage $show={!useridFocus && userid.trim() === ''}>
              {ERR_MESSAGES.id}
            </ErrorMessage>
          </InputBox>
          <InputBox>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)} 
              onBlur={() => setPasswordFocus(false)} 
            />
            <CheckIcon $show={password.trim() !== ''}>&#10003;</CheckIcon>
            <ErrorMessage $show={!passwordFocus && password.trim() === ''}>
              {ERR_MESSAGES.password}
            </ErrorMessage>
          </InputBox>
          <RememberMe>
            <RememberMeCheckbox
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            아이디 저장
          </RememberMe>
          <FormButton type="button" onClick={handleLogin} disabled={isButtonDisabled}>
            로그인
          </FormButton>
          <ErrorMessage className='LoginChecker' $show={loginError !== ''}>{loginError}</ErrorMessage>
        </LoginForm>
        <HelpBox>
          <div onClick={handleRegister}>회원가입</div>
          <div onClick={() => handleFindModalOpen(0)}>아이디찾기</div>
          <div onClick={() => handleFindModalOpen(1)}>비밀번호찾기</div>
        </HelpBox>
      </MS.Modal>
      <FindAccount
        showFindModal={showFindModal}
        setShowFindModal={setShowFindModal}
        isId={isId}
        setIsId={setIsId}
      />
    </>
  );
}
