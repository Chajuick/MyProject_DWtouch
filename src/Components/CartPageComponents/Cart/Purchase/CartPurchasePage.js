import { useEffect, useState } from "react";
import styled from "styled-components";

import CartPurchaseInfo from "./CartPurchaseInfo";
import CartPurchaseList from "./CartPurchaseList";
import CartPurchaseSection from "./CartPurchaseSection";
import LoadingPage from "../../../../PageComonents/LoadingPage";

const BelowContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

export default function CartPurchasePage({ checkCartInfo }) {
  const [purchaseInfo, setPurchaseInfo] = useState(0);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalDefaultPrice, setTotalDefaultPrice] = useState(0);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [endPaymentPrice, setEndPaymnetPorice] = useState(0);
  const [couponInfoFixed, setCouponInfoFIxed] = useState(true);

  useEffect(() => {
    if (checkCartInfo.length > 0 && couponInfoFixed) {
      const updatedcheckCartInfo = checkCartInfo.map((item, index) => ({
        ...item,
        cart_id: item.cart_id,
        cart_name: item.cart_name,
        cart_option: item.cart_option,
        product_name: item.cart_product_name,
        purchase_default_price: item.cart_default_price,
        purchase_price: item.cart_price,
        purchase_final_price: item.cart_price * item.cart_product_quantity,
        puchase_product_quantity: item.cart_product_quantity,
        sale_amount: (item.cart_price * item.cart_product_quantity) - (item.cart_default_price * item.cart_product_quantity),
        sale_detail: item.cart_sale_detail,
      }));
      
      const totalSale = updatedcheckCartInfo.reduce((total, item) => total + item.sale_amount, 0);
      const totalPrice = updatedcheckCartInfo.reduce((total, item) => total + item.purchase_final_price, 0);
      setTotalDefaultPrice(totalPrice-totalSale);
      setTotalSaleAmount(totalSale);
      setTotalPurchasePrice(totalPrice);
      setEndPaymnetPorice(totalPrice);
      setPurchaseInfo(updatedcheckCartInfo);
    }
  }, [checkCartInfo]);

  // 유저 쿠폰 정보
  const [userCouponInfo, setUserCouponInfo] = useState([]);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [deliveryCouponInfo, setDeliveryCouponInfo] = useState([]);

  function loadUserCouponInfo() {
    const userUID = sessionStorage.getItem('user_uid' || 0);
    // 서버로 POST 요청 보내기
    fetch('http://localhost:3001/api/coupon-point/user-coupon-loading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userUID }),
    })
      .then(response => response.json())
      .then(data => {
      // 각 배열에 used 항목 추가
      const modifiedUserCouponInfo = data.userCouponResults.flat().map(coupon => ({ ...coupon, used: false }));
      setUserCouponInfo(modifiedUserCouponInfo);
      // userCouponInfo 배열 중 coupons_type이 1인 항목만 필터링하여 새로운 배열 생성
      const filteredUserCouponInfo = modifiedUserCouponInfo.filter(coupon => coupon.coupons_type === 1);
      setDeliveryCouponInfo(filteredUserCouponInfo);
      setIsCouponLoading(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  console.log(deliveryCouponInfo);

  useEffect(() => {
    loadUserCouponInfo();
  },[isCouponLoading]);

  // 포인트 및 배송료
  const [userPoints, setUserPoints] = useState(sessionStorage.getItem('user_points') || 0);
  const [remainPoints, setRemainPoints] = useState(sessionStorage.getItem('user_points') || 0);
  const [usingPoints, setUsingPoints] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(3000);
  const [usedCouponAmount, setUsedCouponAmount] = useState(0);

  useEffect(() => {
    setEndPaymnetPorice(totalPurchasePrice - usingPoints);
  }, [usingPoints, totalPurchasePrice])

  return (
    <>
      {purchaseInfo.length > 0 && isCouponLoading &&
        <>
          <CartPurchaseList 
            purchaseInfo={purchaseInfo}
          />
          <BelowContainer>
            <CartPurchaseInfo
              userPoints={userPoints}
              remainPoints={remainPoints}
              setRemainPoints={setRemainPoints}
              usingPoints={usingPoints}
              setUsingPoints={setUsingPoints}
              purchaseInfo={purchaseInfo}
              setPurchaseInfo={setPurchaseInfo}
              totalSaleAmount={totalSaleAmount}
              setTotalSaleAmount={setTotalSaleAmount}
              totalPurchasePrice={totalPurchasePrice}
              setTotalPurchasePrice={setTotalPurchasePrice}
              totalDefaultPrice={totalDefaultPrice}
              setTotalDefaultPrice={setTotalDefaultPrice}
              userCouponInfo={userCouponInfo}
              setUserCouponInfo={setUserCouponInfo}
              deliveryCouponInfo={deliveryCouponInfo}
              setDeliveryCouponInfo={setDeliveryCouponInfo}
              setCouponInfoFIxed={setCouponInfoFIxed}
              deliveryPrice={deliveryPrice}
              setDeliveryPrice={setDeliveryPrice}
              usedCouponAmount={usedCouponAmount}
              setUsedCouponAmount={setUsedCouponAmount}
            />
            <CartPurchaseSection 
              totalDefaultPrice={totalDefaultPrice}
              totalSaleAmount={totalSaleAmount}
              totalPurchasePrice={totalPurchasePrice}
              usingPoints={usingPoints}
              deliveryPrice={deliveryPrice}
              endPaymentPrice={endPaymentPrice}
            />
          </BelowContainer>
        </>
      }
      {purchaseInfo.length < 1 && isCouponLoading &&
        <LoadingPage />
      }
    </>
  )
};