import styled from "styled-components";
import Footer from '../../../Components/CommonComponents/Footer';
import LoadingPage from '../../LoadingPage';
import React, { useEffect, useState } from 'react';
import PhotobookOptSelector from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookOptSelector";
import ProductNavBar from "../../../Components/ProductPageComponents/Overviews/ProductNavBar";
import PhotobookIntroduction from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookIntroduction"
import ProductDetail from "../../../Components/ProductPageComponents/Overviews/ProductDetail";
import ProductReview from "../../../Components/ProductPageComponents/Overviews/ProductReview";
import { optFamily, options, introGuider, detailTextGuider } from "../../../Components/ProductPageComponents/Overviews/photobook/PhotobookOptions";

const Container = styled.div`
    width: 100vw;
    height: 100%;
    background-color: rgb(250, 250, 250);
`
const ImgLoader = styled.img`
    opacity: 0;
    position: absolute;
    z-index: -10000;
`;

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

export default function PhotobookOverviewPage({ setShowLoginModal }) {
    const productId = 1;
    const [userGrade, setUserGrade] = useState(sessionStorage.getItem('user_grades') || 0);

    // 물품 정보
    const [isProductsInfoLoading, setIsProductInfoLoading] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [optPrice, setOptPrice] = useState(0);
    const [saleInfo, setSaleInfo] = useState(0);
    const detailGuides = [
        ["페이지", "21페이지 ~ 최대 101페이지까지 추가 가능", "rgb(150, 150, 150)"],
        ["페이지 추가 가격", `1장당 ${optPrice.toLocaleString()}원`, "rgba(250, 50, 50, 0.7)"],
        ["발송안내", year + "년 " + month + "월 " + date + "일" + "(" + day + ") 출고 예정", "rgba(250, 50, 50, 0.7)"],
        ["배송료", "3,000원 (5만원 이상 주문 시 무료)", "rgba(250, 50, 50, 0.7)"],
    ]

    function ProductInfoLoading() {
        fetch(`http://localhost:3001/api/products/optinfo`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }), // 물품 ID 전달
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 서버에서 받아온 데이터 처리
            setProductInfo(data.product[0]);
            setDefaultPrice(data.product[0].default_price);
            setOptPrice(data.product[0].opt_price);
            setSaleInfo(data.product[0].sale);
            setIsProductInfoLoading(true);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsProductInfoLoading(false);
        });
    }

    // 물품 이미지
    const [isProductsImgsLoading, setIsProductsImgsLoading] = useState(false);
    const [isImgsLoading, setIsImgsLoading] = useState(true);
    const [productImgs, setProductImgs] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [loadedImageCount, setLoadedImageCount] = useState(0);

    function ProductOptImgLoading() {
        fetch(`http://localhost:3001/api/products/opt-img-get`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }), // 물품 ID 전달
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            // 서버에서 받아온 데이터 처리
            setProductImgs(data.optImgs);
            setMainImg(data.optImgs[0].img);
            setIsProductsImgsLoading(true);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsProductsImgsLoading(false);
        });
    };

    useEffect(() => {
        ProductInfoLoading();
    }, [isProductsInfoLoading])
    useEffect(() => {
        ProductOptImgLoading();
    }, [isProductsImgsLoading]);

    const handleImageLoad = () => {
        // 각 이미지가 로딩될 때마다 호출되는 함수
        setLoadedImageCount(prevCount => prevCount + 1);
      };
    
      useEffect(() => {
        // 모든 이미지가 로딩되었는지 확인
        if (loadedImageCount === productImgs.length) {
          setIsImgsLoading(false);
        }
      }, [loadedImageCount, productImgs]);

    // 스크롤 이벤트
    const [navGuider, setNavGuider] = useState([104, 1056, 3750, 4764]);
    const [optSelectorY, setOptSelectorY] = useState(0);
    const [introductionY, setIntroductionY] = useState(0);
    const [detailY, setDetailY] = useState(0);
    const [reviewY, setReviewY] = useState(0);

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

    useEffect(() => {
        setUserGrade(sessionStorage.getItem('user_grades'));
    }, [isProductsImgsLoading, isProductsInfoLoading]);

    return (
        <>
        {productImgs.map((img, index) => (
            <ImgLoader
            key={index}
            src={img.img}
            alt={`Product Image ${index}`}
            onLoad={handleImageLoad}
            />
        ))}
        {isProductsInfoLoading && isProductsImgsLoading && !isImgsLoading &&
            <>
                <Container>
                <PhotobookOptSelector
                    userGrade={userGrade}
                    productImgs={productImgs}
                    defaultPrice={defaultPrice}
                    saleInfo={saleInfo}
                    setSaleInfo={setSaleInfo}
                    productInfo={productInfo}
                    detailGuides={detailGuides}
                    mainImg={mainImg}
                    setMainImg={setMainImg}
                    setShowLoginModal={setShowLoginModal}
                    options={options}
                    optFamily={optFamily}
                    changeOptSelectorY={handleOptSelectorYChange}
                />
                <ProductNavBar 
                    navGuider={navGuider}
                />
                <PhotobookIntroduction
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
        }
        {(!isProductsInfoLoading || !isProductsImgsLoading || isImgsLoading) &&
            <>
                <LoadingPage />
            </>
        }
        </>
    );
}