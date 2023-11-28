import React, { useEffect, useState } from 'react';
import * as S from './RegisterStyle';
import * as MS from '../../Modal/ModalStyle'
import bcrypt from 'bcryptjs';
import PhoneVerification from '../PhoneVerification';
import AddressInput from '../AddressInput';
import ErrorModal from '../../Modal/ErrorModal';

export default function Register({ showModal, setShowModal }) {
  const [showIdSelectModal, setShowIdSelectModal] = useState(false); // Id 확정 모달 
  const [showRegisterCompleteModal, setShowRegisterCompleteModal] = useState(false); // 가입확인 모달
  const [showErrorModal, setShowErrorModal] = useState(false); // 에러메시지 on/off
  const [errCode, setErrCode] = useState(''); // 에러코드
  const [id, setId] = useState(''); // 유저 아이디
  const [password, setPassword] = useState(''); // 유저 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(''); // 유저 비밀번호 확인
  const [name, setName] = useState(''); // 유저 이름
  const [gender, setGender] = useState(''); // 유저 성별
  const [birthDate, setBirthDate] = useState(''); // 유저 생년월일
  const [phoneNumber, setPhoneNumber] = useState(''); //유저 휴대폰 번호
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const [isIdConfirmed, setIsIdConfirmed] = useState(false); // 아이디 확정 여부
  const [idChecker, setIdChecker] = useState(false); // 아이디 입력 중인지 확인 여부
  const [phoneVerifyStatus, setPhoneVerifyStatus] = useState(false); // 휴대폰 인증 발송 상태
  const [isPhoneVerificationCompleted, setIsPhoneVerificationCompleted] = useState(false); // 휴대폰 인증 여부
  const [phoneNumModify, setPhoneNumModify] = useState(true);

  useEffect(() => {
    setId(''); // 아이디 초기화
    setPassword(''); // 패스워드 초기화
    setConfirmPassword(''); // 확인 패스워드 초기화
    setName('');
    setBirthDate(''); // 생년월일 초기화 (만약 필요하다면)
    setPhoneNumber(''); // 전화번호 초기화
    setIsIdConfirmed(false); // 아이디 확정 여부 초기화
    setIdChecker(false); // 아이디 중복 확인 여부 초기화
    setPhoneVerifyStatus(false); // 전화번호 인증 상태 초기화
    setIsPhoneVerificationCompleted(false); // 전화번호 인증 완료 상태 초기화
    setPostCode('');
    setAddress('');
    setDetailAddress('');
  }, [showModal])

  // 아이디, 패스워드, 패스워드 확인의 정규표현식을 정의
  const regexID = /^[a-zA-Z0-9]{4,16}$/; // 4~16자 사이의 숫자와 알파벳
  const regexPW = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/; // 8~16자 사이, 숫자와 알파벳, 특수문자 모두 포함

  // 아이디 유효성을 검사하는 함수
  const validateId = (id) => {
    return regexID.test(id);
  };

  // 패스워드 유효성을 검사하는 함수
  const validatePassword = (password) => {
    return regexPW.test(password);
  };

  // 확인 비밀번호와 일치하는지 검사하는 함수
  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  // 회원가입 버튼 클릭 시 수행되는 함수
  const handleRegister = () => {
    if (isIdConfirmed && validatePassword(password) && passwordsMatch() && name.length > 0 && isPhoneVerificationCompleted) {
      // 생년월일 DATE로
      const RebirthDate = `${birthDate.substr(0, 4)}-${birthDate.substr(4, 2)}-${birthDate.substr(6, 2)}`;
      if (name.length == 0) {
        name = id;
      } 
      // 비밀번호 해싱
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('비밀번호 해싱 오류:', err);
          setErrCode('RS01 : 비밀번호 해싱 오류');
          setShowErrorModal(true);
        } else {
          const userData = {
            id,
            password: hashedPassword, // 해싱된 비밀번호를 서버로 전송
            name,
            gender,
            RebirthDate,
            phoneNumber,
            postCode,
            address,
            detailAddress,
          };
          // 서버로 회원 정보를 전송
          fetch('http://localhost:3001/api/register/signup', {
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
                setShowRegisterCompleteModal(true);
              }
            } else {
              console.error('오류:', data.error);
              setErrCode('RS02 : 데이터베이스 저장 오류');
              setShowErrorModal(true);
            }
          })
          .catch((error) => {
            console.error('오류:', error);
            setErrCode('RS03 : 데이터베이스 저장 오류');
            setShowErrorModal(true);
          });
        }
      })
    }
  };

  // 아이디 중복 확인 함수
  function CheckId() {
    fetch('http://localhost:3001/api/register/checkid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: id }), // 아이디를 요청 본문에 담아 보냅니다.
    })
    .then((response) => {
      if (response.ok) {
        return response.json(); // 서버 응답을 JSON 형식으로 파싱
      } else {
        throw new Error('서버 응답이 실패하였습니다.');
      }
    })
    .then((data) => {
      // 서버로부터 받은 응답 처리
      if(!data.isAvailable){
        setIdChecker(true)
      } else {
        setShowIdSelectModal(true);
      }
    })
    .catch((error) => {
      console.error('오류:', error);
      setErrCode('RS04 : 아이디 중복 확인 오류');
      setShowErrorModal(true);
    });
  };

  // 생년월일 입력 칸 조절
  function handleBirthInput(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 8); // 0부터 9까지 숫자만, 최대 8자리
    setBirthDate(event.target.value);
  }

  // 회원가입 완료 모달 닫기
  function CloseRegisterCompleteModal() {
    setShowRegisterCompleteModal(false); 
    setShowModal(false); // 회원가입 창 닫기
    window.location.reload();
  }

  // 아이디 확정 취소
  function closeIdSelectModal() {
    setId("");
    setShowIdSelectModal(false);
  }
  // 아이디 확정
  function idConfirm() {
    setIsIdConfirmed(true);
    setShowIdSelectModal(false);
  }

  function handleCloseModal() {
    setId(''); // 아이디 초기화
    setPassword(''); // 패스워드 초기화
    setConfirmPassword(''); // 확인 패스워드 초기화
    setName('');
    setBirthDate(''); // 생년월일 초기화 (만약 필요하다면)
    setPhoneNumber(''); // 전화번호 초기화
    setIsIdConfirmed(false); // 아이디 확정 여부 초기화
    setIdChecker(false); // 아이디 중복 확인 여부 초기화
    setPhoneVerifyStatus(false); // 전화번호 인증 상태 초기화
    setIsPhoneVerificationCompleted(false); // 전화번호 인증 완료 상태 초기화
    setPostCode('');
    setAddress('');
    setDetailAddress('');
    setShowModal(false);
  }

return (
  <>
    <MS.Overlay $showModal={showModal} />
    <MS.Modal $showModal={showModal}>
      <S.Title>회원가입</S.Title>
      <S.CloseButton onClick={handleCloseModal}>&times;</S.CloseButton>
      <S.RegisterForm method='Post'>
        <S.InputBox>
          <p className='must'>아이디</p>
          <S.Input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => {
              setId(e.target.value)
              setIdChecker(false);
            }}
            disabled={isIdConfirmed}
          />
          <S.CheckBtn type="button" disabled={!validateId(id) || isIdConfirmed} onClick={CheckId}>중복확인</S.CheckBtn>
          <S.ErrMes $showErr={id.length > 0 && !validateId(id) && !isIdConfirmed} style={{color:'rgb(250, 50, 50)' }}>
            4~16자 사이 숫자와 알파벳으로만 가능합니다.
          </S.ErrMes>
          <S.ErrMes $showErr={validateId(id) && !isIdConfirmed && idChecker} style={{color:'rgb(250, 50, 50)' }}>
            이미 존재하는 아이디입니다.
          </S.ErrMes>
          <S.ErrMes $showErr={isIdConfirmed} style={{ color : 'rgb(150, 200, 50)' }}>사용가능한 아이디입니다.</S.ErrMes>
        </S.InputBox>
        <S.InputBox>
          <p className='must'>비밀번호</p>
          <S.Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.ErrMes
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
          </S.ErrMes>
        </S.InputBox>
        <S.InputBox>
          <p className='must'>비밀번호 확인</p>
          <S.Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <S.ErrMes 
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
          </S.ErrMes>
        </S.InputBox>
        <S.InputBox>
          <p className='must'>이름</p>
          <S.Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </S.InputBox>
        <S.InputBox>
          <p>성별</p>
          <S.GenderInput><input type='radio' name='gender' value="0" 
            checked={gender === '0'}
            onChange={(e) => setGender(e.target.value)}
          /><span>남</span></S.GenderInput>
          <S.GenderInput><input type='radio' name='gender' value="1" 
            checked={gender === '1'}
            onChange={(e) => setGender(e.target.value)}
          /><span>여</span></S.GenderInput>
        </S.InputBox>
        <S.InputBox>
          <p>생년월일</p>
          <S.Input
            type="text"
            placeholder="숫자만 8자리 입력 (예: 19970826)"
            onInput={handleBirthInput}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </S.InputBox>
        <S.InputBox>
          <p className='must'>휴대폰 번호</p>
          <PhoneVerification onError={() => setShowErrorModal(true)}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            phoneVerifyStatus={phoneVerifyStatus}
            setPhoneVerifyStatus={setPhoneVerifyStatus}
            isPhoneVerificationCompleted={isPhoneVerificationCompleted}
            setIsPhoneVerificationCompleted={setIsPhoneVerificationCompleted}
            errCode={errCode}
            setErrCode={setErrCode}
            phoneNumModify={phoneNumModify}
            setPhoneNumModify={setPhoneNumModify}
          />
        </S.InputBox>
        <S.InputBox>
          <p>주소</p>
          <AddressInput 
            postCode={postCode}
            setPostCode={setPostCode}
            address={address}
            setAddress={setAddress}
            detailAddress={setDetailAddress}
          />
        </S.InputBox>
        <S.FormButton onClick={handleRegister} type='button'
          disabled={
            !isIdConfirmed ||
            !validatePassword(password) ||
            !passwordsMatch() ||
            name.length === 0 ||
            !isPhoneVerificationCompleted
          }
        >
          완료
        </S.FormButton>
      </S.RegisterForm>
    </MS.Modal>
    <ErrorModal 
      showErrorModal={showErrorModal}
      setShowErrorModal={setShowErrorModal}
      errCode={errCode}
      setErrCode={setErrCode}
    />
    <MS.AlertOverlay $showAlertModal={showIdSelectModal}/>
    <MS.AlertModal $showAlertModal={showIdSelectModal}>
      <h2 style={{ color: "rgb(150, 200, 50)", fontSize: '14px', marginBottom: "10px"}}>{id}</h2>
      <p>이 아이디로 하시겠습니까?</p>
      <div>
          <button type='button' onClick={idConfirm}>확인</button>
          <button type='button' onClick={closeIdSelectModal}>취소</button>
      </div>
    </MS.AlertModal>
    <MS.AlertOverlay $showAlertModal={showRegisterCompleteModal}/>
    <MS.AlertModal $showAlertModal={showRegisterCompleteModal}>
      <p>회원가입이 완료되었습니다.</p>
      <div>
        <button onClick={CloseRegisterCompleteModal}>확인</button>
      </div>
    </MS.AlertModal>
  </>
  );
}
