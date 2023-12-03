import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  position: relative;
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  padding: 80px 0;
`;

export const Wrapper = styled.div`
  width: 1150px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductOverView = styled.ul`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: top;
  list-style: none;
  padding-bottom: 50px;
  &>li {
    width: calc( 100% / 3 - 10px );
    position: relative;
    padding: 0 15px;
    margin-bottom: 100px;
    a {
      text-decoration: none;
    }
  }
  &>li:hover {
    cursor: pointer;
    p.name {
      text-decoration: underline;
    }
    div {
      object-fit: cover;
      box-shadow: 2px 2px 5px rgba(40, 40, 40, 0.5);
    }
  }
`;

export const AdditionalInfo = styled.div`
  position: absolute;
  border-right: 1px solid blue;
  top: 0;
  left: 15px;
  width: calc( 100% - 30px );
  img.sale {
    position: absolute;
    width: 100px;
    left: -12px;
  }
`;

export const Figure = styled.figure`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(220, 220, 210, 0.2);
  box-shadow: 2px 2px 5px rgba(40, 40, 40, 0);
  transition: all 600ms;
  margin-bottom: 20px;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const ColorViewr = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

export const ColorList = styled.li`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 4px;
`;

export const ProductName = styled.p`
  color: rgb(80, 80, 80);
  margin: 10px 0;
  font-size: 20px;
  text-underline-offset: 3px;
`;

export const ProductDetail = styled.p`
  color: rgb(120, 120, 120);
  font-size: 15px;
`;

export const Price = styled.p`
  margin-top: 10px;
  font-size: 14px;
  del {
    color: rgb(180, 180, 180);
    margin-right: 5px;
  }
  span {
    color: rgb(150, 150, 150);
  }
  span.red {
    color: rgba(250, 50, 50, 0.8);
  }
`;

export function priceCalculate(price, sale) {
  return parseInt(( price * (( 100 - sale ) / 100)) / 10) * 10;
}