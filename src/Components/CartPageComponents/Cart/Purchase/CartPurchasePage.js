import { useEffect, useState } from "react";

import CartPurchaseInfo from "./CartPurchaseInfo";
import CartPurchaseList from "./CartPurchaseList";

export default function CartPurchasePage({ checkCartInfo }) {
  const [purchaseInfo, setpurchaseInfo] = useState(0);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  
  useEffect(() => {
    if (checkCartInfo.length > 0) {
      const updatedcheckCartInfo = checkCartInfo.map((item, index) => ({
        cart_id: item.cart_id,
        cart_name: item.cart_name,
        cart_option: item.cart_option,
        product_name: item.cart_product_name,
        purchase_default_price: item.cart_default_price,
        purchase_price: item.cart_price,
        purchase_final_price: item.cart_price * item.cart_product_quantity,
        puchase_product_quantity: item.cart_product_quantity,
        sale_amount: (item.cart_price * item.cart_product_quantity) - (item.cart_default_price * item.cart_product_quantity),
      }));
      
      const totalSale = updatedcheckCartInfo.reduce((total, item) => total + item.sale_amount, 0);
      const totalPrice = updatedcheckCartInfo.reduce((total, item) => total + item.final_price, 0);
      setTotalSaleAmount(totalSale);
      setTotalPurchasePrice(totalPrice);
      setpurchaseInfo(updatedcheckCartInfo);
    }
  }, [checkCartInfo]);

  // 유저 쿠폰 정보
  const [userCouponInfo, setUserCouponInfo] = useState([]);
  const [couponInfo, setCouponInfo] = useState([]);
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  function loadUserCouponInfo() {
    const userUid = sessionStorage.getItem('user_uid' || 0);
    // 서버로 POST 요청 보내기
    fetch('http://localhost:3001/api/coupon-point/user-coupon-loading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userUid }),
    })
      .then(response => response.json())
      .then(data => {
        setUserCouponInfo(data.userCouponInfo);
        setCouponInfo(data.couponsInfo);
        setIsCouponLoading(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    loadUserCouponInfo();
  },[isCouponLoading]);

  return (
    <>
      <CartPurchaseList 
        checkCartInfo={checkCartInfo}
      />
      <CartPurchaseInfo
        purchaseInfo={purchaseInfo}
        totalSaleAmount={totalSaleAmount}
        totalPurchasePrice={totalPurchasePrice}
      />
    </>
  )
};