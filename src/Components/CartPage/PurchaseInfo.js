import styled from "styled-components"
import { useEffect, useState } from "react"
import { Icon } from '@iconify/react';
import AddressInput from "../AcountManagement/AddressInput";
import * as MS from "../Modal/ModalStyle";
import { OptionConvert } from "./OptionConverter";
import { CategoryConvert } from "./CategoryConverter";
import NaverPay from '../../assets/payment/naver_pay.png';
import KaKaoPay from '../../assets/payment/kakao_pay.png';
import Toss from '../../assets/payment/toss.png';

const Container = styled.div`
  width: calc(68%);

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

const CouponModalContainer = styled.div`
  display: flex;
  width: 700px;
  padding: 0 30px;
  flex-direction: column;
  align-items: center;
`;

const CouponModalHeader = styled.div`
  margin-top: 40px;
  width: 100%;
  margin-bottom: 20px;
  h3 {
    font-size: 18px;
    color: rgb(80, 80, 80);
  }
`;

const CouponList = styled.ul`
  list-style: none;
  width: 100%;
  border-top: 1px solid rgb(80, 80, 80);
  padding: 40px 30px;
  background-color: rgb(248, 245, 245);
  &>li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const ProductInfos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const ProductName = styled.p`
  display: flex;
  justify-content: left;
  flex-direction: row;
  font-size: 15px;
  text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  color: rgb(40, 40, 40);
  p:first-child {
    margin-right: 5px;
  }
`;

const CouponSelectBar = styled.div`
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(200, 200, 200);
  position: relative;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(80, 80, 80);
  transition: all 400ms;
  span.drop_down {
    padding: 4px;
    font-size: 10px;
    
  }
  &:hover {
    cursor: pointer;
    color: rgb(120, 120, 120);
  }
`;

const CouponOpionList = styled.ul`
  width: 100%;
  list-style: none;
  border: 1px solid rgb(150, 150, 150);
  overflow: hidden;
  position: absolute;
  max-height: ${props => props.$isShow? '2000px' : '0' };
  opacity: ${props => props.$isShow? 1 : 0 };
  transition: all 400ms;
  top: 45px;
  right: 0;
  z-index: 110000;
  li {
    width: 100%;
    font-size: 14px;
    color: rgb(120, 120, 120);
    padding: 10px;
    border-top: 1px solid rgb(200, 200, 200);
    background-color: rgb(250, 250, 250);
    transition: all 400ms;
    span {
      color: rgba(250, 50, 50, 0.8);
      font-size: 13px;
    }
  }
  li:first-child {
    border: none;
  }
  li.sel {
    color: rgb(40, 40, 40);
    text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  }
  li:hover {
    color: rgb(80, 80, 80);
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;
    span {
    }
  }
`;

const ProductPrice = styled.p`
  del {
    font-size: 12px;
    color: rgb(150, 150, 150);
  }
  span {
    margin-left: 8px;
    font-size: 14px;
    color: rgba(250, 50, 50, 1);
  }
`;

const RadioInput = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  label {
    display: flex;
    align-items: center;
  }
  img {
    margin-left: 5px;
    height: 20px;
  }
  span {
    margin-left: 7px;
    color: rgb(100, 100, 100);
    font-size: 14px;
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
`;

export default function PurchaseInfo({ totalPriceInfo, setTotalPriceInfo, purchasePriceInfo, setPurchasePriceInfo, purchaseListInfo }) {
  const [selectedAria, setSelectedAria] = useState(1);
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
  // 할인 포인트 쿠폰 정보
  const [userPoints, setUserPoints] = useState(sessionStorage.getItem('user_points') || 0);
  const [remainPoints, setRemainPoints] = useState(sessionStorage.getItem('user_points') || 0);
  const [usingPoints, setUsingPoints] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(3000);
  const [userCouponInfo, setUserCouponInfo] = useState([]);
  const [couponInfo, setCouponInfo] = useState([]);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [selectedCouponInfo, setSelectedCouponInfo] = useState([]);
  const [usableCouponArr, setUsableCouponArr] = useState([]);
  const [visibleCouponInfo, setVisibleCouponInfo] = useState(-1);
  const [updatedPriceInfo, setUpdatedPriceInfo] = useState([]);
  // 결제 정보
  const [payment, setPayment] = useState(localStorage.getItem('payment') || '');

  const [] = useState();
  // 모달
  const [showProductCouponModal, setShowProductCouponModal] = useState(false);

  useEffect(() => {
    const zeroArray = new Array(purchaseListInfo.length).fill(-1);
    setSelectedCouponInfo(zeroArray);
  }, [purchaseListInfo]);

  function handleSelectCouponIndex(index, couponIndex) {
    // selectedCouponInfo 배열의 복사본을 만들어 수정
    const updatedselectedCouponInfo = [...selectedCouponInfo];
    // 주어진 index 위치의 값을 couponIndex로 업데이트
    updatedselectedCouponInfo[index] = couponIndex;
    // 업데이트된 배열을 상태로 설정
    setSelectedCouponInfo(updatedselectedCouponInfo);
  }

  // 유저 쿠폰 정보 받아오기
  function loadUserCouponInfo() {
    // 서버의 주소에 맞게 수정
    const userUid = sessionStorage.getItem('user_uid' || 0);
    // 서버로 POST 요청 보내기
    fetch('http://localhost:3001/api/coupon-point/user-coupon-loading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userUid }),
    })
      .then(response => response.json())
      .then(data => {
        setUserCouponInfo(data.userCouponInfo);
        setCouponInfo(data.couponsInfo);
        setIsCouponLoading(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    loadUserCouponInfo();
  },[isCouponLoading]);

  // 포인트
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
    if (totalPriceInfo.price >= 50000) {
      setDeliveryPrice(0);
    }
  }, [totalPriceInfo]);

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

  function productCoupon(num) {
    // 주어진 num과 일치하는 행들
    const matchingRows = couponInfo.filter(item => item[0].coupons_product_category == num);
    // coupon_product_category가 1인 행들
    const categoryOneRows = couponInfo.filter(item => item[0].coupons_product_category == 1);
    // 두 결과를 합쳐서 리턴
    return matchingRows.concat(categoryOneRows);
  }

  useEffect(() => {
    // purchaseListInfo 배열에서 cart_product_name만 추출하여 새로운 배열 생성
    const productNames = purchaseListInfo.map(item => item.cart_product_name);
    // 각각의 cart_product_name에 대해 productCoupon 함수 호출하여 결과 배열 생성
    const resultArray = productNames.map(productName => productCoupon(CategoryConvert(productName)));
    setUsableCouponArr(resultArray);
  }, [purchaseListInfo, couponInfo]);

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

  function handleToggleSelectBar(index) {
    if (visibleCouponInfo === index) {
      setVisibleCouponInfo(-1);
    } else {
      setVisibleCouponInfo(index);
    }
  }

  function calculateDiscountAmount(price, percent, amount) {
    let saleAmount = 0;
    if (percent > 0) {
      saleAmount = price - parseInt((price*((100 - percent)/100))/ 10)* 10;
      if (amount > 0) {
        saleAmount = Math.min(saleAmount, amount);
      } 
    } else if (amount > 0) {
      saleAmount = amount;
    }
    return saleAmount;
  };

  function updatePriceInfo() {
    // purchaseListInfo에 대한 가격 정보를 업데이트
    const updatedListInfo = purchaseListInfo.map(item => {
      const defaultPrice = item.cart_default_price || 0;
      const productQuantity = item.cart_product_quantity || 1;
      const saleInfo = item.cart_sale_info || 0;
      return {
        default_price: defaultPrice,
        final_price: parseInt(((defaultPrice * productQuantity) * ((100 - saleInfo) / 100)) / 10) * 10,
      };
    });
    // 업데이트된 정보를 상태로 설정
    setUpdatedPriceInfo(updatedListInfo);
  }

  useEffect(() => {
    updatePriceInfo();
  }, [purchaseListInfo]);

  console.log(selectedAria);

  return (
    <>
      <Container>
        <div>
          <Header>
            <Title>
              <h3 onClick={loadUserCouponInfo}>배송 정보</h3>
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
                <InputDiv style={{ color: 'rgba(250, 50, 50, 0.8)' }}>-{totalPriceInfo.saleAmount.toLocaleString()}원</InputDiv>
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
                  <input type='radio' name='payment' value='credit_card' 
                    checked={payment === 'credit_card'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </label>
                <span>휴대폰 결제</span>
              </RadioInput>
              <RadioInput><label><input type='radio' name='payment' value='bank_transfer' 
                checked={payment === 'bank_transfer'}
                onChange={(e) => setPayment(e.target.value)}
              />
                <span>상품권 결제</span></label>
              </RadioInput>
            </InputBox>
            <InputBox>
              <RadioInput><label><input type='radio' name='payment' value='credit_card' 
                checked={payment === 'credit_card'}
                onChange={(e) => setPayment(e.target.value)}
              />
                <img src={NaverPay} alt="naver_pay" /></label>
              </RadioInput>
              <RadioInput><label><input type='radio' name='payment' value='bank_transfer' 
                checked={payment === 'bank_transfer'}
                onChange={(e) => setPayment(e.target.value)}
              />
                <img src={KaKaoPay} alt="kakao_pay" /></label>
              </RadioInput>
              <RadioInput><label><input type='radio' name='payment' value='bank_transfer' 
                checked={payment === 'bank_transfer'}
                onChange={(e) => setPayment(e.target.value)}
              />
                <img src={Toss} alt="toss" /></label>
              </RadioInput>
            </InputBox>
          </MainContent>
        </div>
      </Container>
      <MS.Overlay $showModal={showProductCouponModal}/>
      <MS.HeaderModal $showModal={showProductCouponModal}>
        <div className="modalHeader">
          <h2>쿠폰 변경</h2>
          <MS.HeaderModalCloseBtn onClick={() => setShowProductCouponModal(false)}>&times;</MS.HeaderModalCloseBtn>
        </div>
        <CouponModalContainer>
          <CouponModalHeader>
            <h3>상품할인</h3>
          </CouponModalHeader>
          <CouponList>
            {purchaseListInfo.map((item, index) => (
              <li key={index}>
                <ProductInfos>
                  <ProductName>
                  <p>{item.cart_product_name}</p>
                {item.cart_option.length > 0 && OptionConvert(item.cart_product_name, item.cart_option).map((optionItem, index) => (
                  <p key={index}>{index === 0 ? optionItem : "-" + optionItem}</p>
                ))
                }
                </ProductName>
                <ProductPrice>
                  <del>{updatedPriceInfo && updatedPriceInfo.length > 0 && (updatedPriceInfo[index].default_price).toLocaleString()}원</del>
                  <span>{updatedPriceInfo && updatedPriceInfo.length > 0 && (updatedPriceInfo[index].final_price).toLocaleString()}원</span>
                </ProductPrice>
                </ProductInfos>
                <CouponSelectBar onClick={() => handleToggleSelectBar(index)}>
                  {usableCouponArr && usableCouponArr.length > 0 && selectedCouponInfo && selectedCouponInfo.length > 0 && 
                  usableCouponArr[index] && usableCouponArr[index][selectedCouponInfo[index]] && 
                  usableCouponArr[index][selectedCouponInfo[index]][0] && selectedCouponInfo[index] !== -1? (
                    <>
                      <span>
                        [{usableCouponArr[index][selectedCouponInfo[index]][0].coupons_name}]&nbsp;
                        {usableCouponArr[index][selectedCouponInfo[index]][0].coupons_detail}
                      </span>
                      <span className="drop_down">
                        ▼
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        [기본할인] 멤버쉽등급 / 상품 기본 할인
                      </span>
                      <span className="drop_down">
                        ▼
                      </span>
                    </>
                  )}
                  {

                  }
                  <CouponOpionList $isShow={visibleCouponInfo === index}>
                    <li onClick={() => handleSelectCouponIndex(index, -1)}>
                      [기본할인] 멤버쉽등급 / 상품 기본 할인&nbsp;
                      <span>
                      -{calculateDiscountAmount(item.cart_default_price*item.cart_product_quantity, item.cart_sale_info, undefined).toLocaleString()}원
                      </span>
                    </li>
                  {usableCouponArr && usableCouponArr.length > 0 && selectedCouponInfo && selectedCouponInfo.length > 0 &&
                  usableCouponArr[index].map((couponItem, couponIndex) => (
                    <li key={couponIndex} onClick={() => handleSelectCouponIndex(index, couponIndex)}
                    className={selectedCouponInfo[index] == couponIndex? 'sel' : ''}
                    >
                    {couponItem && couponItem[0] && (
                      <>
                        [{couponItem[0].coupons_name}]&nbsp;{couponItem[0].coupons_detail}&nbsp;
                        <span>
                          -{calculateDiscountAmount(item.cart_default_price*item.cart_product_quantity, couponItem[0].coupons_discount_amount, couponItem[0].coupons_discount_limit).toLocaleString()}원
                        </span>
                      </>
                    )}
                    </li>
                  ))}
                  </CouponOpionList>
                </CouponSelectBar>
              </li>
            ))}
          </CouponList>
        </CouponModalContainer>
      </MS.HeaderModal>
    </>
  )
};