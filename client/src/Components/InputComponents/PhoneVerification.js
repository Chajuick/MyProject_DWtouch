import React, { useState, useEffect } from "react";
import * as MS from "../Modal/ModalStyle";

export default function PhoneVerification({ phoneNumber, setPhoneNumber, phoneVerifyStatus, setPhoneVerifyStatus, isPhoneVerificationCompleted, setIsPhoneVerificationCompleted, setErrCode, onError, handleOpenFindAccountModal, showIsPhoneDuplicateModal, setShowIsPhoneDuplicateModal }) {
    const [verifyNum, setVerifyNum] = useState('');
    const [randomKey, setRandomKey] = useState('');
    const [phoneVerifyTimeout, setPhoneVerifyTimeout] = useState(180);
    // 알림 모달
    const [showPhoneVerifyStartModal, setShowPhoneVerifyStartModal] = useState(false);
    const [showPhoneVerificationCompletedModal, setShowPhoneVerificationCompletedModal] = useState(false);
    const [showInvalidVerificationModal, setShowInvalidVerificationModal] = useState(false);

    // 휴대폰 번호 입력
    function handlePhoneNumInput(event) {
        // 숫자만, 최대 11자리
        event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        setPhoneNumber(event.target.value);
    }

    function formatPhoneNumber(phoneNumber) {
        const formatted = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        return formatted;
    }

    // 휴대폰 번호 중복 확인
    function isPhoneDuplicate() {
        setIsPhoneVerificationCompleted(false);
        fetch('http://192.168.0.7:3001/api/register/checkphonenum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userphonenum: phoneNumber }), 
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
        if (!data.isAvailable) {
            setShowIsPhoneDuplicateModal(true); // 중복 안내문 열기
        } else if(data.isAvailable) {
            sendPhoneVerification();
        }
        })
        .catch((error) => {
            console.error('오류:', error);
            setErrCode('PN01 : 휴대폰 중복 확인 오류');
            onError();
        });
    } 

    // 휴대폰 인증 번호 발송
    function sendPhoneVerification() {
        fetch('http://192.168.0.7:3001/api/register/verifyphonenum', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userphonenum: phoneNumber }), 
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
            setShowPhoneVerifyStartModal(true); // 발송 안내문 열리기
            setRandomKey(data.randomKey); // 랜덤키 저장
        })
        .catch((error) => {
            console.error('오류:', error);
            setErrCode('PN02 : 휴대폰 인증 번호 발송 오류');
            onError();
        });
    }

    // 인증번호 확인
    function checkPhoneVerificationCode() {
        if(verifyNum == randomKey) {
            setIsPhoneVerificationCompleted(true);
            setShowPhoneVerificationCompletedModal(true);
            setPhoneVerifyStatus(false);
        } else {
            setShowInvalidVerificationModal(true);
        }
    }
    
    // 중복 안내문 닫기
    function closePhoneDuplicateModal() {
        setPhoneNumber('');
        setShowIsPhoneDuplicateModal(false);
    }
    // 발송 안내문 닫기
    function closePhoneVerifyStartModal() {
        setPhoneVerifyStatus(true); // 인증 상태를 활성화
        setPhoneVerifyTimeout(180); // 타이머를 초기화
        setShowPhoneVerifyStartModal(false);
    }
    // 완료 안내문 닫기
    function closePhoneVerificationCompletedModal() {
        setShowPhoneVerificationCompletedModal(false);
    }
    // 인증 실패 안내문 닫기
    function closeInvalidVerificationModal() {
        setShowInvalidVerificationModal(false);
    }

    // 휴대폰 번호 인증 타이머 감소 함수
    const decrementPhoneVerifyTimeout = () => {
        if (phoneVerifyTimeout > 0) {
            setPhoneVerifyTimeout(phoneVerifyTimeout - 1);
        } 
    };
    useEffect(() => {
        let timer;
        if (phoneVerifyStatus) {
            timer = setInterval(() => {
                decrementPhoneVerifyTimeout();
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [phoneVerifyStatus, phoneVerifyTimeout, decrementPhoneVerifyTimeout]);

    return(
        <>
            <input className="phonenumInput"
                type="text"
                placeholder="휴대폰 번호 (-빼고 숫자만 입력)"
                value={phoneNumber}
                onInput={handlePhoneNumInput}
                disabled={isPhoneVerificationCompleted || (phoneVerifyStatus && phoneVerifyTimeout < 0)}
            />
            <button className="phoneVerificationSendBtn"
                type='button'
                disabled={isPhoneVerificationCompleted || phoneNumber.length < 11}
                style={{
                    pointerEvents: (isPhoneVerificationCompleted || phoneNumber.length < 11) ? 'none' : 'auto',
                    opacity: (isPhoneVerificationCompleted || phoneNumber.length < 11) ? 0.5 : 1,
                }}
                onClick={isPhoneDuplicate}
            >
                휴대폰 인증
            </button>
            <div className="phoneVerificationBox">
                <input className="phoneVerificationInput"
                    style={{ display: phoneVerifyStatus ? 'block' : 'none' }}
                    placeholder='인증번호'
                    value={verifyNum}
                    onChange={(e) => setVerifyNum(e.target.value)}
                    disabled={phoneVerifyTimeout <= 0}
                    maxLength={6}
                />
                <button className="phoneVerificationCheckBtn"
                    type='button'
                    onClick={checkPhoneVerificationCode}
                    style={{
                        display: phoneVerifyStatus ? 'block' : 'none',
                        pointerEvents: phoneVerifyTimeout <= 0 ? 'none' : 'auto',
                        opacity: phoneVerifyTimeout <= 0 ? 0.5 : 1,
                    }}
                    disabled={phoneVerifyTimeout <= 0}
                >
                    인증
                </button>
                <div className="verificationTimeOut" style={{ display: phoneVerifyStatus ? 'block' : 'none' }}>
                {phoneVerifyTimeout > 0 ? (
                    // 아직 타이머가 동작 중인 경우 시간을 표시
                    <>
                        {String(Math.floor(phoneVerifyTimeout / 60)).padStart(2, '0')}:
                        {String(phoneVerifyTimeout % 60).padStart(2, '0')}
                    </>
                ) : (
                    // 타이머가 만료된 경우 "만료되었습니다" 메시지 출력
                    "만료되었습니다"
                )}
                </div>
            </div>

            <MS.AlertOverlay $showAlertModal={showIsPhoneDuplicateModal}/>
            <MS.AlertModal $showAlertModal={showIsPhoneDuplicateModal}>
                <h2 className="showPhoneNumber">{formatPhoneNumber(phoneNumber)}</h2>
                <p>이 번호로 가입한 적이 있습니다.<br />아이디를 찾으시겠습니까?</p>
                <div>
                    <button type='button' onClick={() => handleOpenFindAccountModal()}>확인</button>
                    <button type='button' onClick={closePhoneDuplicateModal}>취소</button>
                </div>
            </MS.AlertModal>
            <MS.AlertOverlay $showAlertModal={showPhoneVerifyStartModal}/>
            <MS.AlertModal $showAlertModal={showPhoneVerifyStartModal}>
                <p>인증 번호가 발송되었습니다.</p>
                <div>
                    <button type='button' onClick={closePhoneVerifyStartModal}>확인</button>
                </div>
            </MS.AlertModal>
            <MS.AlertOverlay $showAlertModal={showPhoneVerificationCompletedModal}/>
            <MS.AlertModal $showAlertModal={showPhoneVerificationCompletedModal}>
                <p>인증이 완료되었습니다.</p>
                <div>
                    <button type='button' onClick={closePhoneVerificationCompletedModal}>확인</button>
                </div>
            </MS.AlertModal>
            <MS.AlertOverlay $showAlertModal={showInvalidVerificationModal}/>
            <MS.AlertModal $showAlertModal={showInvalidVerificationModal}>
                <p>인증번호가 맞지 않습니다!</p>
                <div>
                    <button type='button' onClick={closeInvalidVerificationModal}>확인</button>
                </div>
            </MS.AlertModal>
        </>
    )
}