import styled from "styled-components";
import HeaderBar from '../../IndexPage/HeaderBar';
import NavBar from '../../IndexPage/NavBar';
import PhotobookOptSelector from "./PhotobookOptSelector";
import Footer from '../../IndexPage/Footer';
import React, { useEffect, useState } from 'react';
import ProductNavBar from "../OverviewPage/ProductNavBar";
import ProductIntroduction from "../OverviewPage/ProductIntroduction";
import ProductDetail from "../OverviewPage/ProductDetail";
import ProductReview from "../OverviewPage/ProductReview";

import MainImg from "../../../assets/products/introImgs/products_introImgs_photobook.jpg";
import SubImgWedding from "../../../assets/products/introImgs/products_introImgs_photobook_wedding.png";
import SubImgCouple from "../../../assets/products/introImgs/products_introImgs_photobook_couple.png";
import SubImgTravel from "../../../assets/products/introImgs/products_introImgs_photobook_travel.png";
import SubImgBaby from "../../../assets/products/introImgs/products_introImgs_photobook_baby.png";

const currentDate = new Date();
const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + 3);

// 만약 계산된 날짜가 주말이라면 다음 주 월요일의 날짜로 조정
const dayOfWeek = nextDate.getDay();
if (dayOfWeek === 0) {
    nextDate.setDate(nextDate.getDate() + 1);
}
if (dayOfWeek === 6) {
  nextDate.setDate(nextDate.getDate() + 2);
} 

const year = nextDate.getFullYear();
const month = nextDate.getMonth() + 1;
const date = nextDate.getDate();
const dayArr = ["일", "월", "화", "수", "목", "금", "토"];
const day = dayArr[nextDate.getDay()];

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

const introGuider = {
  title: "당신의 추억을 간직해드려요.",
  subTitle: "시간을 되돌릴 순 없지만 순간을 다시 마주할 수 있어요.",
  MainImg: MainImg, 
  typeTitle: "당신의 소중한 추억들을 나만의 포토북에 새겨보아요.",
  typeSubTitle: "저장만 해두기에는 아까운 추억, 잊혀지지 않도록 평생 간직해요.",
  typeImgs: {
    typeImg1: {
      title: "여행에서 보았던 멋진 순간들을",
      subTitle: "#여행포토북 #담아보자",
      img: SubImgTravel,
    },
    typeImg2: {
      title: "눈 깜빡할 새 자라는 아이의 모습들을",
      subTitle: "#육아포토북 #남겨보자",
      img: SubImgBaby,
    },
    typeImg3: {
      title: "행복했던 만남의 감정들을",
      subTitle: "#커플포토북 #새겨보자",
      img: SubImgCouple,
    },
    typeImg4: {
      title: "변하지 않을 가장 아름다운 약속을",
      subTitle: "#웨딩포토북 #기념하자",
      img: SubImgWedding,
    }
  }
};

const detailTextGuider = {
  detail1: [
    ["상품 기본 정보"],
    ["유의사항", 
    "포토북 제작 특성상 모니터 화면(기기)에 따라 색상이 다르게 보일 수 있습니다.",
    "포토북은 편집한 그대로 제작 및 발송 됩니다."],
    ["품질보증기준",
    "본 제품은 SNAPS Assurance의 엄격한 품질검사를 통과하였고 라이선스를 보증합니다.",
    "본 제품의 품질에 이상이 있으실 경우 주문일로부터 7일 이내에 100% 재제작 또는 환불 가능합니다."],
    ["교환 / 반품 안내",
    "커스텀 제품 특성상 제작 중 취소 불가합니다.",
    "커스텀 제품 특성상 교환/반품이 불가합니다(불량제외)."],
    ["고객만족센터",
    "1577-4701"],
  ],
  detail2: [
    ["유의사항 안내"],
    ["인쇄 유의사항", 
    "스냅스에서 제공하는 시스템은 RGB 인쇄에 맞춰져 있습니다. RGB 이미지를 준비해 주세요.",
    "ICC profile 파일인 경우 색감 원본 그대로 제작되지 않을 수 있습니다.",
    "ICC profile 해제는 이미지 변환 소프트웨어를 사용하여 재저장 한 후 사용가능합니다.",
    "선명한 인쇄를 위해 권장 해상도 이상의 이미지를 준비해 주세요. 편집기 내에서 느낌표 아이콘이 뜰 경우 인쇄가 흐리게 나올 수 있습니다."],
    ["제본 유의사항",
    "스냅스 포토북은 pur제본으로, 책이 완전히 펼쳐지는 것은 불량이 아닙니다.",
    "제본 특성 상 책등과 내지가 완전히 붙어있지 않을 수 있으나, 내구성 및 품질에는 영향이 없습니다."],
  ],
};


const Container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgb(250, 250, 250);
`

export default function PhotobookOverviewPage() {
  const [needLoginModal, setNeedLoginModal] = useState(false);
  const [userGrade, setUserGrade] = useState(sessionStorage.getItem('user_grades') || 0);
  const [navGuider, setNavGuider] = useState([104, 1056, 3750, 4764]);
  const [optSelectorY, setOptSelectorY] = useState(0);
  const [introductionY, setIntroductionY] = useState(0);
  const [detailY, setDetailY] = useState(0);
  const [reviewY, setReviewY] = useState(0);
  const [optPrice, setOptPrice] = useState(0);

  const detailGuides = [
  ["페이지", "21페이지 ~ 최대 101페이지까지 추가 가능", "rgb(150, 150, 150)"],
  ["페이지 추가 가격", `1장당 ${optPrice.toLocaleString()}원`, "rgba(250, 50, 50, 0.7)"],
  ["발송안내", year + "년 " + month + "월 " + date + "일" + "(" + day + ") 출고 예정", "rgba(250, 50, 50, 0.7)"],
  ["배송료", "3,000원 (5만원 이상 주문 시 무료)", "rgba(250, 50, 50, 0.7)"],
]

  useEffect(() => {
    // 네비게이션 가이드 값들을 업데이트하는 함수
    const updateNavGuiders = () => {
      if (optSelectorY >= 0 && introductionY >= 0 && detailY >= 0 && reviewY >= 0) {
        setNavGuider([optSelectorY, introductionY, detailY, reviewY]);
      }
    };

    // 값들이 변경될 때마다 업데이트 함수 호출
    updateNavGuiders();
  }, [optSelectorY, introductionY, detailY, reviewY]);

  const handleOptSelectorYChange = (newY) => {
    setOptSelectorY(newY);
  };
  const handleIntroductionYChange = (newY) => {
    setIntroductionY(newY);
  };
  const handleDetailYChange = (newY) => {
    setDetailY(newY);
  };
  const handleReviewYChange = (newY) => {
    setReviewY(newY);
  };

  return (
    <>
      <HeaderBar/>
      <NavBar />
      <Container>
        <PhotobookOptSelector
          productId={1}
          options={options}
          optFamily={optFamily}
          userGrade={userGrade}
          detailGuides={detailGuides}
          changeOptSelectorY={handleOptSelectorYChange}
          optPrice={optPrice}
          setOptPrice={setOptPrice}
        />
        <ProductNavBar
          navGuider={navGuider}
        />
        <ProductIntroduction
          introGuider={introGuider}
          changeIntroductionY={handleIntroductionYChange}
        /> 
        <ProductDetail
          detailTextGuider={detailTextGuider}
          changeDetailY={handleDetailYChange}
        />
        <ProductReview
          changeReviewY={handleReviewYChange}
          productName="포토북"
        />
      </Container>
      <Footer />
    </>
  );
}