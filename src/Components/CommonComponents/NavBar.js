import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const Container = styled.div`
  width: 100vw;
  display: ${(props) => (props.$hideContainer ? 'none' : 'block')};
`

const MainContainer = styled.div`
  background-color: rgb(250, 250, 250);
  color: rgb(20, 20, 20);
  width: 100vw;
  border-bottom: 1px solid rgb(200, 200, 200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubContainer = styled.div`
  border-top: 1px solid rgb(200, 200, 200);
  background-color: rgb(80, 80, 80);
  color: rgb(250, 250, 250);
  width: 100vw;
  max-height: ${({ "$isSubContainerVisible": isSubContainerVisible }) =>
    isSubContainerVisible ? '500px' : '0'};
  opacity: ${({ "$isSubContainerVisible": isSubContainerVisible }) =>
    isSubContainerVisible ? '1' : '0.5'};
  overflow: hidden;
  transition: max-height 600ms, opacity 600ms;
  position: absolute;
  top: 103px;
  left: 0;
  z-index: 100;
`;

const MainBar = styled.ul`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    justify-content: left;
    align-items: center;
    list-style: none;
  }
  li {
    margin-right: 2rem;
    width: 84px;
    padding: 1rem 0;
  }
  li > a {
    color: rgb(10, 10, 10);
    text-decoration: none;
    font-size: 15px;
    transition: all 400ms;
  }
  li > a:hover {
    color: rgb(120, 120, 120);
  }
`;

const SubBar = styled.ul`
  width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 0;
  display: flex;
  list-style: none;
  li {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-right: 2rem;
    width: 84px;
  }
  li > a {
    color: rgb(210, 210, 210);
    text-decoration: none;
    font-size: 14px;
    padding: 0.5rem 0;
    transition: all 400ms;
  }
  li > a:hover {
    color: rgb(145, 145, 145);
  }
`;

const AddtoCartBtn = styled.button`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(80, 80, 80);
  svg {
    border-radius: 50%;
    padding: 5px;
    color: rgb(250, 250, 250);
    background-color: rgb(80, 80, 80);
    transition: all 400ms;
    font-size: 30px;
    margin-right: 5px;
    border: 1px solid rgb(80, 80, 80);
  }
  &:hover {
    cursor: pointer;
    filter: contrast(120%);
  }
  span {
    transition: all 400ms;
    font-size: 15px;
  }
`;

const CartNumber = styled.p `
  margin-left: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgb(232, 98, 90);
  border: 1px solid rgb(232, 98, 90);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(250, 250, 250);
  transition: all 400ms;
`;

export default function NavBar({ setShowLoginModal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubContainerVisible, setSubContainerVisible] = useState(false);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  // 카트 정보 받아오기
  const [cartLength, setCartLength] = useState(0);
  const [isCartLengthLoading, setIsCartLengthLoading] = useState(false);

  function cartLengthLoader() {   
    const userUid = sessionStorage.getItem('user_uid') || 0;
    if (userUid !== 0) {
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
        setCartLength(data.cartInfo.length);
        setIsCartLengthLoading(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsCartLengthLoading(false);
      });
    }
  };

  useEffect(() => {
    if (!isCartLengthLoading) {
      cartLengthLoader();
    }
    // 5초마다 fetchData 실행
    const intervalId = setInterval(() => {
      if (!isCartLengthLoading) {
        cartLengthLoader();
      }
    }, 1000);
    // 컴포넌트가 언마운트되면 interval 정리
    return () => clearInterval(intervalId);
  }, [isCartLengthLoading]);

  const handleMouseEnter = () => {
    setSubContainerVisible(true);
  };

  const handleMouseLeave = () => {
    setSubContainerVisible(false);
  };

  function handleNavigateCart() {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      setShowLoginModal(true);
    } 
  };

  const hideContainer = location.pathname === '/photobook-design' || location.pathname === '/fanbook-design';

  return (
    <>
    <Container onMouseLeave={handleMouseLeave} $hideContainer={hideContainer}>
      <MainContainer>
        <MainBar>
          <ul>
            <li><Link to="/photobook-list" onMouseEnter={handleMouseEnter}>포토북</Link></li>
            <li><Link to="/calendar-list" onMouseEnter={handleMouseEnter}>달력</Link></li>
            <li><Link to="/sticker-list" onMouseEnter={handleMouseEnter}>스티커</Link></li>
            <li><Link to="/clothes-list" onMouseEnter={handleMouseEnter}>의류</Link></li>
            <li><Link to="/accessories-list" onMouseEnter={handleMouseEnter}>액세서리</Link></li>
            <li><Link to="/drinkware-list" onMouseEnter={handleMouseEnter}>음료용기</Link></li>
          </ul>
          <AddtoCartBtn onClick={handleNavigateCart}>
            <Icon icon="subway:bag" />
            <span>장바구니</span>
              <CartNumber>{cartLength? cartLength : 0}</CartNumber>
          </AddtoCartBtn>
        </MainBar>
      </MainContainer>

      <SubContainer $isSubContainerVisible={isSubContainerVisible}>
        <SubBar>
          <li>
            <Link to="/photobook-overview">포토북</Link>
            <Link to="/fanbook-overview">팬북</Link>
            <Link to="/elbum-overview">졸업앨범</Link>
          </li>
          <li>
            <Link to="/wall-calendar-overview">벽걸이</Link>
            <Link to="/table-calendar-overview">탁상</Link>
            <Link to="/woodblock-overview">우드블럭</Link>
          </li>
          <li>
            <Link to="/goods-sticker-overview">굿즈스티커</Link>
            <Link to="/name-sticker-overview">네임스티커</Link>
          </li>
          <li>
            <Link to="/t-shirts-overview">티셔츠</Link>
            <Link to="/sweatshirt-overview">맨투맨</Link>
            <Link to="/hood-overview">후드티</Link>
            <Link to="/ecobag-overview">에코백</Link>
          </li>
          <li>
            <Link to="/pincette-overview">핀셋</Link>
            <Link to="/smart-tok-overview">스마트톡</Link>
            <Link to="/card-wallet-overview">카드지갑</Link>
          </li>
          <li>
            <Link to="/mugcup-overview">머그컵</Link>
            <Link to="/tumbler-overview">텀블러</Link>
          </li>
        </SubBar>
      </SubContainer>
    </Container>
    </>
  );
}
