import styled from "styled-components";
import Footer from "../../../Components/CommonComponents/Footer";
import LoadingPage from "../../LoadingPage";
import React, { useEffect, useMemo, useState } from "react";

import PhotobookOptSelector from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookOptSelector";
import ProductNavBar from "../../../Components/ProductPageComponents/Overviews/ProductNavBar";
import PhotobookIntroduction from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookIntroduction";
import ProductDetail from "../../../Components/ProductPageComponents/Overviews/ProductDetail";
import ProductReview from "../../../Components/ProductPageComponents/Overviews/ProductReview";

import {
  optFamily,
  options,
  introGuider,
  detailTextGuider,
} from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookOptions";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgb(250, 250, 250);
`;

const ImgLoader = styled.img`
  opacity: 0;
  position: absolute;
  z-index: -10000;
`;

/** =========================
 * ✅ 상수 데이터 (SQL 기반)
 * ========================= */

// products 테이블 product_id=1 (포토북)
const PRODUCT_PHOTOBOOK = {
  product_id: 1,
  product_name: "포토북",
  product_link: "/photobook-overview/",
  category_id: 2,
  main_category_id: 1,
  product_description_first: "디자인부터 사이즈까지 취향대로.",
  product_description_second: "추억을 포토북에 새겨보세요.",
  product_main_img: "productImgs/photobook/photobook/photobook_m_l.png",
  product_default_price: 20000,
  product_opt_price: 1000,
  product_sale: 0,
  product_sale_detail: null,
  product_sell_amount: 0,
  product_option: null,

  // ✅ 기존 서버 응답 형태를 맞추기 위해 별칭 키도 제공
  default_price: 20000,
  opt_price: 1000,
  sale: 0,
  sale_detail: "",
};

// product_opt_image 테이블에서 product_id=1
const PRODUCT_PHOTOBOOK_OPT_IMGS = [
  { optValue: "10x10_hard_matte", img: "productImgs/photobook/photobook/photobook_m_l.png" },
  { optValue: "8x8_hard_matte", img: "productImgs/photobook/photobook/photobook_m_m.png" },
  { optValue: "6x6_hard_matte", img: "productImgs/photobook/photobook/photobook_m_s.png" },
  { optValue: "10x10_hard_glossy", img: "productImgs/photobook/photobook/photobook_g_l.png" },
  { optValue: "8x8_hard_glossy", img: "productImgs/photobook/photobook/photobook_g_m.png" },
  { optValue: "6x6_hard_glossy", img: "productImgs/photobook/photobook/photobook_g_s.png" },
  { optValue: "10x10_soft_matte", img: "productImgs/photobook/photobook/photobook_sm_l.png" },
  { optValue: "8x8_soft_matte", img: "productImgs/photobook/photobook/photobook_sm_m.png" },
  { optValue: "6x6_soft_matte", img: "productImgs/photobook/photobook/photobook_sm_s.png" },
  { optValue: "10x10_soft_glossy", img: "productImgs/photobook/photobook/photobook_sg_l.png" },
  { optValue: "8x8_soft_glossy", img: "productImgs/photobook/photobook/photobook_sg_m.png" },
  { optValue: "6x6_soft_glossy", img: "productImgs/photobook/photobook/photobook_sg_s.png" },
];

// 배송 예정일 계산 (기존 로직 유지)
const currentDate = new Date();
const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + 3);

const dow = nextDate.getDay();
if (dow === 0) nextDate.setDate(nextDate.getDate() + 1);
if (dow === 6) nextDate.setDate(nextDate.getDate() + 2);

const year = nextDate.getFullYear();
const month = nextDate.getMonth() + 1;
const date = nextDate.getDate();
const dayArr = ["일", "월", "화", "수", "목", "금", "토"];
const day = dayArr[nextDate.getDay()];

export default function PhotobookOverviewPage({ setShowLoginModal }) {
  const productId = 1;

  const [userGrade, setUserGrade] = useState(sessionStorage.getItem("user_grades") || 0);

  // ✅ 로딩 상태
  const [isProductsInfoLoading, setIsProductInfoLoading] = useState(false);
  const [isProductsImgsLoading, setIsProductsImgsLoading] = useState(false);
  const [isImgsLoading, setIsImgsLoading] = useState(true);

  // ✅ 상품 정보
  const [productInfo, setProductInfo] = useState({});
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [optPrice, setOptPrice] = useState(0);
  const [saleInfo, setSaleInfo] = useState(0);
  const [saleDetail, setSaleDetail] = useState("");

  // ✅ 이미지
  const [productImgs, setProductImgs] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [loadedImageCount, setLoadedImageCount] = useState(0);

  // ✅ 스크롤 네비 값
  const [navGuider, setNavGuider] = useState([104, 1056, 3750, 4764]);
  const [optSelectorY, setOptSelectorY] = useState(0);
  const [introductionY, setIntroductionY] = useState(0);
  const [detailY, setDetailY] = useState(0);
  const [reviewY, setReviewY] = useState(0);

  const detailGuides = useMemo(() => {
    return [
      ["페이지", "21페이지 ~ 최대 101페이지까지 추가 가능", "rgb(150, 150, 150)"],
      ["페이지 추가 가격", `1장당 ${optPrice.toLocaleString()}원`, "rgba(250, 50, 50, 0.7)"],
      ["발송안내", `${year}년 ${month}월 ${date}일(${day}) 출고 예정`, "rgba(250, 50, 50, 0.7)"],
      ["배송료", "3,000원 (5만원 이상 주문 시 무료)", "rgba(250, 50, 50, 0.7)"],
    ];
  }, [optPrice]);

  /** ✅ 상수 데이터 주입 (fetch 제거) */
  useEffect(() => {
    if (productId !== 1) {
      // 지금은 상수로 1번만 박아둔 상태
      setIsProductInfoLoading(false);
      setIsProductsImgsLoading(false);
      return;
    }

    // 상품 정보
    const p = PRODUCT_PHOTOBOOK;
    setProductInfo(p);
    setDefaultPrice(p.default_price ?? p.product_default_price ?? 0);
    setOptPrice(p.opt_price ?? p.product_opt_price ?? 0);
    setSaleInfo(p.sale ?? p.product_sale ?? 0);
    setSaleDetail(p.sale_detail ?? p.product_sale_detail ?? "");
    setIsProductInfoLoading(true);

    // 이미지
    const imgs = PRODUCT_PHOTOBOOK_OPT_IMGS;
    setProductImgs(imgs);
    setMainImg(imgs[0]?.img || "");
    setIsProductsImgsLoading(true);
  }, [productId]);

  /** ✅ 이미지 프리로드: productImgs가 바뀌면 카운트 리셋 */
  useEffect(() => {
    setLoadedImageCount(0);
    setIsImgsLoading(true);

    // 이미지가 0개면 로딩 종료 처리
    if (!productImgs || productImgs.length === 0) {
      setIsImgsLoading(false);
    }
  }, [productImgs]);

  const handleImageLoad = () => {
    setLoadedImageCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!productImgs || productImgs.length === 0) return;
    if (loadedImageCount >= productImgs.length) setIsImgsLoading(false);
  }, [loadedImageCount, productImgs]);

  /** ✅ nav guider 업데이트 */
  useEffect(() => {
    if (optSelectorY >= 0 && introductionY >= 0 && detailY >= 0 && reviewY >= 0) {
      setNavGuider([optSelectorY, introductionY, detailY, reviewY]);
    }
  }, [optSelectorY, introductionY, detailY, reviewY]);

  useEffect(() => {
    setUserGrade(sessionStorage.getItem("user_grades") || 0);
  }, [isProductsImgsLoading, isProductsInfoLoading]);

  return (
    <>
      {/* ✅ 이미지 프리로드 */}
      {productImgs.map((img, index) => (
        <ImgLoader
          key={index}
          src={img.img}
          alt={`Product Image ${index}`}
          onLoad={handleImageLoad}
          onError={handleImageLoad} // 에러여도 카운트 올려서 무한로딩 방지
        />
      ))}

      {isProductsInfoLoading && isProductsImgsLoading && !isImgsLoading && (
        <>
          <Container>
            <PhotobookOptSelector
              userGrade={userGrade}
              productImgs={productImgs}
              defaultPrice={defaultPrice}
              saleInfo={saleInfo}
              setSaleInfo={setSaleInfo}
              saleDetail={saleDetail}
              setSaleDetail={setSaleDetail}
              productInfo={productInfo}
              detailGuides={detailGuides}
              mainImg={mainImg}
              setMainImg={setMainImg}
              setShowLoginModal={setShowLoginModal}
              options={options}
              optFamily={optFamily}
              changeOptSelectorY={(y) => setOptSelectorY(y)}
            />

            <ProductNavBar navGuider={navGuider} />

            <PhotobookIntroduction
              introGuider={introGuider}
              changeIntroductionY={(y) => setIntroductionY(y)}
            />

            <ProductDetail
              detailTextGuider={detailTextGuider}
              changeDetailY={(y) => setDetailY(y)}
            />

            <ProductReview
              changeReviewY={(y) => setReviewY(y)}
              productName="포토북"
            />
          </Container>

          <Footer />
        </>
      )}

      {(!isProductsInfoLoading || !isProductsImgsLoading || isImgsLoading) && <LoadingPage />}
    </>
  );
}