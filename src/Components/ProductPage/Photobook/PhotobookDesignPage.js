import styled from "styled-components";
import ProductDesignHeaderBar from "../DesignPage/ProductDesignHeaderBar";
import ProductDesignUnderBar from "../DesignPage/ProductDesignUnderBar";
import ProductDesignMainScreen from "../DesignPage/ProductDesignMainScreen";
import ProductDesignImgBar from "../DesignPage/ProductDesignImgBar";
import { useState, useEffect } from "react";
import * as MS from "../../Modal/ModalStyle";

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
  const [cartInfo, setcartInfo] = useState({
    cart_product_name: sessionStorage.getItem('cart_product_name') || "알수없음",
    cart_name: "프로젝트명을 입력해주세요",
  });
  const [productOption, setProductOption] = useState(sessionStorage.getItem('cart_option')? sessionStorage.getItem('cart_option').split(",").map(Number) : [0, 0, 0, 0, 0]);
  const [mainScreenSize, setMainScreenSize] = useState(100);
  const [isGrid, setIsGrid] = useState(false);
  const [textField, setTextField] = useState([]);
  const [imgField, setImgField] = useState([]);
  const [showCheckModal, setShowCheckModal] = useState(false);

  console.log(productOption);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "현재까지 편집된 디자인을 저장하고 종료하시겠습니까?\n\n저장하지 않은 디자인은 삭제됩니다.";
      event.returnValue = message; // 대부분의 브라우저에 대한 표준
      return message; // 일부 예전 브라우저에 대한 반환 (return) 구문
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSaveAndExit = () => {
    setShowCheckModal(false);
  };

  const handleClickBack = () => {
    setShowCheckModal(true);
    // navigate("/"); // 사용자가 확인 메시지를 무시하고 뒤로가기를 눌렀을 때도 이동하고 싶다면 이 줄을 활성화
  };

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
      <MS.Overlay $showModal={showCheckModal}/>
        <MS.Modal $showModal={showCheckModal}>
          <p>현재까지 편집된 디자인을<br/>저장하고 종료하시겠습니까?<br/>&nbsp;<br/>저장하지 않은 디자인은 삭제됩니다.</p>
          <ButtonWrapper>
            <button onClick={() => setShowCheckModal(false)}>저장하지않고 종료</button>
            <button >저장하고 종료</button>
          </ButtonWrapper>
        </MS.Modal>
    </>
  );
};
