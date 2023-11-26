import { useState, useEffect, useRef } from "react";
import ErrorDiv from "../../ErrorDiv";
import * as S from '../OverviewPage/ProductOptSelectorStyle';
import ErrorModal from "../../Modal/ErrorModal";
import { useNavigate } from 'react-router-dom';
import Login from "../../AcountManagement/Login";

function filteredChildOptions(options, delChild) {
    const filteredOptions = options.filter((option, index) => index !== delChild);
    return filteredOptions;
}

export default function PhotobookOptSelector({ productId, options, optFamily, userGrade, detailGuides, changeOptSelectorY, setOptPrice }) {
    const [mainImg, setMainImg] = useState('');
    const [productImgs, setProductImgs] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [isProductsInfoLoading, setIsProductsInfoLoading] = useState(false);
    const [isProductsImgsLoading, setIsProductsImgsLoading] = useState(false);
    const [selectedOptionIndexes, setSelectedOptionIndexes] = useState([0, 0, 0, 0, 0]);
    const [imgCounter, setImgCounter] = useState(0);
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(1);
    const navigate = useNavigate();
    const [delPrice, setDelPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [saleInfo, setSaleInfo] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false); // 에러메시지 on/off
    const [errCode, setErrCode] = useState(''); // 에러코드
    const productOptSelectorRef = useRef(null);

    useEffect(() => {
        setDelPrice(defaultPrice*productQuantity);
        if (userGrade >= 2 && userGrade <= 5 && productsInfo && productsInfo.length > 0) {
            setSaleInfo(productsInfo[0].sale > ((userGrade-2)*5 + 10) ? productsInfo[0].sale : (userGrade-2)*5 + 10 );
        } else if (productsInfo && productsInfo.length > 0) {
            setSaleInfo(productsInfo[0].sale);
        }
    }, [defaultPrice, userGrade, productQuantity]);

    useEffect(() => {
        let sizeOption = optFamily.priceModifier[0][selectedOptionIndexes[0]];
        let coverOption = optFamily.priceModifier[1][selectedOptionIndexes[1]];
        setDelPrice(defaultPrice*productQuantity*sizeOption*coverOption);
       if (saleInfo === 0) {
        setFinalPrice(defaultPrice*productQuantity*sizeOption*coverOption);
       } else {
        setFinalPrice(defaultPrice*(100-saleInfo)/100*productQuantity*sizeOption*coverOption);
       }    
    }, [defaultPrice, userGrade, saleInfo, productQuantity, selectedOptionIndexes]);
    
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

    const handleOptionClick = (parentIndex, childIndex) => {
        const newSelectedOptionIndexes = [...selectedOptionIndexes];
        newSelectedOptionIndexes[parentIndex] = childIndex;
        setSelectedOptionIndexes(newSelectedOptionIndexes);
        setImgCounter(imgCounter+1);
    };
  
    function listProductInfo() {
        fetch(`http://localhost:3001/api/products/optinfo`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
            // 서버에서 받아온 데이터 처리
                setProductsInfo(data.products);
                setDefaultPrice(data.products[0].default_price);
                setOptPrice(data.products[0].opt_price);
                setIsProductsInfoLoading(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsProductsInfoLoading(false);
            });
        }

    function listOptImgs() {
        fetch(`http://localhost:3001/api/products/optimgget`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
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

    function mainImgSetter() {
        let newMainImg = '';
        if (isProductsImgsLoading) {
            if (selectedOptionIndexes[1] === 0) {
                if (selectedOptionIndexes[2] === 0) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[0].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[1].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[2].img;};
                } else if (selectedOptionIndexes[2] === 1) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[3].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[4].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[5].img;};
                }
            } else if (selectedOptionIndexes[1] === 1) {
                if (selectedOptionIndexes[3] === 0) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[6].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[7].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[8].img;};
                } else if (selectedOptionIndexes[3] === 1) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[9].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[10].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[11].img;};
                } else if (selectedOptionIndexes[3] === 2) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[12].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[13].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[14].img;};
                } else if (selectedOptionIndexes[3] === 3) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[15].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[16].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[17].img;};
                } else if (selectedOptionIndexes[3] === 4) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[18].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[19].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[20].img;};
                } else if (selectedOptionIndexes[3] === 5) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[21].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[22].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[23].img;};
                } else if (selectedOptionIndexes[3] === 6) {
                    if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[24].img;} else
                    if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[25].img;} else
                    if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[26].img;};
                }
            }
        }
        setMainImg(newMainImg);
    }

    function uploadSetting() {
        const loginCheck = sessionStorage.getItem('isLoggedIn') === 'true';
        if (loginCheck) {
            addToCart();
        } else {
            setShowLoginModal(true);
        }
    }  

    function addToCart() {
        // 서버로 삼품 정보를 전송
        const cartData = {
            product_name: productsInfo[0].product_name,
            option: selectedOptionIndexes,
            price: finalPrice,
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
                    sessionStorage.setItem('cart_id', data.cart_id);
                    sessionStorage.setItem('default_price', defaultPrice);
                    sessionStorage.setItem('del_price', delPrice/productQuantity);
                    sessionStorage.setItem('final_price', finalPrice/productQuantity);
                    sessionStorage.setItem('sale_info', saleInfo);
                    sessionStorage.setItem('product_quantity', productQuantity);
                    navigate('/productlist/photobook/photobook/design');
                }
            } else {
                console.error('오류:', data.error);
                setErrCode('CT01 : 데이터베이스 저장 오류');
                setShowErrorModal(true);
            }
        })
        .catch((error) => {
        console.error('오류:', error);
        setErrCode('CT02 : 데이터베이스 저장 오류');
        setShowErrorModal(true);
        });
    };

    useEffect(() => {
        listProductInfo();
        listOptImgs();
        mainImgSetter();
    }, [isProductsImgsLoading || isProductsInfoLoading]);

    useEffect(() => {
        mainImgSetter();
    }, [imgCounter]);

    return(
        <>
            <S.OptSelectContainer ref={productOptSelectorRef}>
                {productImgs.length > 0 && <S.MainImg src={mainImg} />}
                {productImgs.length < 1 && <ErrorDiv wid="752px" hei="752px" isBck/>}
                <S.ProductOptSelector>
                    {productsInfo && productsInfo.length > 0 && <S.OptTitle>{productsInfo[0].product_name}</S.OptTitle>}
                    {!productsInfo && <S.OptTitle>상품 정보를 찾아올 수 없습니다</S.OptTitle>}
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
            <ErrorModal 
                showErrorModal={showErrorModal}
                setShowErrorModal={setShowErrorModal}
                errCode={errCode}
                setErrCode={setErrCode}
            />
                <Login 
                    showModal={showLoginModal}
                    setShowModal={setShowLoginModal}
                />
        </>
    )
}