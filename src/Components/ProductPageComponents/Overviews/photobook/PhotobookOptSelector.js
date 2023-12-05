import { useState, useEffect, useRef } from "react";
import ErrorDiv from "../../../ErrorDiv";
import * as S from '../ProductOptSelectorStyle';
import { useNavigate } from 'react-router-dom';
import { OptionPriceCalculator, PhotobookMainImgSetter } from "../PriceEtc";

function filteredChildOptions(options, delChild) {
    const filteredOptions = options.filter((option, index) => index !== delChild);
    return filteredOptions;
}

export default function PhotobookOptSelector({ 
    options, optFamily, detailGuides, setShowLoginModal, userGrade,
    productImgs, mainImg, setMainImg,
    productInfo, defaultPrice, saleInfo, setSaleInfo,
    changeOptSelectorY
}) {
    const navigate = useNavigate();
    const productOptSelectorRef = useRef(null);
    const [selectedOptionIndexes, setSelectedOptionIndexes] = useState([0, 0, 0, 0, 0]);
    const [imgCounter, setImgCounter] = useState(0);
    const [productQuantity, setProductQuantity] = useState(1);
    
    // 물품 가격
    const [delPrice, setDelPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        if (userGrade >= 2 && userGrade <= 5 && productInfo) {
            setSaleInfo(productInfo.sale > ((userGrade-2)*5 + 10) ? productInfo.sale : (userGrade-2)*5 + 10 );
        } else if (productInfo) {
            setSaleInfo(productInfo.sale);
        }
    }, [defaultPrice, userGrade, productQuantity, productInfo]);

    useEffect(() => {
        let sizeOperator = optFamily.priceModifier[0][0];
        let coverOperator = optFamily.priceModifier[1][0];
        let sizePrice = optFamily.priceModifier[0][selectedOptionIndexes[0]+1];
        let coverPrice = optFamily.priceModifier[1][selectedOptionIndexes[1]+1];
        setDelPrice(OptionPriceCalculator(OptionPriceCalculator(defaultPrice*productQuantity, coverOperator, coverPrice), sizeOperator, sizePrice));
       if (saleInfo === 0) {
        setFinalPrice(delPrice);
       } else {
        setFinalPrice(OptionPriceCalculator(OptionPriceCalculator(defaultPrice*(100-saleInfo)/100*productQuantity, coverOperator, coverPrice), sizeOperator, sizePrice));
       }    
    }, [defaultPrice, userGrade, saleInfo, productQuantity, selectedOptionIndexes]);
    
    // 스크롤 이벤트
    const handleScroll = () => {
        if (productOptSelectorRef.current) {
            const OptSelectorY = productOptSelectorRef.current.getBoundingClientRect().top + window.scrollY;
            changeOptSelectorY(OptSelectorY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 옵션 클릭
    const handleOptionClick = (parentIndex, childIndex) => {
        const newSelectedOptionIndexes = [...selectedOptionIndexes];
        newSelectedOptionIndexes[parentIndex] = childIndex;
        setSelectedOptionIndexes(newSelectedOptionIndexes);
        setImgCounter(imgCounter+1);
    };

    useEffect(() => {
        setMainImg(PhotobookMainImgSetter( selectedOptionIndexes, productImgs ));
    }, [imgCounter]);

    // 파일 수정 가기 전
    function uploadSetting() {
        const loginCheck = sessionStorage.getItem('isLoggedIn') === 'true';
        if (loginCheck) {
            addToCart();
        } else {
            setShowLoginModal(true);
        }
    }  
    function addToCart() {
        sessionStorage.setItem('cart_option', selectedOptionIndexes);
        sessionStorage.setItem('cart_product_name', productInfo.product_name);
        sessionStorage.setItem('default_price', defaultPrice);
        sessionStorage.setItem('del_price', delPrice/productQuantity);
        sessionStorage.setItem('final_price', finalPrice/productQuantity);
        sessionStorage.setItem('sale_info', saleInfo);
        sessionStorage.setItem('product_quantity', productQuantity);
        navigate('/photobook-design');
    };


    return(
        <>
            <S.OptSelectContainer ref={productOptSelectorRef}>
                {productImgs.length > 0 && <S.MainImg src={mainImg} />}
                {productImgs.length < 1 && <ErrorDiv wid="752px" hei="752px" isBck/>}
                <S.ProductOptSelector>
                    {productInfo &&  <S.OptTitle>{productInfo.product_name}</S.OptTitle>}
                    {!productInfo && <S.OptTitle>상품 정보를 찾아올 수 없습니다</S.OptTitle>}
                    {options.map((item, index) => (
                        <S.DetailOpt key={index}
                            style={{ display: (index === optFamily.childOpts.childOpt1 && selectedOptionIndexes[optFamily.parentsOpt] === 1) ||
                            (index === optFamily.childOpts.childOpt2 && selectedOptionIndexes[optFamily.parentsOpt] === 0)
                            ? 'none' : 'block' }}
                        >
                            <S.DetailTitle>{item[0]}</S.DetailTitle>
                            <div>
                                {filteredChildOptions(item, 0).map((optItem, optIndex) => {
                                    const isSelected = optIndex === selectedOptionIndexes[index];
                                    return (
                                        <S.OptSelectBtn
                                            key={optIndex}
                                            className={isSelected ? 'sel' : ''}
                                            onClick={() => handleOptionClick(index, optIndex)}
                                        >
                                            {optItem}
                                        </S.OptSelectBtn>
                                    );
                                })}
                            </div>
                        </S.DetailOpt>
                    ))}
                    <S.DetailOpt style={{borderBottom:"1px solid rgba(40, 40, 40, 0.2)"}}>
                        <S.DetailTitle>수량</S.DetailTitle>
                        <div>        
                            <S.Counter>
                                <button onClick={() => productQuantity < 5 && setProductQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                                <S.NumSelector 
                                    type="input"
                                    value={productQuantity}
                                    readOnly
                                />
                                <button onClick={() => productQuantity > 1 && setProductQuantity(prevQuantity => prevQuantity - 1)}>-</button>
                            </S.Counter>
                        </div>       
                    </S.DetailOpt>
                    <S.PriceViewer>
                        <p style={{fontWeight: 800}}>총 금액 </p> 
                        <p>
                            {saleInfo > 0 &&
                                <del>{delPrice.toLocaleString('ko-KR')}원</del>
                            }
                            <b
                                style={{ color: saleInfo>0 ? 'rgba(250, 50, 50, 0.7)' : 'rgb(60, 60, 60)' }}
                            >{finalPrice.toLocaleString('ko-KR')}원</b>
                            {saleInfo > 0 &&
                                <b>&#91;{saleInfo}%할인&#93;</b>
                            }
                        </p>        
                    </S.PriceViewer>
                    <S.PurchaseBtn type="button" onClick={uploadSetting}>만들러가기</S.PurchaseBtn>
                    <S.DetailGuider>
                    {detailGuides.map(([title, content, fontColor], index) => (
                        <li key={index}>
                            <p>{title}</p>
                            <p style={{ color: fontColor }} >{content}</p>
                        </li>
                    ))}
                    </S.DetailGuider>
                </S.ProductOptSelector>
            </S.OptSelectContainer>
        </>
    )
}