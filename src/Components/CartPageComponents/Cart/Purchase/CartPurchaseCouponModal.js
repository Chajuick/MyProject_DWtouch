import * as MS from "../../../Modal/ModalStyle";
import styled from "styled-components";
import { CategoryConvert, OptionConvert, SaleCalculator } from "./PurchaseConverter";
import { useEffect, useState } from "react";

const CouponModalContainer = styled.div`
  display: flex;
  width: 700px;
  max-height: 90vh;
  padding: 0 30px;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255);
  overflow-y: scroll;
`;

const CouponModalHeader = styled.div`
  margin-top: 40px;
  width: 100%;
  margin-bottom: 20px;
  h3 {
    font-size: 18px;
    color: rgb(80, 80, 80);
  }
`;

const ProductList = styled.ul`
  list-style: none;
  width: 100%;
  border-top: 1px solid rgb(80, 80, 80);
  padding: 40px 30px 20px;
  background-color: rgb(255, 250, 250);
  &>li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const ProductName = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  align-items: end;
  font-size: 15px;
  text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  color: rgb(40, 40, 40);
  p:first-child {
    margin-right: 5px;
  }
  span {
    font-size: 14px;
    color: rgb(150, 150, 150);
  }
`;

const ProductPrice = styled.p`
  del {
    font-size: 12px;
    color: rgb(150, 150, 150);
  }
  span {
    margin-left: 8px;
    font-size: 14px;
    color: rgba(250, 50, 50, 1);
    transition: all 400ms;
  }
`;

const CouponSelectBar = styled.div`
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(200, 200, 200);
  position: relative;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(80, 80, 80);
  transition: all 400ms;
  span.drop_down {
    padding: 4px;
    font-size: 10px;
  }
  span {
    b {
      margin-left: 10px;
      font-size: 13px;
      color: rgba(250, 50, 50, 0.8);
      font-weight: 400;
    }
  }
  &:hover {
    cursor: pointer;
    color: rgb(120, 120, 120);
  }
`;

const CouponOpionList = styled.ul`
  width: 100%;
  list-style: none;
  border: 1px solid rgb(150, 150, 150);
  overflow: hidden;
  position: absolute;
  max-height: ${props => props.$isShow? '2000px' : '0' };
  opacity: ${props => props.$isShow? 1 : 0 };
  transition: all 400ms;
  top: 45px;
  right: 0;
  z-index: 110000;
  li {
    width: 100%;
    font-size: 14px;
    color: rgb(120, 120, 120);
    padding: 10px;
    border-top: 1px solid rgb(200, 200, 200);
    background-color: rgb(255, 255, 255);
    transition: all 400ms;
    display: flex;
    justify-content: left;
    span {
      margin-left: 10px;
      color: rgba(250, 50, 50, 0.8);
      font-size: 13px;
    }
  }
  li:first-child {
    border: none;
  }
  li.sel {
    color: rgb(40, 40, 40);
    text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  }
  li:hover {
    color: rgb(80, 80, 80);
    cursor: pointer;
    p {
      text-underline-offset: 3px;
      text-decoration: underline;
    }
  }
`;

const PriceCheck = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 80px;
  h3 {
    font-size: 18px;
    color: rgb(80, 80, 80);
    margin-bottom: 20px;
  }
`;

const PriceCheckBox = styled.div`
  border-top: 1px solid rgb(80, 80, 80);
  border-bottom: 1px solid rgb(220, 220, 220);
  padding: 40px 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: #191919;
      font-size: 14px;
      margin-bottom: 10px;
    }
    span:last-child {
      font-size: 15px;
      color: #e5362c;
    }
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    border: 1px solid rgb(120, 120, 120);
    background-color: rgb(120, 120, 120);
    color: rgb(250, 250, 250);
    span {
      margin-bottom: 3px;
    }
  }
  p:nth-child(2) {
    background-color: rgb(255, 255, 255);
    color: rgb(120, 120, 120);
  }
`;

const EtcMes = styled.p`
  width: 100%;
  margin-top: 10px;
  font-size: 13px;
  color: rgb(150, 150, 150);
`;

const ButtonWrapper = styled.div`
  width: 30%;
  margin: 30px 0 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    padding: 10px 14px;
    color: rgb(40, 40, 40);
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(40, 40, 40);
    transition: all 400ms;
    cursor: pointer;
  }
  button:hover {
    background-color: rgb(40, 40, 40);
    color: rgb(255, 255, 255);
  }
  button:last-child {
    background-color: rgb(40, 40, 40);
    color: rgb(255, 255, 255);
  }
  button:last-child:hover {
    color: rgb(40, 40, 40);
    background-color: rgb(255, 255, 255);
  }
`;

export default function CartPurchaseCouponModal({ showProductCouponModal, setShowProductCouponModal, userCouponInfo, purchaseInfo, setPurchaseInfo, setCouponInfoFIxed,
totalSaleAmount, setTotalSaleAmount, totalPurchasePrice, setTotalPurchasePrice, totalDefaultPrice, setTotalDefaultPrice, setUsedCouponAmount  }) {
  const [priceInfo, setPriceInfo] = useState([]);
  const [usableCouponArr, setUsableCouponArr] = useState([]);
  const [visibleCouponInfo, setVisibleCouponInfo] = useState(-1);
  const [selectedCouponInfo, setSelectedCouponInfo] = useState([]);
  const [tempTotalPrice, setTempTotalPrice] = useState({
    defaultPrice: 0,
    saleAmount: 0,
    finalPrice: 0,
  });

  useEffect(() => {
    setPriceInfo([...purchaseInfo]);
    // purchaseInfo가 변경될 때마다 실행
    let totalDefaultPrice = 0;
    let totalSaleAmount = 0;
    let totalFinalPrice = 0;
    // purchaseInfo 배열을 순회하면서 각 항목의 값들을 누적
    purchaseInfo.forEach((item) => {
      totalDefaultPrice += item.purchase_default_price * item.puchase_product_quantity;
      totalSaleAmount += item.sale_amount;
      totalFinalPrice += item.purchase_default_price * item.puchase_product_quantity + item.sale_amount;
    });
    // setTempTotalPrice를 사용하여 상태 업데이트
    setTempTotalPrice({
      defaultPrice: totalDefaultPrice,
      saleAmount: totalSaleAmount,
      finalPrice: totalFinalPrice,
    });
  }, [purchaseInfo]);
  
  function loadUsableCouponList() {
    // purchaseInfo의 각 항목에 대한 usableCouponList 생성
    const usableCouponList = purchaseInfo.map((purchaseItem) => {
      // sale_detail에 해당하는 userCouponInfo 필터링
      const saleDetailCoupons = userCouponInfo.filter((coupon) => {
        return ((coupon.coupons_product_category === CategoryConvert(purchaseItem.product_name)) || coupon.coupons_product_category === 1) &&
        coupon.coupons_type === 0;
      });
  
      // 해당 purchaseItem에 대한 usableCouponList 생성
      const itemUsableCouponList = [
        { coupons_name: purchaseItem.sale_detail, coupons_sale_amount: purchaseItem.sale_amount, isDefault: true, used: false },
        ...saleDetailCoupons.map((coupon) => ({ 
          coupons_name: `[${coupon.coupons_name}] ${coupon.coupons_detail}`,
          coupons_sale_amount: SaleCalculator(purchaseItem.purchase_default_price*purchaseItem.puchase_product_quantity, coupon.coupons_discount_limit, coupon.coupons_discount_amount),
          isDefault: false,
          used: coupon.used,
          coupons_uid: coupon.coupons_uid,
        })),
      ];
  
      return itemUsableCouponList;
    });
    const zeroArray = new Array(purchaseInfo.length).fill(0);
    setSelectedCouponInfo(zeroArray);
    setUsableCouponArr(usableCouponList);
  };

  useEffect(() => {
    loadUsableCouponList();
  }, [userCouponInfo]);

  function handleToggleSelectBar(index) {
    if (visibleCouponInfo === index) {
      setVisibleCouponInfo(-1);
    } else {
      setVisibleCouponInfo(index);
    }
  };

  function handleSelectCouponIndex(index, couponIndex) {
    // selectedCouponInfo 배열의 복사본을 만들어 수정
    const updatedSelectedCouponInfo = [...selectedCouponInfo];
    // 주어진 index 위치의 값을 couponIndex로 업데이트
    updatedSelectedCouponInfo[index] = couponIndex;
    // 업데이트된 배열을 상태로 설정
    setSelectedCouponInfo(updatedSelectedCouponInfo);
  
    // 이전에 선택된 쿠폰의 coupons_uid 값 받아오기
    const prevSelectedCouponUid = usableCouponArr[index][selectedCouponInfo[index]].coupons_uid;
  
    // userCouponInfo 배열의 복사본을 만들어 수정
    const updatedUserCouponInfo = [...usableCouponArr];
    // coupons_uid 값을 가진 행을 찾아 used 값을 true로 수정
    const couponUidToUpdate = usableCouponArr[index][couponIndex].coupons_uid;
    // usableCouponArr 배열을 순회하면서 조건 확인
    updatedUserCouponInfo.forEach((row) => {
      row.forEach((coupon) => {
        if (coupon.coupons_uid === couponUidToUpdate) {
          if (!usableCouponArr[index][couponIndex].isDefault) {
            coupon.used = true;
          }
        } else if (coupon.coupons_uid === prevSelectedCouponUid) {
          coupon.used = false; // 이전에 선택된 쿠폰의 used 값을 false로 변경
        }
      });
    });

    if (priceInfo.length > 0) {
      const changedPriceInfo = priceInfo.map((changeItem, changeIndex) => {
        if (changeIndex === index) {
          // 변경이 필요한 항목에 대해서만 업데이트
          return {
            ...changeItem,
            used_coupon: usableCouponArr[index][couponIndex].coupons_uid || 0,
            purchase_final_price: (changeItem.purchase_default_price*changeItem.puchase_product_quantity) + usableCouponArr[index][couponIndex].coupons_sale_amount,
            purchase_price: parseInt((((changeItem.purchase_default_price*changeItem.puchase_product_quantity) + usableCouponArr[index][couponIndex].coupons_sale_amount)/changeItem.puchase_product_quantity)/10)*10,
            sale_amount: usableCouponArr[index][couponIndex].coupons_sale_amount,
            sale_detail: usableCouponArr[index][couponIndex].coupons_name,
          };
        }
        return changeItem; // 변경이 필요 없는 항목은 그대로 유지
      });

      const totalSaleAmount = changedPriceInfo.reduce((total, updateItem) => total + updateItem.sale_amount, 0);
      const totalFinalPrice = changedPriceInfo.reduce((total, updateItem) => total + updateItem.purchase_final_price, 0);
      const totalDefaultPrice = changedPriceInfo.reduce((total, updateItem) => total + (updateItem.purchase_default_price*updateItem.puchase_product_quantity), 0);
    
      setTempTotalPrice({
        defaultPrice: totalDefaultPrice,
        saleAmount: totalSaleAmount,
        finalPrice: totalFinalPrice,
      });
      setPriceInfo(changedPriceInfo);
    }

    // 변경된 배열을 다시 상태로 설정
    setUsableCouponArr(updatedUserCouponInfo);
  };

  function handleCouponApply() {
    const updatePurchaseInfo = [...priceInfo];
    setPurchaseInfo(updatePurchaseInfo);
    setTotalDefaultPrice(tempTotalPrice.defaultPrice);
    setTotalPurchasePrice(tempTotalPrice.finalPrice);
    setTotalSaleAmount(tempTotalPrice.saleAmount);
    setCouponInfoFIxed(false);
    setShowProductCouponModal(false);
    // selectedCouponInfo 배열 중 0이 아닌 값들의 개수 찾기
    const usedCouponCount = selectedCouponInfo.filter(value => value !== 0).length;
    // usedCouponCount 만큼 setUsedCouponAmount 호출
    setUsedCouponAmount(usedCouponCount);
  };
  
  return (
    <>
    <MS.Overlay $showModal={showProductCouponModal}/>
      <MS.HeaderModal $showModal={showProductCouponModal}>
        <div className="modalHeader">
          <h2>쿠폰 변경</h2>
          <MS.HeaderModalCloseBtn onClick={() => setShowProductCouponModal(false)}>&times;</MS.HeaderModalCloseBtn>
        </div>
        <CouponModalContainer>
          <CouponModalHeader>
            <h3>상품할인</h3>
          </CouponModalHeader>
          <ProductList>
          {priceInfo && priceInfo.length > 0 && priceInfo.map((item, index) => (
            <li key={index}>
              <ProductInfo>
                <ProductName>
                  <p>{item.product_name}&nbsp;[{item.cart_name.length >= 5 ? `${item.cart_name.slice(0, 5)}...` : item.cart_name}]</p>
                  {item.cart_option.length > 0 && OptionConvert(item.product_name, item.cart_option).map((optionItem, index) => (
                  <span key={index}>{index === 0 ? optionItem : "-" + optionItem}</span>
                  ))
                  }
                </ProductName>
                <ProductPrice>
                  <del>{(item.purchase_default_price*item.puchase_product_quantity).toLocaleString()}원</del>
                  <span>{(item.purchase_default_price*item.puchase_product_quantity+item.sale_amount).toLocaleString()}원</span>
                </ProductPrice>
              </ProductInfo>
              <CouponSelectBar onClick={() => handleToggleSelectBar(index)}>
                  {usableCouponArr && usableCouponArr.length > 0 ?
                    <span>{usableCouponArr[index][selectedCouponInfo[index]].coupons_name}<b>{usableCouponArr[index][selectedCouponInfo[index]].coupons_sale_amount.toLocaleString()}원</b></span>
                    :
                    <span>-</span>
                  }
                  <span className="drop_down">{visibleCouponInfo === index? "▲" : "▼"}</span>
                  <CouponOpionList $isShow={visibleCouponInfo === index}>
                      {usableCouponArr && usableCouponArr.length > 0 && usableCouponArr[index].map((coupon, couponIndex) => (
                        <li 
                          key={couponIndex}
                          onClick={() => handleSelectCouponIndex(index, couponIndex)}
                          className={selectedCouponInfo[index] == couponIndex? 'sel' : ''}
                          style={{ visibility: selectedCouponInfo[index] !== couponIndex && coupon.used? "hidden" : "visible", 
                                   maxHeight:  selectedCouponInfo[index] !== couponIndex && coupon.used? "0px" : "1000px", 
                                   padding:  selectedCouponInfo[index] !== couponIndex && coupon.used? "0px" : "10px"  }}
                        >
                          <p>
                            {coupon.coupons_name}
                          </p>
                          <span>
                            {coupon.coupons_sale_amount.toLocaleString()}원
                          </span>
                        </li>
                      ))}
                  </CouponOpionList>
              </CouponSelectBar>
            </li>
          ))}
          </ProductList>
          <PriceCheck>
            <h3>결제 예정 금액</h3>
            <PriceCheckBox>
                <div>
                  <span>상품 금액</span>
                  <span>{tempTotalPrice.defaultPrice.toLocaleString()}원</span>
                </div>
                <p className="minus"><span>-</span></p>
                <div>
                  <span>상품 할인</span>
                  <span>{Math.abs(tempTotalPrice.saleAmount).toLocaleString()}원</span>
                </div>
                <p className="equal"><span>=</span></p>
                <div>
                  <span>결제 예정 금액</span>
                  <span>{tempTotalPrice.finalPrice.toLocaleString()}원</span>
                </div>
            </PriceCheckBox>
          </PriceCheck>
          <EtcMes>사용 가능한 쿠폰만 보여집니다.</EtcMes>
          <ButtonWrapper>
            <button onClick={() => setShowProductCouponModal(false)}>취소</button>
            <button onClick={handleCouponApply}>쿠폰 적용</button>
          </ButtonWrapper>
        </CouponModalContainer>
      </MS.HeaderModal>
    </>
  )
}
