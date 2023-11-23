import styled from "styled-components";
import { Link } from 'react-router-dom';

import logo from '../../assets/logo/logo.png';
import Calender from '../../assets/bestGoods/bestGoods__calender.png';
import Photobook from '../../assets/bestGoods/bestGoods__photobook.png';
import Sticker from '../../assets/bestGoods/bestGoods__sticker.png';
import TShirts from '../../assets/bestGoods/bestGoods__tshirts.png';
import Tumbler from '../../assets/bestGoods/bestGoods__tumbler.png';

const Container = styled.div`
  width: 100vw;
  position: relative;
  padding: 80px 0;
  background-color: rgb(250, 250, 250);
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-bottom: 2rem;
  border-top: 1px solid rgb(160, 160, 160);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: rgb(40, 40, 40);
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-bottom: 3px;
    padding: 0 10px;
  }
`

const BestGoodsBox = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 90px;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    figure {
      margin: 50px 0 20px;
      width: 212px;
      height: 212px;
      box-shadow: 0 3px 5px rgba(40, 40, 40, 0);
      transition: all 400ms;
    }
    span {
      font-size: 15px;
      color: rgb(100, 100, 100);
    }
  }
  a:hover {
    figure {
      box-shadow: 0 3px 5px rgba(40, 40, 40, 0.2);
    }
  }
`;

export default function BestGoodsAria() {

  return (
    <Container>
      <Title><img src={logo} style={{height:"60px"}}/><span>BESTGOODS</span></Title>
      <BestGoodsBox>
        <Link to="/">
          <figure>
            <img src={Calender}/>
          </figure>
          <span>스케줄러</span>
        </Link>
        <Link to="/">
          <figure>
            <img src={Photobook}/>
          </figure>
          <span>포토북</span>
        </Link>
        <Link to="/">
          <figure>
            <img src={Sticker}/>
          </figure>
          <span>굿즈스티커</span>
        </Link>
        <Link to="/">
          <figure>
            <img src={TShirts}/>
          </figure>
          <span>티셔츠</span>
        </Link>
        <Link to="/">
          <figure>
            <img src={Tumbler}/>
          </figure>
          <span>텀블러</span>  
        </Link>
      </BestGoodsBox>
    </Container>
  );
}
