import { useState } from 'react';
import styled from 'styled-components';
import * as MS from "../../../Modal/ModalStyle";

const Container = styled.div`
  width: calc(30%);
  &>p {
    font-size: 17px;
    color: rgb(40, 40, 40);
    font-weight: bold;
    padding-bottom: 15px;
  }
`;

const PriceInfoBox = styled.div`
  border: ${props => props.$isActive? "1px solid #e8625a" : "1px solid rgb(210, 210, 210)"};
  border-bottom: none;
  padding: 40px 20px 30px 20px;
  color: rgb(40, 40, 40);
  &>ul {
    padding-top: 25px;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-size: 14px;
      }
    }
    li.red {
      color: #e5362c;
    }
  }
`;

const SumPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgb(150, 150, 150);
  span:last-child {
    color: #e5362c;
  }
`;

const Terms = styled.div`
  padding: 40px 20px;
  border-left: ${props => props.$isActive? "1px solid #e8625a" : "1px solid rgb(210, 210, 210)"};
  border-right: ${props => props.$isActive? "1px solid #e8625a" : "1px solid rgb(210, 210, 210)"};
  background-color: rgb(245, 245, 245);
  border-top: 1px solid rgb(210, 210, 210);
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 13px;
  color: rgb(150, 150, 150);
  &>span {
    font-size: 12px;
    line-height: 1.5;
  }
`;

const TermsBox = styled.div`
  margin-top: 8px;
  margin-left: 8px;
  display: flex;
  justify-content: left;
  p.terms_detail {
    margin-left: 20px;
    text-underline-offset: 2px;
    text-decoration: underline;
    transition: all 400ms;
  }
  p.terms_detail:hover {
    cursor: pointer;
    color: rgb(80, 80, 80);
  }
  &.terms_main {
    margin-top: 10px;
    margin-left: 0;
    margin-bottom: 5px;
  }
  label {
    display: flex;
    align-items: center;
    input {
      position: relative;
      appearance: none;
      margin-right: 8px;
      width: 14px;
      height: 14px;
      border: 1px solid rgb(180, 180, 180);
      outline: none;
      transition: all 400ms;
    }
    input::after {
      content: "";
      position: absolute;
      top: 6px;
      left: 3px;
      width: 1px;
      height: 0;
      background-color: #e8625a;
      transform: rotate(-40deg);
      transition: height 150ms;
    }
    input::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 7px;
      width: 1px;
      height: 0;
      background-color: #e8625a;
      transform: rotate(-130deg);
      transition: height 150ms ease 150ms;
    }
    input:checked {
      border: 1px solid #e8625a;
    }
    input:checked::after {
      height: 4px;
    }
    input:checked::before {
      height: 8px;
    }
    span {
      text-underline-offset: 2px;
    }
    &:hover {
      cursor: pointer;
      input {
        cursor: pointer;
        box-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
      }
      input:checked {
        box-shadow: 0 0 1px #e8625a;
      }
      span {
        text-decoration: underline;
      }
    }
  }
`;

const PurchaseBtn = styled.button`
  width: 100%;
  padding: 15px 0;
  background-color: ${props => props.disabled? 'rgb(245, 245, 245)' : '#e8625a'};
  border: ${props => props.disabled? '1px solid rgb(210, 210, 210)' : '1px solid #e8625a'};
  font-size: 18px;
  color: ${props => props.disabled? '#ccc' : 'rgb(250, 250, 250)'};
  transition: all 400ms;
  pointer-events: ${props => props.disabled? 'none' : 'auto'};
  &:hover {
    background-color: rgb(250, 250, 250);
    color: #e8625a;
    cursor: pointer;
  }
`;

const PolicyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  ul {
    width: 400px;
    font-size: 15px;
    list-style: none;
    font-weight: 600;
    margin-bottom: 30px;
    color: rgb(40, 40, 40);
    li {
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 5px;
      color: rgb(120, 120, 120);
    }
    li:first-child {
      margin-top: 15px;
    }
  }
  button {
    padding: 10px 20px;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    transition: all 400ms;
  }
  button:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40, 40);
  }
`;

export default function CartPurchaseSection({ deliveryPrice, usingPoints, totalPurchasePrice, totalDefaultPrice, totalSaleAmount, endPaymentPrice, isFieldFinish, handlePurchase  }) {
  // 모달
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [termPersonal, setTermPersonal] = useState(false);
  const [termEvent, setTermEvent] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setTermPersonal(!selectAll);
    setTermEvent(!selectAll);
  };

  return (
    <>
      <Container>
        <p>최종 결제 금액 확인</p>
        <PriceInfoBox $isActive={termPersonal && isFieldFinish}>
          <SumPrice>
            <span>합계</span>
            <span>{endPaymentPrice}원</span>
          </SumPrice>
          <ul>
            <li>
              <span>상품 금액</span>
              <span>{totalDefaultPrice}원</span>
            </li>
            <li className="red">
              <span>할인 금액</span>
              <span>{totalSaleAmount}원</span>
            </li>
            <li className="red">
              <span>포인트</span>
              <span>-{usingPoints}P</span>
            </li>
            <li>
              <span>배송비</span>
              <span>{deliveryPrice}원</span>
            </li>
          </ul>
        </PriceInfoBox>
        <Terms $isActive={termPersonal && isFieldFinish}>
          <span>주문할 상품의 편집정보, 상품정보, 상품가격, 배송정보를 확인하였습니다.</span>
          <span>주문취소 및 수정은 결제 후 1시간 이내에만 가능합니다.</span>
          <TermsBox className="terms_main">
            <label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span>전체 선택</span> 
            </label>
          </TermsBox>
          <TermsBox>
            <label>
              <input
                type="checkbox"
                checked={termPersonal}
                onChange={() => setTermPersonal(!termPersonal)}
              />
              <span>개인정보 수집·이용 동의 (필수)</span>
            </label>
            <p className='terms_detail' onClick={() => setShowPolicyModal(true)}>약관보기</p>
          </TermsBox>
          <TermsBox>
            <label>
              <input
                type="checkbox"
                checked={termEvent}
                onChange={() => setTermEvent(!termEvent)}
              />
              <span>이벤트, 할인쿠폰 등 혜택 제공을 위한 수신 동의 (선택)</span>
            </label>
          </TermsBox>
        </Terms>
        <PurchaseBtn disabled={!termPersonal || !isFieldFinish} onClick={() => handlePurchase(termEvent)}>결제하기</PurchaseBtn>
      </Container>
      <MS.Overlay $showModal={showPolicyModal}/>
      <MS.HeaderModal $showModal={showPolicyModal}>
        <div className="modalHeader">
          <h2>개인정보 수집·이용 동의</h2>
          <MS.HeaderModalCloseBtn onClick={() => setShowPolicyModal(false)}>&times;</MS.HeaderModalCloseBtn>
        </div>
        <PolicyContent>
          <ul>[목적]
            <li>· 상품 결제/환불 서비스 제공, 주문/배송/거래 내역 조회 서비스 제공</li>
            <li>· 상품과 경품 배송을 위한 배송지 확인 등</li>
          </ul>
          <ul>[항목]
            <li>· 주문 정보 (ID,이름, 휴대전화번호, 이메일)</li>
            <li>· 상품 수령인 정보 (이름, 배송지 주소, 배송지 연락처)</li>
            <li>· 결제수단</li>
          </ul>
          <ul>[보유기간]
            <li>· 개인정보 이용목적 달성 시까지 보관</li>
          </ul>
          <button onClick={() => setShowPolicyModal(false)}>확인</button>
        </PolicyContent>
      </MS.HeaderModal>
    </>
  )
};