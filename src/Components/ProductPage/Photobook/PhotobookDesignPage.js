import styled from "styled-components";
import ProductDesignHeaderBar from "../ProductDesignHeaderBar";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  position: relative;
`

const Wrapper = styled.div`
  width: 1200px;
  margin: auto;
`

export default function PhotobookDesignPage() {
  const [cartInfo, setcartInfo] = useState([]);
  const [iscartInfoLoading, setIscartInfoLoading] = useState(false);
  const [productOption, setProductOption] = useState(['사이즈옵션', '커버주옵션', '커버부옵션', '내지옵션']);

  function cartInfoLoader() {   
    const cartId = sessionStorage.getItem('cart_id');

    fetch(`http://localhost:3001/api/cart/infoLoading`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId }),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // 서버에서 받아온 데이터 처리
      setcartInfo(data.cartInfo);
      setIscartInfoLoading(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    cartInfoLoader();
  }, [iscartInfoLoading])

  useEffect(() => {
    let size = '';
    let coverMain = '';
    let coverCoating = '';
    let coverColor = '';
    let inner = '';

    if (cartInfo && cartInfo.length > 0 && cartInfo[0].cart_option) {
      if (cartInfo[0].cart_option[0] === 0) {
        size = '27x27';
      } else if (cartInfo[0].cart_option[0] === 1) {
        size = '21.6x21.6';
      } else if (cartInfo[0].cart_option[0] === 2) {
        size = '16.2x16.2';
      } 

      if (cartInfo[0].cart_option[1] === 0) {
        coverMain = '하드커버'
      } else if (cartInfo[0].cart_option[1] === 1) {
        coverMain = '레더커버'
      }

      if (cartInfo[0].cart_option[2] === 0) {
        coverCoating = '무광'
      } else if (cartInfo[0].cart_option[2] === 1) {
        coverCoating = '유광'
      }

      if (cartInfo[0].cart_option[3] === 0) {
        coverColor = '블랙'
      } else if (cartInfo[0].cart_option[3] === 1) {
        coverColor = '핑크'
      } else if (cartInfo[0].cart_option[3] === 2) {
        coverColor = '레드'
      } else if (cartInfo[0].cart_option[3] === 3) {
        coverColor = '블루'
      } else if (cartInfo[0].cart_option[3] === 4) {
        coverColor = '민트'
      } else if (cartInfo[0].cart_option[3] === 5) {
        coverColor = '엘로'
      } else if (cartInfo[0].cart_option[3] === 6) {
        coverColor = '오렌지'
      }

      if (cartInfo[0].cart_option[4] === 0) {
        inner = '무광지';
      } else if (cartInfo[0].cart_option[4] === 1) {
        inner = '유광지';
      } 

      if (coverMain == '하드커버') {
        setProductOption([size, coverMain, coverCoating, inner]);
      } else {
        setProductOption([size, coverMain, coverColor, inner]);
      }
    }
  }, [cartInfo])

  return (
    <>
      <Container>
        <ProductDesignHeaderBar 
          cartInfo={cartInfo}
          setcartInfo={setcartInfo}
          productOption={productOption}
          setProductOption={setProductOption}
        />
      </Container>
    </>
  );
};
