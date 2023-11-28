import * as S from './Register/RegisterStyle';
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const DaumPostModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 250, 250);
  border-radius: 5px;
  padding: 10px;
  z-index: 2002;
  width: 450px;
`
const DaumPostOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
`
const postCodeStyle = {
  width: '400px',
  height: '470px'
}

export default function AddressInput( { postCode, address, detailAddress, setPostCode, setAddress, setDetailAddress }) {
  const [showPostModal, setShowPostModal] = useState(false);

  function openPostcode() {
    setShowPostModal(true);
  }
  function closePostcode() {
    setShowPostModal(false);
  }
  const onCompletePost = (data) => {
    setShowPostModal(false);
    setPostCode(data.zonecode);
    setAddress(data.address);
  };

  return (
  <>
    <input className='postCodeInput' type="text" placeholder="우편번호" disabled value={postCode} />
    <button className='postCodeSearchBtn' type="button" onClick={openPostcode}>우편번호 찾기</button>
    <input className='addressInput' type="text" placeholder="주소" disabled defaultValue={address} />
    <input className='addressInput' type="text" placeholder="상세주소" defaultValue={detailAddress}
      disabled={postCode.length <= 0} 
      onChange={(e) => {
        setDetailAddress(e.target.value);
      }}/>   

    { showPostModal &&
      <>
        <DaumPostModal>
        <S.CloseButton type='button' onClick={closePostcode}>&times;</S.CloseButton>
              <DaumPostcode
                  style={postCodeStyle}
                  onComplete={onCompletePost}
              ></DaumPostcode>
        </DaumPostModal>
        <DaumPostOverlay/>
      </>
    }
  </>
)}





  


