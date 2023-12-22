import styled from "styled-components";
import CartProductList from "./CartProductList";
import { useState, useEffect } from "react";
import * as MS from "../../../Modal/ModalStyle";

const CartControlBar = styled.div`
  width: 100vw;
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: rgba(250, 250, 250, 0.5);
  nav {
    margin: 0 auto;
    width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgb(230, 230, 230);
  }
`;

const SelecBar = styled.div`
  display: flex;
  justify-content: left;
  button {
    margin-right: 10px;
    padding: 8px;
    border: 1px solid rgb(150, 150, 150);
    background: rgb(250, 250, 250);
    color: rgb(150, 150, 150);
    box-shadow: 0 0 1px rgba(40, 40, 40, 0);
    transition: all 400ms;
  }
  button:hover {
    cursor: pointer;
    border: 1px solid rgb(40, 40, 40);
    color: rgb(40, 40, 40);
    box-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  } 
`;

const PurchaseBar = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  span {
    font-size: 12px;
    b {
      font-weight: 400;
      color: rgba(250, 50, 50, 0.8);
    }
  }
`;

const PurchaseBtn = styled.button`
  padding: 10px 20px;
  color: rgb(240, 240, 240);
  border: 1px solid rgb(80, 80, 80);
  border-radius: 20px;
  background-color: rgb(80, 80, 80);
  transition: all 400ms;
  margin-left: 10px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(80, 80, 80);
  }
`;

const Price = styled.p`
  font-size: 20px;
  color: rgba(250, 50, 50, 0.8);
  margin-left: 10px;
`;

const CautionList = styled.ul`
  list-style: none;
  margin: 80px 0 200px 0;
  color: rgb(80, 80, 80);
  font-size: 16px;
  width: 1200px;
  li {
    margin-top: 5px;
    color: rgb(150, 150, 150);
    font-size: 13px;
  }
  li.alert {
    margin-top: 20px;
    color: rgba(250, 0, 0, 0.8);
  }
`;

const AlertDel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  color: rgb(80, 80, 80);
  p {
    text-align: center;
    margin-bottom: 30px;
  }
`;

const ButtonWrapper = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  button {
    padding: 6px 18px;
    border: 1px solid rgb(80, 80, 80);
    transition: all 400ms;
    cursor: pointer;
  }
  button:first-child {
    background-color: rgb(250, 250, 250);
    color: rgb(80, 80, 80);
  }
  button:last-child {
    background-color: rgb(80, 80, 80);
    color: rgb(250, 250, 250);
  }
  button:first-child:hover {
    background-color: rgb(80, 80, 80);
    color: rgb(250, 250, 250);
  }
  button:last-child:hover {
    background-color: rgb(250, 250, 250);
    color: rgb(80, 80, 80);
  }
`;

export default function CartIndexPage({ setCurrentStatus, cartInfo, setCartInfo, handleDelCartInfo, selectedInfo, setSelectedInfo }) {
  // 모달
  const [showDelModal, setShowDelModal] = useState(false);

  // 체크
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  function handleAllCheck() {
    setSelectedInfo(prevSelectedInfo => {
      const newSelectedInfo = prevSelectedInfo.map(() => (1));
      return newSelectedInfo;
    });
  }
  function handleAllDeCheck() {
    setSelectedInfo(prevSelectedInfo => {
      const newSelectedInfo = prevSelectedInfo.map(() => (0));
      return newSelectedInfo;
    });
  }

  // 가격
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    if (cartInfo.length > 0) {
      const updatedCartInfo = cartInfo.map((item, index) => ({
        ...item,
        cart_final_price: selectedInfo[index] === 1 ? item.cart_price * item.cart_product_quantity : 0,
        cart_product_quantity: selectedInfo[index] === 1 ? item.cart_product_quantity : 0,
      }));
      const totalSum = updatedCartInfo.reduce((sum, item) => sum + item.cart_final_price, 0);
      const quantitySum = updatedCartInfo.reduce((sum, item) => sum + item.cart_product_quantity, 0);
      setSumPrice(totalSum);
      setSelectedQuantity(quantitySum);
    }
  }, [cartInfo, selectedInfo]);

  // 다음 단계
  function handleAddToPurchase() {
    if (selectedQuantity > 0) {
      setCurrentStatus(1);
      window.scrollTo({
        top: 105,
        behavior: 'smooth', 
      });
    }
  }



  return (
    <>
      <CartControlBar>
        <nav>
          <SelecBar>
            <button onClick={handleAllCheck}>전체 선택</button>
            <button onClick={handleAllDeCheck}>선택 해제</button>
            <button onClick={() => setShowDelModal(true)}>삭제</button>
          </SelecBar>
          <PurchaseBar>
            <span>결제 예정 금액(<b>{selectedQuantity}</b>)</span>
            <Price>{sumPrice.toLocaleString()}원</Price>
            <PurchaseBtn onClick={handleAddToPurchase} disabled={selectedQuantity === 0}>
              선택상품 주문하기
            </PurchaseBtn>
          </PurchaseBar>
        </nav>
      </CartControlBar>
      <CartProductList
        cartInfo={cartInfo}
        setCartInfo={setCartInfo}
        selectedInfo={selectedInfo}
        setSelectedInfo={setSelectedInfo}
      />
      <CautionList>
        이용안내
        <li className='alert'>· 삭제한 상품 디자인은 복구할 수 없습니다.</li>
        <li>· 총 결제금액이 5만원 이상인 경우 무료 배송 혜택을 받으실 수 있습니다.</li>
      </CautionList>
      <MS.Overlay $showModal={showDelModal} />
      <MS.Modal $showModal={showDelModal}>
        <MS.ModalCloseBtn onClick={() => setShowDelModal(false)}>&times;</MS.ModalCloseBtn>
        <AlertDel>
          <p>정말 선택한 디자인을 장바구니에서<br />삭제하시겠습니까?</p>
          <ButtonWrapper>
            <button onClick={() => setShowDelModal(false)}>취소</button>
            <button onClick={handleDelCartInfo}>확인</button>
          </ButtonWrapper>
        </AlertDel>
      </MS.Modal>
    </>
  )
}