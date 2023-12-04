import styled from "styled-components";
import HeaderBar from '../../../Components/CommonComponents/HeaderBar';
import NavBar from '../../../Components/CommonComponents/NavBar';
import Footer from '../../../Components/CommonComponents/Footer';
import LoadingPage from '../../LoadingPage';
import React, { useEffect, useState } from 'react';
import PhotobookOptSelector from "../../../Components/ProductPageComponents/Overviews/PhotobookOptSelector";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: rgb(250, 250, 250);
`

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
        [2.1, 1.4, 1],
        [1, 1.2],
        null,
        null,
        null,
    ]
};

export default function PhotobookOverviewPage({ setShowLoginModal }) {
    const productId = 1;
    const [isProductsInfoLoading, setIsProductInfoLoading] = useState(false);
    const [isProductsImgsLoading, setIsProductsImgsLoading] = useState(false);
    const [productImgs, setProductImgs] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [delPrice, setDelPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    const [mainImg, setMainImg] = useState('');

    const detailGuides = [
        ["페이지", "21페이지 ~ 최대 101페이지까지 추가 가능", "rgb(150, 150, 150)"],
        ["페이지 추가 가격", `1장당 ${productInfo.toLocaleString()}원`, "rgba(250, 50, 50, 0.7)"],
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
            setProductInfo(data.product);
            setIsProductInfoLoading(true);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsProductInfoLoading(false);
        });
    }

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

    return (
        <>
        {isProductsInfoLoading && isProductsImgsLoading &&
            <>
                <HeaderBar/>
                <NavBar />
                <Container>
                {/*<PhotobookOptSelector
                    productImgs={productImgs}
                    productInfo={productInfo}
                    mainImg={mainImg}
                    setMainImg={setMainImg}
                    setShowLoginModal={setShowLoginModal}
                    options={options}
                    optFamily={optFamily}
                />*/}
                </Container>
                <Footer />
            </>
        }
        {(!isProductsInfoLoading || !isProductsImgsLoading) &&
            <>
                <LoadingPage />
            </>
        }
        </>
    );
}