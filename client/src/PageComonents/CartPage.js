import Footer from '../Components/CommonComponents/Footer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import CartIndexPage from '../Components/CartPageComponents/Cart/Index/CartIndexPage';
import CartPurchasePage from '../Components/CartPageComponents/Cart/Purchase/CartPurchasePage';
import CartCompletePage from '../Components/CartPageComponents/Cart/Complete/CartCompletePage';

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

const purchaseStatus = ["01. 장바구니", "02. 주문·결제", "03. 주문완료"];

export default function CartPage({ locationReload }) {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem('isLoggedIn') === 'true';
  const [currentStatus, setCurrentStatus] = useState(0);
  const [cartInfo, setCartInfo] = useState([]);
  const [checkCartInfo, setCheckCartInfo] = useState([]);
  const [isCartInfoLoading, setIsCartInfoLoading] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      locationReload();
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (isCartInfoLoading && cartInfo.length > 0) {
      const purchaseListInfo = cartInfo.reduce((result, item, index) => {
        if (selectedInfo[index] === 1) {
          result.push(item);
        }
        return result;  // 이 부분을 추가해줘야 합니다.
      }, []);  // 초기값 설정
      setCheckCartInfo(purchaseListInfo);
    }
  }, [cartInfo, selectedInfo]);

  // 카트 정보 받아오기
  function cartInfoLoader() {   
    const userUid = sessionStorage.getItem('user_uid');
    fetch(`http://192.168.0.7:3001/api/cart/infoLoading`, {
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
  // 카트 정보 삭제
  const handleDelCartInfo = () => {
    const selectedIndexes = selectedInfo
      .map((item, index) => (item === 1 ? index : -1))
      .filter(index => index !== -1);
    const cartIds = selectedIndexes.map(index => cartInfo[index].cart_id);
    fetch('http://192.168.0.7:3001/api/cart/infoDel', {
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
  
  console.log(cartInfo);

  return (
    <>
      {isCartInfoLoading &&
        <>
          <Container>
            <Wrapper>
              <Title>장바구니</Title>
              <StatusBar>
                {purchaseStatus.map((item, index) => (
                  <div key={index} className={index === currentStatus? 'sel' : ''}>{item}</div>
                ))}
              </StatusBar>
              {currentStatus === 0 && isCartInfoLoading &&
                <>
                  <CartIndexPage 
                    setCurrentStatus={setCurrentStatus}
                    cartInfo={cartInfo}
                    setCartInfo={setCartInfo}
                    handleDelCartInfo={handleDelCartInfo}
                    selectedInfo={selectedInfo}
                    setSelectedInfo={setSelectedInfo}
                  />
                </>
              }
              {currentStatus === 1 &&
              <>
                <CartPurchasePage
                  setCurrentStatus={setCurrentStatus} 
                  checkCartInfo={checkCartInfo}
                  navigate={navigate}
                />
              </>
              }
              {currentStatus === 2 &&
                <>
                  <CartCompletePage 
                    navigate={navigate}
                  />
                </>
              }
            </Wrapper>
          </Container>
          <Footer />
        </>
      }
      {!isCartInfoLoading &&
        <LoadingPage />
      }
    </>
  );
};
