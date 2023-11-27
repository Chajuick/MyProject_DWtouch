import styled from "styled-components";
import ProductDesignHeaderBar from "../DesignPage/ProductDesignHeaderBar";
import ProductDesignUnderBar from "../DesignPage/ProductDesignUnderBar";
import ProductDesignMainScreen from "../DesignPage/ProductDesignMainScreen";
import ProductDesignImgBar from "../DesignPage/ProductDesignImgBar";
import { useState, useEffect } from "react";

import PhotobookScreen from "../../../assets/products/design_screen/products_design_screen_photobook.png";
import PhotobookGrid from "../../../assets/products/design_screen/products_grid_screen_photobook.png";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`
const Wrapper = styled.div`
  width: 1200px;
  margin: auto;
`

const options = [
  ["사이즈 ( cm )", "27x27", "21.6x21.6", "16.2x16.2"],
  ["커버", "하드커버", "레더커버"],
  ["커버코팅", "무광", "유광"],
  ["커버색상", "블랙", "핑크", "레드", "블루", "민트", "엘로", "오렌지"],
  ["내지", "무광지", "유광지"],
];

const optFamily = {
  isFamily: true,
  parentsOpt: 1,
  childOpts: {
    childOpt1: 2,
    childOpt2: 3,
  },
  priceModifier: [
    [1, 0.8, 0.6],
    [1, 1.2],
    null,
    null,
    null,
  ]
};

export default function PhotobookDesignPage() {
  const [cartInfo, setcartInfo] = useState([]);
  const [iscartInfoLoading, setIscartInfoLoading] = useState(false);
  const [productOption, setProductOption] = useState(['사이즈옵션', '커버주옵션', '커버부옵션', '내지옵션']);
  const [mainScreenSize, setMainScreenSize] = useState(100);
  const [isGrid, setIsGrid] = useState(false);
  const [textField, setTextField] = useState([]);
  const [imgField, setImgField] = useState([]);

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
        size = 0;
      } else if (cartInfo[0].cart_option[0] === 1) {
        size = 1;
      } else if (cartInfo[0].cart_option[0] === 2) {
        size = 2;
      } 

      if (cartInfo[0].cart_option[1] === 0) {
        coverMain = 0;
      } else if (cartInfo[0].cart_option[1] === 1) {
        coverMain = 1;
      }

      if (cartInfo[0].cart_option[2] === 0) {
        coverCoating = 0;
      } else if (cartInfo[0].cart_option[2] === 1) {
        coverCoating = 1;
      }

      if (cartInfo[0].cart_option[3] === 0) {
        coverColor = 0;
      } else if (cartInfo[0].cart_option[3] === 1) {
        coverColor = 1;
      } else if (cartInfo[0].cart_option[3] === 2) {
        coverColor = 2;
      } else if (cartInfo[0].cart_option[3] === 3) {
        coverColor = 3;
      } else if (cartInfo[0].cart_option[3] === 4) {
        coverColor = 4;
      } else if (cartInfo[0].cart_option[3] === 5) {
        coverColor = 5;
      } else if (cartInfo[0].cart_option[3] === 6) {
        coverColor = 6;
      }

      if (cartInfo[0].cart_option[4] === 0) {
        inner = 0;
      } else if (cartInfo[0].cart_option[4] === 1) {
        inner = 1;
      } 

      setProductOption([size, coverMain, coverCoating, coverColor, inner]);
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
          options={options}
          optFamily={optFamily}
        />
        <ProductDesignUnderBar 
          mainScreenSize={mainScreenSize}
          setMainScreenSize={setMainScreenSize}
          isGrid={isGrid}
          setIsGrid={setIsGrid}
          textField={textField}
          setTextField={setTextField}
        />
        <ProductDesignMainScreen
          productGrid={PhotobookGrid} 
          productSrc={PhotobookScreen}
          mainScreenSize={mainScreenSize}
          setMainScreenSize={setMainScreenSize}
          isGrid={isGrid}
          setIsGrid={setIsGrid}
          textField={textField}
          setTextField={setTextField}
        />
        <ProductDesignImgBar />
      </Container>
    </>
  );
};
