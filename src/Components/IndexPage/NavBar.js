import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  width: 100vw;
`

const MainContainer = styled.div`
  background-color: rgb(250, 250, 250);
  color: rgb(20, 20, 20);
  width: 100vw;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const SubContainer = styled.div`
  border-top: 1px solid rgb(200, 200, 200);
  background-color: rgb(250, 250, 250);
  color: rgb(20, 20, 20);
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
  justify-content: left;
  align-items: center;
  list-style: none;

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
    color: rgb(25, 25, 25);
    text-decoration: none;
    font-size: 14px;
    padding: 0.5rem 0;
    transition: all 400ms;
  }
  li > a:hover {
    color: rgb(145, 145, 145);
  }
`;

export default function NavBar() {
  const [isSubContainerVisible, setSubContainerVisible] = useState(false);

  const handleMouseEnter = () => {
    setSubContainerVisible(true);
  };

  const handleMouseLeave = () => {
    setSubContainerVisible(false);
  };

  return (
    <Container onMouseLeave={handleMouseLeave}>
      <MainContainer>
        <MainBar>
          <li><Link to="/productlist/photobook" onMouseEnter={handleMouseEnter}>포토북</Link></li>
          <li><Link to="/" onMouseEnter={handleMouseEnter}>달력</Link></li>
          <li><Link to="/" onMouseEnter={handleMouseEnter}>스티커</Link></li>
          <li><Link to="/" onMouseEnter={handleMouseEnter}>의류</Link></li>
          <li><Link to="/" onMouseEnter={handleMouseEnter}>액세서리</Link></li>
          <li><Link to="/" onMouseEnter={handleMouseEnter}>생활</Link></li>
        </MainBar>
      </MainContainer>

      <SubContainer $isSubContainerVisible={isSubContainerVisible}>
        <SubBar>
          <li>
            <Link to="/productlist/photobook/photobook">포토북</Link>
            <Link to="/productlist/photobook/photobook">팬북</Link>
            <Link to="/productlist/photobook/photobook">졸업앨범</Link>
          </li>
          <li>
            <Link to="/">벽걸이</Link>
            <Link to="/">탁상</Link>
            <Link to="/">우드블럭</Link>
            <Link to="/">스케줄러</Link>
          </li>
          <li>
            <Link to="/">굿즈스티커</Link>
            <Link to="/">네임스티커</Link>
          </li>
          <li>
            <Link to="/">티셔츠</Link>
            <Link to="/">맨투맨</Link>
            <Link to="/">후드티</Link>
            <Link to="/">에코백</Link>
          </li>
          <li>
            <Link to="/">핀셋</Link>
            <Link to="/">스마트톡</Link>
            <Link to="/">카드지갑</Link>
          </li>
          <li>
            <Link to="/">머그컵</Link>
            <Link to="/">텀블러</Link>
            <Link to="/">쿠션</Link>
          </li>
        </SubBar>
      </SubContainer>
    </Container>
  );
}
