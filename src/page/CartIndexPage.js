import HeaderBar from '../Components/IndexPage/HeaderBar';
import NavBar from '../Components/IndexPage/NavBar';
import Footer from '../Components/IndexPage/Footer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CartProductList from '../Components/CartPage/CartProductList';
import CartPurchaseList from '../Components/CartPage/CartPurchaseList';
import * as MS from '../Components/Modal/ModalStyle';
import CartPurchaseAria from '../Components/CartPage/CartPurchaseAria';

const Container = styled.div`
  width: 100vw;
  background-color: rgb(250, 250, 250);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  padding: 80px 0;
`;

const StatusBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  div {
    width: calc( 100% / 3 );
    padding: 15px 0;
    text-align: center;
    background-color: rgb(180, 180, 180);
    transition: all 800ms;
    border: 1px solid rgb(180, 180, 180);
    color: rgb(120, 120, 120);
    font-size: 15px;
  }
  div.sel {
    background-color: rgb(250, 250, 250);
    color: rgb(80, 80, 80);
  } 
`;

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

const purchaseStatus = ["01. 장바구니", "02. 주문·결제", "03. 주문완료"];

export default function CartIndexPage() {
  const [sumPrice, setSumPrice] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [cartInfo, setCartInfo] = useState([]);
  const [isCartInfoLoading, setIsCartInfoLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);

  const purchaseListInfo = cartInfo.reduce((result, item, index) => {
    if (selectedInfo[index] === 1) {
      // 조건을 만족하는 경우에만 현재 요소를 결과 배열에 추가
      result.push(item);
    }
    return result;
  }, []);

  useEffect(() => {
    const updatedCartInfo = cartInfo.map((item, index) => ({
      ...item,
      cart_final_price: selectedInfo[index] === 1 ? item.cart_price * item.cart_product_quantity : 0,
      cart_product_quantity: selectedInfo[index] === 1 ? item.cart_product_quantity : 0,
    }));
    const totalSum = updatedCartInfo.reduce((sum, item) => sum + item.cart_final_price, 0);
    const quantitySum = updatedCartInfo.reduce((sum, item) => sum + item.cart_product_quantity, 0);
    setSumPrice(totalSum);
    setSelectedQuantity(quantitySum);
  }, [cartInfo, selectedInfo]);
  
  // 상단 전체 선택 체크 버튼 클릭 시 실행될 함수
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

  function cartInfoLoader() {   
    const userUid = sessionStorage.getItem('user_uid');
    fetch(`http://localhost:3001/api/cart/infoLoading`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({userUid}),
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
      // 서버에서 받아온 데이터 처리
      setCartInfo(data.cartInfo);
      setIsCartInfoLoading(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    cartInfoLoader();
    setSelectedInfo(Array(cartInfo.length).fill(1));
    
  }, [isCartInfoLoading]);

  const handleDelCartInfo = () => {
    const selectedIndexes = selectedInfo
      .map((item, index) => (item === 1 ? index : -1))
      .filter(index => index !== -1);
  
    const cartIds = selectedIndexes.map(index => cartInfo[index].cart_id);
  
    fetch('http://localhost:3001/api/cart/infoDel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartIds }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // 삭제 성공 시 페이지를 새로고침
        if (data.success) {
          setIsCartInfoLoading(false);
          window.location.reload();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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
      <HeaderBar />
      <NavBar />
      <Container>
        <Wrapper>
          <Title>장바구니</Title>
          <StatusBar>
            {purchaseStatus.map((item, index) => (
              <div key={index} className={index === currentStatus? 'sel' : ''}>{item}</div>
            ))}
          </StatusBar>
          {currentStatus === 0 &&
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
                    <PurchaseBtn onClick={handleAddToPurchase} disabled={selectedQuantity === 0}
                    >선택상품 주문하기</PurchaseBtn>
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
            </>
          }
          {currentStatus === 1 &&
          <>
            <CartPurchaseList purchaseListInfo={purchaseListInfo} />
            <CartPurchaseAria purchaseListInfo={purchaseListInfo}/>
          </>
          }
        </Wrapper>
      </Container>
      <Footer />
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
  );
};
