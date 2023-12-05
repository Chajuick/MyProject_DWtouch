import styled from "styled-components";

import { useState, useEffect } from "react";
import * as MS from "../../../Components/Modal/ModalStyle";
import * as S from "../../../Components/ProductPageComponents/Design/ProductDesignHeaderBarStyle";
import { optFamily, options } from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookOptions";
import { useNavigate, useNavigation } from "react-router-dom";
import ProductDesignHeaderBar from "../../../Components/ProductPageComponents/Design/ProductDesignHeaderBar";
import ProductDesignUnderBar from "../../../Components/ProductPageComponents/Design/ProductDesignUnderBar";
import ProductDesignMainScreen from "../../../Components/ProductPageComponents/Design/ProductDesignMainScreen";
import ProductDesignImgBar from "../../../Components/ProductPageComponents/Design/ProductDesignImgBar";

import PhotobookScreen from "../../../assets/products/design_screen/products_design_screen_photobook.png";
import PhotobookGrid from "../../../assets/products/design_screen/products_grid_screen_photobook.png";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  button{
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background-color: rgb(240, 240, 240);
    transition: all 400ms;
    cursor: pointer;
  }

  button:hover{
    background-color: rgb(40, 40, 40);
    color: rgb(240, 240, 240);
  }
`

export default function PhotobookDesignPage() {
  const navigate = useNavigate();
  // 모달
  const [showSaveModal, setShowSaveModal] = useState(false);
  // 물품 정보
  const [cartName, setCartName] = useState("프로젝트명을 입력해주세요");
  const productName = sessionStorage.getItem('cart_product_name') || "알수없음"
  const [productOption, setProductOption] = useState(sessionStorage.getItem('cart_option').split(",").map(Number)) || ([0, 0, 0, 0, 0]);
  // 메인스크린 상태
  const [mainScreenSize, setMainScreenSize] = useState(100);
  const [isGrid, setIsGrid] = useState(false);
  const [textField, setTextField] = useState([]);
  const [imgField, setImgField] = useState([]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "";
      event.returnValue = message; // 대부분의 브라우저에 대한 표준
      return message; // 일부 예전 브라우저에 대한 반환 (return) 구문
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function addToCart( cartInfo, method ) {
    // 서버로 삼품 정보를 전송
    const cartData = {
      project_name: cartInfo.cartName,
      product_name: cartInfo.productName,
      option: cartInfo.productOption,
      default_price: cartInfo.defaultPrice/cartInfo.productQuantity,
      price: cartInfo.finalPrice/cartInfo.productQuantity,
      final_price: cartInfo.finalPrice,
      product_quantity: cartInfo.productQuantity,
      sale_info: cartInfo.saleInfo,
      user_uid: sessionStorage.getItem('user_uid'),
    }
    fetch('http://localhost:3001/api/cart/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( cartData ),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('서버 응답이 실패하였습니다.');
        }
    })
    .then((data) => {
        if (data.message) {
            if (data.success) {
              if (method === "저장") {
                setShowSaveModal(true);
              } else if (method === "장바구니") {
                navigate('/cart');
              }
            }
        } else {
            console.error('오류:', data.error);
        }
    })
    .catch((error) => {
      console.error('오류:', error);
    });
  };


  return (
    <>
      <Container>
        <ProductDesignHeaderBar 
          cartName={cartName}
          setCartName={setCartName}
          productName={productName}
          productOption={productOption}
          setProductOption={setProductOption}
          options={options}
          optFamily={optFamily}
          addToCart={addToCart}
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
      <MS.Overlay $showModal={showSaveModal}/>
        <MS.Modal $showModal={showSaveModal}>
          <p style={{ textAlign: "center", fontSize: "15px" }}>현재까지 편집된 디자인이<br/>저장되었습니다.</p>
          <S.ButtonWrapper>
            <S.ConfirmBtn style={{ marginTop: '20px' }} onClick={() => setShowSaveModal(false)}>확인</S.ConfirmBtn>
          </S.ButtonWrapper>
        </MS.Modal>
    </>
  );
};
