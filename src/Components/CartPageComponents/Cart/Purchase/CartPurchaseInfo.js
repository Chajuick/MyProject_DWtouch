import styled from "styled-components"
import { useEffect, useState } from "react"
import { Icon } from '@iconify/react';
import AddressInput from "../../../InputComponents/AddressInput";
import * as MS from "../../../Modal/ModalStyle";
import { OptionConvert } from "../../OptionConverter";
import { CategoryConvert } from "../../CategoryConverter";
import NaverPay from '../../../../assets/payment/naver_pay.png';
import KaKaoPay from '../../../../assets/payment/kakao_pay.png';
import Toss from '../../../../assets/payment/toss.png';

const Container = styled.div`
  width: calc(66%);
  color: rgb(40, 40, 40);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(80, 80, 80);
`;

const Title = styled.div`
  h3 {
    font-size: 17px;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  span {
    transition: all 400ms;
    opacity: ${props => props.$sel? 0 : 1};
    visibility: ${props => props.$sel? 'hidden' : 'visible'};
    display: flex;
    align-items: center;
    font-size: 13px;
    color: rgb(150, 150, 150);
    margin-left: 5px;
    svg {
      transition: all 400ms;
      color: rgb(100, 100, 100);
    }
  }
  span:last-child {
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  transition: max-height 800ms, opacity 800ms;
  max-height: ${props => props.$sel ? '1000px' : '0' };
  opacity: ${props => props.$sel ? '1' : '0' };
  overflow: hidden;
`;

const SubTitle = styled.div`
  margin-top: 30px;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  border-bottom: 1px solid rgb(220, 220, 220);
  &:nth-child(2) {
    border-top: 1px solid rgb(220, 220, 220);
  }
  p {
    width: 100px;
    font-size: 15px;
    color: rgb(80, 80, 80);
  }
  &.must p::after {
    content: ' *';
    color: orange;
  }
  input {
    padding: 10px;
    border: 1px solid rgb(200, 200, 200);
    background-color: rgb(250, 250, 250);
    box-shadow: 0 0 2px rgba(40, 40, 40, 0);
    transition: all 400ms;
  }
  input.postCodeInput {
    width: 80px;
  }
  button.postCodeSearchBtn {
    margin-left: 10px;
    margin-right: 300px;
    padding: 10px;
    border: 1px solid rgb(180, 180, 180);
    color: rgb(100, 100 ,100);
    background: none;
    transition: all 400ms;
  }
  button.postCodeSearchBtn:hover {
    cursor: pointer;
    border: 1px solid rgb(60, 60, 60);
    color: rgb(40 ,40, 40);
  }
  input.addressInput {
    width: 400px;
    margin-left: 100px;
    margin-top: 10px;
  }
  input:focus {
    outline: none;
    box-shadow: 0 0 2px rgba(40, 40, 40, 0.5);
  }
  span.addMes {
    margin-left: 10px;
    font-size: 13px;
    color: rgb(150, 150, 150);
    b {
      font-weight: 400;
      color: rgb(80, 80, 80);
    }
  }
  input.right {
    text-align: right;
    color: rgb(100, 100, 100);
  }
`;

const InputDiv = styled.div`
  font-size: 14px;
  color: rgb(120, 120, 120);
  width: 198px;
  padding: 10px;
  border: 1px solid rgb(200, 200, 200);
  background-color: rgb(250, 250, 250);
  box-shadow: 0 0 2px rgba(40, 40, 40, 0);
  text-align: right;
`;

const InputBtn = styled.button`
  padding: 10px;
  border: 1px solid rgb(180, 180, 180);
  background: none;
  color: rgb(120, 120, 120);
  margin-left: 10px;
  transition: all 400ms;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  &:hover {
    cursor: pointer;
    border: 1px solid rgb(80, 80, 80);
    color: rgb(40, 40, 40);
  }
`;

const UnderBoxGuider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
  span {
    font-size: 13px;
    color: rgb(150, 150, 150);
  }
  span:last-child {
    color: rgba(250, 50, 50, 0.8);
  }
`;

const NextBtn = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 20px;
  button {
    padding: 10px 25px;
    border: 1px solid rgb(80, 80, 80);
    background-color: rgb(80, 80, 80);
    color: rgb(250, 250, 250);
    transition: all 400ms;
  }
  button:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(80, 80, 80);
  }
  span {
    transition: all 400ms;
    font-size: 14px;
    margin-right: 10px;
    color: ${props => props.$errColor};
    opacity: ${props => props.$isErr? 1 : 0};
    visibility: ${props => props.$isErr? 'visible' : 'hidden'};
  }
`;

const RadioInput = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 5px 0;
  label {
    margin-left: 5px;
    display: flex;
    align-items: center;
  }
  label:hover {
    cursor: pointer;
    input[type="radio"] {
      cursor: pointer;
      filter: contrast(120%);
    }
    span {
      text-decoration: underline;
    }
  }
  img {
    margin-left: 5px;
    height: 20px;
  }
  span {
    margin-left: 7px;
    color: rgb(100, 100, 100);
    font-size: 14px;
    text-underline-offset: 3px;
  }
  input[type="radio"]{
    vertical-align: middle;
    appearance: none;
    border-radius: 50%;
    border: 1px solid yellowgreen;
    width: 3px;
    height: 3px;
    background-color: white;
    box-shadow: inset 0 0 0 2px yellowgreen;
    transition: all 400ms;
  }
  input[type="radio"]:checked {
    box-shadow: inset 0 0 0 2px white;
    background-color: yellowgreen; 
  }
  input[type="radio"]:focus-visible {
    outline: max(2px, 0.1em) dotted rgb(150, 200, 50);
    outline-offset: max(2px, 0.1em);
  }
`;

export default function CartPurchaseInfo({ purchaseInfo, totalSaleAmount, totalPurchasePrice }) {
  // 모달
  const [showProductCouponModal, setShowProductCouponModal] = useState(false);
  const [selectedAria, setSelectedAria] = useState(0);
  const [err, setErr] = useState({
    errCondition: false,
    errColor: 'rgb(150, 150, 150)',
    errMes: '필수 항목들을 채워주세요.',
  });
  // 유저 정보
  const [orderName, setOrderName] = useState(sessionStorage.getItem('user_name') || '');
  const [orderPhoneNum, setOrderPhoneNum] = useState(sessionStorage.getItem('user_phonenum').replace(/-/g, '') || '');
  const [name, setName] = useState(sessionStorage.getItem('user_name') || '');
  const [phoneNum, setPhoneNum] = useState(sessionStorage.getItem('user_phonenum').replace(/-/g, '') || '');
  const [postCode, setPostCode] = useState(sessionStorage.getItem('user_postcode') || '');
  const [address, setAddress] = useState(sessionStorage.getItem('user_address') || '');
  const [detailAddress, setDetailAddress] = useState(sessionStorage.getItem('user_detail_addres') || '');
  const [deliveryMes, setDeliveryMes] = useState('');
  // 결제 정보
  const [payment, setPayment] = useState(localStorage.getItem('payment') || '');
  // 포인트 및 배송료
  const [userPoints, setUserPoints] = useState(sessionStorage.getItem('user_points') || 0);
  const [remainPoints, setRemainPoints] = useState(sessionStorage.getItem('user_points') || 0);
  const [usingPoints, setUsingPoints] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(3000);

  useEffect(() => {
    setRemainPoints(userPoints - usingPoints);
    if (usingPoints.length === 0) {
      setUsingPoints(0);
    } 
    if (parseInt(usingPoints) > parseInt(userPoints)) {
      setUsingPoints(userPoints);
    }
  }, [usingPoints]);

  useEffect(() => {
    if (totalPurchasePrice >= 50000) {
      setDeliveryPrice(0);
    }
  }, [totalPurchasePrice]);

  // 포인트 입력
  function handleUsingPointInput(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '')
    setUsingPoints(event.target.value);
  }

  // 진행 단계 바꾸기
  function handleChangeStatus(num) {
    if (selectedAria === 0) {
      // must 클래스가 적용된 모든 input 요소를 선택
      const mustInputs = document.querySelectorAll('.must input');
  
      // 입력 필드 중에서 값이 비어있는 것이 있는지 확인
      const hasEmptyInput = Array.from(mustInputs).some(input => input.value.trim() === '');
  
      if (hasEmptyInput) {
        // 입력 필드 중에서 값이 비어있는 것이 있으면 에러 상태 설정
        setErr({
          errCondition: true,
          errColor: 'red',
          errMes: '필수 항목들을 채워주세요.',
        });
  
        // 값이 비어있는 input 요소에 box-shadow를 red로 설정
        mustInputs.forEach(input => {
          if (input.value.trim() === '') {
            input.style.boxShadow = '0 0 3px rgba(255, 0, 0, 0.8)';
          }
        });
      } else {
        setSelectedAria(1);

        // 모든 input 요소의 box-shadow 초기화
        mustInputs.forEach(input => {
          input.style.boxShadow = '0 0 2px rgba(40, 40, 40, 0)';
        });
      }
    } else {
      setSelectedAria(num);
    }
  };

  // 다음 버튼 enter 이벤트
  function handleEnterNextBtn(num) {
    if (num === 1) {
      // must 클래스가 적용된 모든 input 요소를 선택
      const mustInputs = document.querySelectorAll('.must input');
  
      // 입력 필드 중에서 값이 비어있는 것이 있는지 확인
      const hasEmptyInput = Array.from(mustInputs).some(input => input.value.trim() === '');
  
      if (hasEmptyInput) {
        // 입력 필드 중에서 값이 비어있는 것이 있으면 에러 상태 설정
        setErr({
          errCondition: true,
          errColor: 'red',
          errMes: '필수 항목들을 채워주세요.',
        });
  
        // 값이 비어있는 input 요소에 box-shadow를 red로 설정
        mustInputs.forEach(input => {
          if (input.value.trim() === '') {
            input.style.boxShadow = '0 0 3px rgba(255, 0, 0, 0.8)';
          }
        });
      } else {
        // 값이 비어있는 것이 없으면 에러 상태 초기화
        setErr({
          errCondition: false,
          errColor: 'rgb(150, 150, 150)',
          errMes: '필수 항목들을 채워주세요.',
        });
  
        // 모든 input 요소의 box-shadow 초기화
        mustInputs.forEach(input => {
          input.style.boxShadow = '0 0 2px rgba(40, 40, 40, 0)';
        });
      }
    }
  }

  // 다음 버튼 leave 이벤트
  function handleLeaveNextBtn() {
    setErr({
      errCondition: false,
      errColor: 'rgb(150, 150, 150)',
      errMes: '필수 항목들을 채워주세요.',
    });
  };

  return (
    <>
      <Container>
        <div>
          <Header>
            <Title>
              <h3>배송 정보</h3>
            </Title>
            <Detail $sel={selectedAria === 0}>
              <span>{name} / {phoneNum} / {address} {detailAddress}</span>
              <span onClick={() => setSelectedAria(0)}><Icon icon="iwwa:circumflex" rotate={2} /></span>
            </Detail>
          </Header>
          <MainContent $sel={selectedAria === 0}>
            <SubTitle>주문 정보</SubTitle>
            <InputBox className="must sel0">
              <p>이름</p>
              <input type="text" value={orderName} onChange={(e) => setOrderName(e.target.value)} placeholder="받으시는 분을 입력해주세요/"></input>
            </InputBox>
            <InputBox className="must sel0" >
              <p>연락처</p>
              <input type="text" value={orderPhoneNum} onChange={(e) => setOrderPhoneNum(e.target.value)} placeholder="연락 가능한 연락처를 입력해주세요 (-뺴고 숫자만)"></input>
            </InputBox>
          </MainContent>
          <MainContent $sel={selectedAria === 0}>
            <SubTitle>배송지 정보</SubTitle>
            <InputBox className="must sel0">
              <p>받으시는 분</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="받으시는 분을 입력해주세요/"></input>
            </InputBox>
            <InputBox className="must sel0">
              <p>연락처</p>
              <input type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} placeholder="연락 가능한 연락처를 입력해주세요 (-뺴고 숫자만)"></input>
            </InputBox>
            <InputBox className="must sel0">
              <p>주소</p>
              <AddressInput 
                postCode={postCode}
                setPostCode={setPostCode}
                address={address}
                setAddress={setAddress}
                detailAddress={detailAddress}
                setDetailAddress={setDetailAddress}
              />
            </InputBox>
            <InputBox>
              <p>배송 메시지</p>
              <input type="text" value={deliveryMes} onChange={(e) => setDeliveryMes(e.target.value)} placeholder="배송 메시지를 입력해주세요."/>
            </InputBox>
            <NextBtn $isErr={err.errCondition} $errColor={err.errColor}>
              <span>{err.errMes}</span>
              <button onClick={() => handleChangeStatus(1)} onMouseEnter={() => handleEnterNextBtn(1)} onMouseLeave={handleLeaveNextBtn}>다음</button>
            </NextBtn>
          </MainContent>
        </div>
        <div>
          <Header>
              <Title>
                <h3>할인·배송비</h3>
              </Title>
              <Detail $sel={selectedAria === 1}>
                <span>사용가능한 쿠폰을 확인해보세요.</span>
                <span onClick={() => handleChangeStatus(1)}><Icon icon="iwwa:circumflex" rotate={2} /></span>
              </Detail>
            </Header>
            <MainContent $sel={selectedAria === 1}>
              <InputBox>
                <p >할인 금액</p>
                <InputDiv style={{ color: 'rgba(250, 50, 50, 0.8)' }}>{totalSaleAmount.toLocaleString()}원</InputDiv>
                <InputBtn onClick={() => setShowProductCouponModal(true)}>쿠폰 변경</InputBtn>
                <span className="addMes">(사용 쿠폰 <b>{}장</b> / 사용 가능 쿠폰 <b>{}장</b>)</span>
              </InputBox>
              <InputBox>
                <p >포인트</p>
                <input type="text" className="right" value={usingPoints} onChange={(e) => setUsingPoints(e.target.value)} onInput={handleUsingPointInput}></input>
                <InputBtn onClick={() => setUsingPoints(userPoints)} disabled={userPoints == 0}>전액 사용</InputBtn>
                <span className="addMes">(보유 포인트 <b>{parseInt(remainPoints) > 0? remainPoints : 0}</b>)</span>
              </InputBox>
              <InputBox>
                <p>배송비</p>
                <InputDiv>{deliveryPrice.toLocaleString()}원</InputDiv>
                <InputBtn disabled={deliveryPrice == 0}>쿠폰 변경</InputBtn>
                <span className="addMes">(사용 쿠폰 <b>0장</b> / 사용 가능 쿠폰 <b>0장</b>)</span>
              </InputBox>
              <UnderBoxGuider>
                <Icon icon="tabler:alert-circle" color="rgba(250, 50, 50, 0.8)"/>
                <span>&nbsp;기본배송비는 3,000원 이며,</span>
                <span> 총 결제 금액이 50,000원 이상일 경우 무료배송입니다.</span>
              </UnderBoxGuider>
            </MainContent>
        </div>
        <div>
          <Header>
            <Title>
              <h3>결제 수단</h3>
            </Title>
            <Detail $sel={selectedAria === 2}>
              <span>{payment}</span>
              <span onClick={() => handleChangeStatus(2)}><Icon icon="iwwa:circumflex" rotate={2} /></span>
            </Detail>
          </Header>
          <MainContent $sel={selectedAria === 2}>
            <InputBox>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='credit_card' 
                    checked={payment === 'credit_card'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>신용카드</span>
                </label>
              </RadioInput>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='bank_transfer' 
                      checked={payment === 'bank_transfer'}
                      onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>실시간 계좌이체</span>
                </label>
              </RadioInput>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='deposit_without_bank' 
                    checked={payment === 'deposit_without_bank'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>무통장 입금</span>
                </label>
              </RadioInput>
            </InputBox>
            <InputBox>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='phone' 
                    checked={payment === 'phone'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                <span>휴대폰 결제</span>
                </label>
              </RadioInput>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='giftcard' 
                    checked={payment === 'giftcard'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>상품권 결제</span>
                </label>
              </RadioInput>
            </InputBox>
            <InputBox>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='naver_pay' 
                    checked={payment === 'naver_pay'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <img src={NaverPay} alt="naver_pay" />
                </label>
              </RadioInput>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='kakao_pay' 
                    checked={payment === 'kakao_pay'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <img src={KaKaoPay} alt="kakao_pay" />
                </label>
              </RadioInput>
              <RadioInput>
                <label>
                  <input type='radio' name='payment' value='toss' 
                    checked={payment === 'toss'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <img src={Toss} alt="toss" />
                </label>
              </RadioInput>
            </InputBox>
          </MainContent>
        </div>
      </Container>
    </>
  )
};