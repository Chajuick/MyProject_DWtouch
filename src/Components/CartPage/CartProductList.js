import styled from "styled-components";
import { Icon } from '@iconify/react';
import { OptionConvert } from "./OptionConverter";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ControlBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 1200px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 12px 0;
    background-color: rgb(245, 245, 245);
  }
  div:nth-child(2) {
    width: calc( 60% );
  }
  div:nth-child(3) {
    width: calc( 10% );
  }
  div:nth-child(4) {
    width: calc( 15% );
  }
  div:nth-child(5) {
    width: calc( 10% );
  }
`;

const CheckBtn = styled.div`
  width: calc( 5% );
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 20px;
    height: 20px;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(180, 180, 180);
    box-shadow: 0 0 1px rgba(255, 165, 0, 0);
    color: rgb(255, 55, 0);
    transition: all 400ms;
    cursor: pointer;
    svg {
      transition: all 400ms;
      margin-left: 1.5px;
      margin-top: 1px;
      opacity: 0;
    }
  }
  span:hover {
    box-shadow: 0 0 2px rgb(255, 165, 0);
    color: rgb(255, 105, 0);
  }
  &.sel {
    span {
      border: 1px solid rgb(255, 165, 0);
    }
    svg {
      opacity: 1;
    }
  }
`;

const ProdcutList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgb(220, 220, 220);
`;

const OrderInfo = styled.div`
  width: calc( 60% );
  display: flex;
  flex-direction: row;
  align-items: center;
  &>figure {
    width: 200px;
    height: 200px;
    background-color: rgb(240, 240, 240);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
      height: 50%;
      filter: drop-shadow(4px 4px 4px rgba(40, 40, 40, 0.4));
    }
  }
`;

const CartProductInfo = styled.div`
  width: 1200px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 30px 0;
  &>p{
    width: calc( 10% );
    text-align: center;
    font-size: 15px;
    color: rgba(250, 50, 50, 0.8);
  }
`;

const ProductInfo = styled.div`
  margin-left: 20px;
  color: rgb(40, 40, 40);
  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 16px;
    color: rgb(80, 80, 80);
  }
  p {
    font-size: 15px;
  }
  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

const PriceInfo = styled.div`
  width: calc( 10% );
  text-align: center;
  font-size: 15px;
  color: rgb(80, 80, 80);
`;

const NumModify = styled.div`
  width: calc( 15% );
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  div {
    border: 1px solid rgb(200, 200, 200);
    display: flex;
    flex-direction: row;
  }
  span {
    width: 30px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span.modifiter {
    transition: all 400ms;
  }
  span.modifiter:hover {
    cursor: pointer;
    color: rgb(150, 150, 150);
  }
`;

const CartModifyBar = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid rgb(220, 220, 220);
  p {
    font-size: 14px;
    color: rgb(150, 150, 150);
    transition: all 400ms;
  }
  p:first-child:hover {
    cursor: pointer;
    color: rgb(80, 80, 80);
  }
`;

function formattedDate(serverDateStr) {
  const utcDate = new Date(serverDateStr);
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0];
};

export default function CartProductList({ cartInfo, setCartInfo, selectedInfo, setSelectedInfo }) {
  const [modifyCol, setModifyCol] = useState(false);
  const [checkCol, setCheckCol] = useState(false);

  // 상단 전체 선택 체크 버튼 클릭 시 실행될 함수
  function handleToggleAllCheck() {
    if (!checkCol) {
      setCheckCol(true);
      setSelectedInfo(prevSelectedInfo => {
        const allSelected = prevSelectedInfo.every(val => val === 1);
        const newSelectedInfo = prevSelectedInfo.map(() => (allSelected ? 0 : 1));
        return newSelectedInfo;
      });
    }
  }

  function handleQuantity(num, quantity, index) {
    if (!modifyCol) {
      setModifyCol(true);
      setCartInfo((prevCartInfo) => {
        const updatedCartInfo = [...prevCartInfo];
        // num이 0이고 현재 수량(quantity)이 2보다 크면 1 감소
        if (num === 0 && quantity > 1) {
          updatedCartInfo[index].cart_product_quantity -= 1;
        } 
        // num이 1이고 현재 수량(quantity)이 5보다 작으면 1 증가
        else if (num === 1 && quantity < 5) {
          updatedCartInfo[index].cart_product_quantity += 1;
        }
        return updatedCartInfo;
      });
    }
  }

  useEffect(() => {
    if (modifyCol) {
      const cooldownTimeout = setTimeout(() => {
        setModifyCol(false);
      }, 200); // 200ms초 동안 쿨다운
      return () => clearTimeout(cooldownTimeout);
    }
  }, [modifyCol]);

  function handleToggleCheck(index) {
    if (!checkCol) {
      setCheckCol(true);
      setSelectedInfo(prevSelectedInfo => {
        const newSelectedInfo = [...prevSelectedInfo];
        newSelectedInfo[index] = newSelectedInfo[index] === 1 ? 0 : 1;
        return newSelectedInfo;
      });
    }
  }
  
  useEffect(() => {
    if (checkCol) {
      const cooldownTimeout = setTimeout(() => {
        setCheckCol(false);
      }, 200); // 200ms초 동안 쿨다운
      return () => clearTimeout(cooldownTimeout);
    }
  }, [checkCol]);

  return (
    <>
      <Container>
        <ControlBar>
          <CheckBtn className={selectedInfo.some((val) => val === 0) ? '' : 'sel'}
          onClick={handleToggleAllCheck}><span><Icon icon="heroicons-solid:check" /></span></CheckBtn>
          <div>주문 상품 정보</div>
          <div>상품 금액</div>
          <div>수량</div>
          <div>주문금액</div>
        </ControlBar>
        <ProdcutList>
          {cartInfo && cartInfo.length > 0 && cartInfo.map((item, index) => (
            <>
              <ProductListContainer key={index}>
                <CartProductInfo>
                  <CheckBtn className={selectedInfo.length > 0 && selectedInfo[index] === 1? 'sel' : ''} 
                  onClick={() => handleToggleCheck(index)}
                  ><span><Icon icon="heroicons-solid:check" /></span></CheckBtn>
                  <OrderInfo>
                    <figure>
                        <img src={item.cart_thumbnail} alt={item.cart_product_name} />
                    </figure>
                    <ProductInfo>
                      <h2>{item.cart_product_name}</h2>
                      <div>
                        {OptionConvert(item.cart_product_name, item.cart_option).map((item, index) => (
                          <p key={index}>{index === 0? item : "-" +item}</p>
                        ))}
                      </div>
                      <h3>프로젝트명 : {item.cart_name}</h3>
                    </ProductInfo>
                  </OrderInfo>
                  <PriceInfo>
                    <span>{item.cart_price}원</span>
                  </PriceInfo>
                  <NumModify>
                    <div>
                      <span className="modifiter" onClick={() => handleQuantity(0, item.cart_product_quantity, index)}>-</span>
                      <span>{item.cart_product_quantity}</span>
                      <span className="modifiter" onClick={() => handleQuantity(1, item.cart_product_quantity, index)}>+</span>
                    </div>
                  </NumModify>
                  <p>{item.cart_price*item.cart_product_quantity}원</p>
                </CartProductInfo>
                <CartModifyBar>
                  <p>편집하기</p>
                  <p>편집일 : {formattedDate(item.cart_create_date)}</p>
                </CartModifyBar>
              </ProductListContainer>
            </>
          ))}
        </ProdcutList>
      </Container>
    </>
  );
};