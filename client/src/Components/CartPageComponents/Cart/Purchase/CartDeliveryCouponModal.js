import * as MS from "../../../Modal/ModalStyle";
import styled from "styled-components";
import { useEffect, useState } from "react";

const CouponModalContainer = styled.div`
  display: flex;
  width: 700px;
  max-height: 90vh;
  padding: 0 30px;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255);
  overflow-y: scroll;
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

const ProductList = styled.ul`
  list-style: none;
  width: 100%;
  border-top: 1px solid rgb(80, 80, 80);
  padding: 40px 30px 20px;
  background-color: rgb(255, 250, 250);
  &>li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const ProductName = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  align-items: end;
  font-size: 15px;
  text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  color: rgb(40, 40, 40);
  p:first-child {
    margin-right: 5px;
  }
  span {
    font-size: 14px;
    color: rgb(150, 150, 150);
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
    transition: all 400ms;
  }
`;

const CouponSelectBar = styled.div`
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  background-color: rgb(255, 255, 255);
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
  span {
    b {
      margin-left: 10px;
      font-size: 13px;
      color: rgba(250, 50, 50, 0.8);
      font-weight: 400;
    }
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
    background-color: rgb(255, 255, 255);
    transition: all 400ms;
    display: flex;
    justify-content: left;
    span {
      margin-left: 10px;
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
    p {
      text-underline-offset: 3px;
      text-decoration: underline;
    }
  }
`;

const PriceCheck = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 80px;
  h3 {
    font-size: 18px;
    color: rgb(80, 80, 80);
    margin-bottom: 20px;
  }
`;

const PriceCheckBox = styled.div`
  border-top: 1px solid rgb(80, 80, 80);
  border-bottom: 1px solid rgb(220, 220, 220);
  padding: 40px 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: #191919;
      font-size: 14px;
      margin-bottom: 10px;
    }
    span:last-child {
      font-size: 15px;
      color: #e5362c;
    }
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    border: 1px solid rgb(120, 120, 120);
    background-color: rgb(120, 120, 120);
    color: rgb(250, 250, 250);
    span {
      margin-bottom: 3px;
    }
  }
  p:nth-child(2) {
    background-color: rgb(255, 255, 255);
    color: rgb(120, 120, 120);
  }
`;

const ButtonWrapper = styled.div`
  width: 30%;
  margin: 30px 0 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    padding: 10px 14px;
    color: rgb(40, 40, 40);
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(40, 40, 40);
    transition: all 400ms;
    cursor: pointer;
  }
  button:hover {
    background-color: rgb(40, 40, 40);
    color: rgb(255, 255, 255);
  }
  button:last-child {
    background-color: rgb(40, 40, 40);
    color: rgb(255, 255, 255);
  }
  button:last-child:hover {
    color: rgb(40, 40, 40);
    background-color: rgb(255, 255, 255);
  }
`;

export default function CartDeliveryCouponModal({ showDeliveryCouponModal, setShowDeliveryCouponModal, deliveryCouponInfo, deliveryPrice, setDeliveryPrice, setUsedDeliveryCoupon }) {
  const [selectedCouponInfo, setSelectedCouponInfo] = useState(0);
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [tempDeliveryCouponInfo, setTempDeliveryCouponInfo] = useState([]);

  useEffect(() => {
    const updatedTempDeliveryCouponInfo = [
      {
        coupons_name: "쿠폰 사용안함",
        coupons_discount_limit: 0,
        coupons_uid: 0,
        used: false,
        coupons_detail: "",
      },
      ...deliveryCouponInfo,
    ];
  
    // setTempDeliveryCouponInfo를 통해 상태 업데이트
    setTempDeliveryCouponInfo(updatedTempDeliveryCouponInfo);
  }, [deliveryCouponInfo]);

  function handleCouponApply() {

    if (selectedCouponInfo > 0) {
      let used = deliveryCouponInfo[selectedCouponInfo-1];
      setUsedDeliveryCoupon(used);
    } else {
      setUsedDeliveryCoupon({
        coupons_uid: 0, coupons_name: '쿠폰 사용안함', coupons_discount_limit: 0,
      })
    }
    setShowDeliveryCouponModal(false);
  };
  
  return (
    <>
    <MS.Overlay $showModal={showDeliveryCouponModal}/>
      <MS.HeaderModal $showModal={showDeliveryCouponModal}>
        <div className="modalHeader">
          <h2>배송 쿠폰 변경</h2>
          <MS.HeaderModalCloseBtn onClick={() => setShowDeliveryCouponModal(false)}>&times;</MS.HeaderModalCloseBtn>
        </div>
        <CouponModalContainer>
          <CouponModalHeader>
            <h3>배송비 할인 쿠폰 선택</h3>
          </CouponModalHeader>
          <ProductList>
            <li>
              <CouponSelectBar onClick={() => setIsOptionVisible(!isOptionVisible)}>
                  <span>
                    [{tempDeliveryCouponInfo && tempDeliveryCouponInfo.length > 0 && tempDeliveryCouponInfo[selectedCouponInfo].coupons_name}]&nbsp;
                    {tempDeliveryCouponInfo && tempDeliveryCouponInfo.length > 0 &&tempDeliveryCouponInfo[selectedCouponInfo].coupons_detail}
                    <b>-{tempDeliveryCouponInfo && tempDeliveryCouponInfo.length > 0 &&tempDeliveryCouponInfo[selectedCouponInfo].coupons_discount_limit.toLocaleString()}원</b>
                  </span>
                <span className="drop_down">{isOptionVisible? "▲" : "▼"}</span>
                <CouponOpionList $isShow={isOptionVisible}>
                  {tempDeliveryCouponInfo && tempDeliveryCouponInfo.length > 0 && tempDeliveryCouponInfo.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedCouponInfo(index)}
                        className={selectedCouponInfo == index? 'sel' : ''}
                      >
                        <p>[{item.coupons_name}]&nbsp;{item.coupons_detail}</p>
                        <span>-{item.coupons_discount_limit.toLocaleString()}원</span>
                      </li>
                    
                  ))}
                </CouponOpionList>
              </CouponSelectBar>
            </li>
          </ProductList>
          <ButtonWrapper>
            <button onClick={() => setShowDeliveryCouponModal(false)}>취소</button>
            <button onClick={handleCouponApply}>쿠폰 적용</button>
          </ButtonWrapper>
        </CouponModalContainer>
      </MS.HeaderModal>
    </>
  )
}
