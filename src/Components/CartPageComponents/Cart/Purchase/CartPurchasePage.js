import { useEffect, useState } from "react";
import styled from "styled-components";

import CartPurchaseInfo from "./CartPurchaseInfo";
import CartPurchaseList from "./CartPurchaseList";
import CartPurchaseSection from "./CartPurchaseSection";
import LoadingPage from "../../../../PageComonents/LoadingPage";
import { hasItem } from "./PurchaseConverter";

const BelowContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  padding-bottom: 300px;
`;

export default function CartPurchasePage({ checkCartInfo, setCurrentStatus, navigate }) {
  const [purchaseInfo, setPurchaseInfo] = useState(0);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalDefaultPrice, setTotalDefaultPrice] = useState(0);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [endPaymentPrice, setEndPaymnetPorice] = useState(0);
  const [couponInfoFixed, setCouponInfoFIxed] = useState(true);

  // 유저 정보
  const [orderName, setOrderName] = useState(sessionStorage.getItem('user_name') || '');
  const [orderPhoneNum, setOrderPhoneNum] = useState(sessionStorage.getItem('user_phonenum').replace(/-/g, '') || '');
  const [name, setName] = useState(sessionStorage.getItem('user_name') || '');
  const [phoneNum, setPhoneNum] = useState(sessionStorage.getItem('user_phonenum').replace(/-/g, '') || '');
  const [postCode, setPostCode] = useState(sessionStorage.getItem('user_postcode') || '');
  const [address, setAddress] = useState(sessionStorage.getItem('user_address') || '');
  const [detailAddress, setDetailAddress] = useState(sessionStorage.getItem('user_detail_addres') || '');
  const [deliveryMes, setDeliveryMes] = useState('');
  // 결제 정보
  const [payment, setPayment] = useState(localStorage.getItem('payment') || '');
  // 배송비 쿠폰 사용 여부
  const [usedDeliveryCoupon, setUsedDeliveryCoupon] = useState({});

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
        review_status: 0,
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
    setEndPaymnetPorice(totalPurchasePrice - usingPoints + deliveryPrice);
  }, [usingPoints, totalPurchasePrice, deliveryPrice])

  // 유저 입력 필드 상태
  const [isFieldFinish, setIsFieldFinish] = useState(false);

// 결제
const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);

function handlePurchase(termEvent) {
  setIsPurchaseLoading(true);
  Promise.all([addToTerm(termEvent), addToOrder(), delFromUserCoupon(), subPoint(), delFromCart()])
    .then(() => {
      setIsPurchaseLoading(false);
      setCurrentStatus(2);
      window.scrollTo({
        top: 105,
        behavior: 'smooth', 
      });
    })
    .catch((error) => {
      setIsPurchaseLoading(false);
      navigate('/order-error');
      console.error('오류:', error.message);
    });
}

// 장바구니 삭제 
async function delFromCart() {
  if (purchaseInfo && purchaseInfo.length > 0) {
    const cartIds = {
      cartIds: getPaidCart(purchaseInfo),
    };

    try {
      const response = await fetch('http://localhost:3001/api/cart/infoDel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartIds),
      });

      if (!response.ok) {
        throw new Error('서버 응답이 실패하였습니다.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('오류:', error);
      throw error;
    }
  }
}
console.log()

// 약관 정보 추가
async function addToTerm(termEvent) {
  const termData = {
    orderPhoneNum: orderPhoneNum,
    termsPersonal: true,
    termsEvent: termEvent,
  };

  try {
    const response = await fetch('http://localhost:3001/api/term/addToTermCondition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(termData),
    });

    if (!response.ok) {
      throw new Error('서버 응답이 실패하였습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('오류:', error);
    throw error;
  }
}

// 주문 정보 추가
async function addToOrder() {
  const purchaseData = {
    userUid: sessionStorage.getItem('user_uid'),
    orderName: orderName,
    orderPhoneNum: orderPhoneNum,
    name: name,
    phoneNum: phoneNum,
    postCode: postCode,
    address: address,
    detailAddress: detailAddress,
    deliveryPrice: deliveryPrice,
    deliveryMes: deliveryMes,
    usedDeliveryCoupon: usedDeliveryCoupon,
    totalDefaultPrice: totalDefaultPrice,
    totalSaleAmount: totalSaleAmount,
    usingPoints: usingPoints,
    endPaymentPrice: endPaymentPrice,
    purchaseInfo: purchaseInfo,
    payment: payment,
  };

  try {
    const response = await fetch('http://localhost:3001/api/order/addToOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    });

    if (!response.ok) {
      throw new Error('서버 응답이 실패하였습니다.');
    }

    const data = await response.json();
    // 서버 응답에서 order_id 추출
    const orderId = data.order_id;

    // 세션 스토리지에 order_id 저장
    sessionStorage.setItem('order_id', orderId);
    return data;
  } catch (error) {
    console.error('오류:', error);
    throw error;
  }
}

// 사용한 쿠폰 지우기
async function delFromUserCoupon() {
  if (purchaseInfo && purchaseInfo.length > 0 && hasUsedCoupon(purchaseInfo)) {
    const usedCouponData = {
      userUid: sessionStorage.getItem('user_uid'),
      usedCoupon: getUsedCoupons(purchaseInfo),
    };

    try {
      const response = await fetch('http://localhost:3001/api/coupon-point/user-coupon-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usedCouponData),
      });

      if (!response.ok) {
        throw new Error('서버 응답이 실패하였습니다.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('오류:', error);
      throw error;
    }
  }
}

// 포인트 차감
async function subPoint() {
  if (usingPoints > 0) {
    const usedPointData = {
      userUid: sessionStorage.getItem('user_uid'),
      usingPoints: usingPoints,
    };

    try {
      const response = await fetch('http://localhost:3001/api/coupon-point/sub-point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usedPointData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`서버 응답이 실패하였습니다. (${errorData.error})`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('오류:', error.message);
      throw error;
    }
  }
};

function hasUsedCoupon(cartArray) {
  // 배열을 순회하며 used_coupon이 있는지 확인
  for (const cartItem of cartArray) {
    if (cartItem.used_coupon) {
      return true; // used_coupon이 있으면 true 반환
    }
  }
  return false; // used_coupon이 하나도 없으면 false 반환
}

function getUsedCoupons(cartArray) {
  // used_coupon이 있는 아이템들을 필터링하여 새로운 배열 생성
  const usedCouponItems = cartArray.filter(cartItem => cartItem.used_coupon !== undefined && cartItem.used_coupon !== null);

  // used_coupon만 추출하여 새로운 배열 생성
  const usedCoupons = usedCouponItems.map(cartItem => cartItem.used_coupon);
  // usedDeliveryCoupon이 존재하고 coupons_uid가 있는 경우 배열에 추가
  if (usedDeliveryCoupon && usedDeliveryCoupon.coupons_uid) {
    usedCoupons.push(usedDeliveryCoupon.coupons_uid);
  }
  return usedCoupons;
};

function getPaidCart(cartArray) {
  const paidCartItems = cartArray.filter(cartItem => cartItem.cart_id !== undefined && cartItem.cart_id !== null);
  const paidCart = paidCartItems.map(cartItem => cartItem.cart_id);
  return paidCart;
}

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
              setIsFieldFinish={setIsFieldFinish}
              orderName={orderName}
              setOrderName={setOrderName}
              orderPhoneNum={orderPhoneNum}
              setOrderPhoneNum={setOrderPhoneNum}
              name={name}
              setName={setName}
              phoneNum={phoneNum}
              setPhoneNum={setPhoneNum}
              postCode={postCode}
              setPostCode={setPostCode}
              address={address}
              setAddress={setAddress}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
              deliveryMes={deliveryMes}
              setDeliveryMes={setDeliveryMes}
              payment={payment}
              setPayment={setPayment}
              usedDeliveryCoupon={usedDeliveryCoupon}
              setUsedDeliveryCoupon={setUsedDeliveryCoupon}
            />
            <CartPurchaseSection 
              totalDefaultPrice={totalDefaultPrice}
              totalSaleAmount={totalSaleAmount}
              totalPurchasePrice={totalPurchasePrice}
              usingPoints={usingPoints}
              deliveryPrice={deliveryPrice}
              endPaymentPrice={endPaymentPrice}
              isFieldFinish={isFieldFinish}
              handlePurchase={handlePurchase}
            />
          </BelowContainer>
        </>
      }
      {(purchaseInfo.length < 1 && isCouponLoading) || isPurchaseLoading &&
        <LoadingPage />
      }
    </>
  )
};