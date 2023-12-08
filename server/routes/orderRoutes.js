// orderRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const Order = require('../models/order');

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 유저 주문 정보 받아오기
router.post('/user-order-info-loading', async (req, res) => {
  const userUID = req.body.userUID;
  // SQL 쿼리 작성
  const query = 'SELECT * FROM order_info WHERE user_uid = ?';
  try {
    const results = await queryDatabase(query, [userUID]);
    const orderInfo = results;
    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ orderInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 주문 정보 추가 라우터
router.post('/addToOrder', (req, res) => {
  const purchaseData = req.body;
  const userUid = purchaseData.userUid;
  const orderName = purchaseData.orderName;
  const orderPhoneNum = purchaseData.orderPhoneNum;
  const name = purchaseData.name;
  const phoneNum = purchaseData.phoneNum;
  const postCode = purchaseData.postCode;
  const address = purchaseData.address;
  const detailAddress = purchaseData.detailAddress;
  const deliveryMes = purchaseData.deliveryMes;
  const deliveryPrice = purchaseData.deliveryPrice;
  const usedDeliveryCoupon = purchaseData.usedDeliveryCoupon;
  const totalDefaultPrice = purchaseData.totalDefaultPrice;
  const totalSaleAmount = purchaseData.totalSaleAmount;
  const usingPoints = purchaseData.usingPoints;
  const endPaymentPrice = purchaseData.endPaymentPrice;
  const purchaseInfo = purchaseData.purchaseInfo;
  const payment = purchaseData.payment;

  // 주문 정보를 Order 모델을 사용하여 생성
  const newOrder = new Order({
    user_uid: userUid,
    product_list: purchaseInfo,
    order_sale_amount: totalSaleAmount,
    order_default_price: totalDefaultPrice,
    order_final_price: endPaymentPrice,
    status: 0,
    destination: [postCode, address, detailAddress],
    payment: payment,
    delivery_price: deliveryPrice,
    delivery_mes: deliveryMes,
    delivery_used_coupon: usedDeliveryCoupon,
    orderer_name: orderName,
    orderer_phone: orderPhoneNum,
    recipient_name: name,
    recipient_phone: phoneNum,
    using_points: usingPoints,
  });
  // 주문 정보를 데이터베이스에 저장
  newOrder.save()
    .then((savedOrder) => {
      // 저장이 성공한 경우
      res.status(200).json({
        success: true, // 주문 저장 여부
        message: '주문 저장 완료',
        order_id: savedOrder.order_info_uid,
        order_data: savedOrder,
      });
    })
    .catch((error) => {
      // 오류 처리
      console.error('저장 오류:', error);
      res.status(500).json({ error: '주문 중 오류가 발생했습니다.' });
    });
});

// Promise로 감싸진 쿼리 실행을 위한 함수
function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Query Error:', err);
        reject(err);
      }
      resolve(results);
    });
  });
}


module.exports = router;
