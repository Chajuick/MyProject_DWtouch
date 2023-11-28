// shoppingcart.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const Cart = require('../models/cart');

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 장바구니 추가 라우터
router.post('/addToCart', (req, res) => {
  const cartData = req.body;
  const userUid = cartData.user_uid;
  const cartName = "프로젝트명을 입력해주세요";
  const cartOption = cartData.option;
  const cartProductName = cartData.product_name;
  const cartPrice = cartData.price;
  const cartQuantity = cartData.cart_quantity;
  let cartThumbnail = "";
  if (cartData.option[1] === 0) {
    cartThumbnail = "https://i.ibb.co/KFmR8cv/1.png";
  } else if (cartData.option[1] === 1) {
    if (cartData.option[3] === 0) {
      cartThumbnail = "https://i.ibb.co/c6M9qx7/7.png";
    } else if (cartData.option[3] === 1) {
      cartThumbnail = "https://i.ibb.co/26xXZXh/6.png";
    } else if (cartData.option[3] === 2) {
      cartThumbnail = "https://i.ibb.co/gr0qMZV/5.png";
    } else if (cartData.option[3] === 3) {
      cartThumbnail = "https://i.ibb.co/xq7N4Tc/4.png";
    } else if (cartData.option[3] === 4) {
      cartThumbnail = "https://i.ibb.co/bBqzLrK/8.png";
    } else if (cartData.option[3] === 5) {
      cartThumbnail = "https://i.ibb.co/QFXhcwH/3.png";
    } else if (cartData.option[3] === 6) {
      cartThumbnail = "https://i.ibb.co/4S1hDKm/2.png";
    }
  }

  // 장바구니 정보를 Cart 모델을 사용하여 생성
  const newCart = new Cart({
    user_uid: userUid,
    cart_name: cartName,
    cart_option: cartOption,
    cart_product_name: cartProductName,
    cart_thumbnail: cartThumbnail,
    cart_price: cartPrice,
    product_quantity: cartQuantity,
  });

  // 장바구니 정보를 데이터베이스에 저장
  newCart.save()
    .then((savedCart) => {
      // 저장이 성공한 경우
      res.status(200).json({
        success: true, // 장바구니 저장 여부
        message: '장바구니 담기완료',
        cart_id: savedCart.cart_id,
      });
    })
    .catch((error) => {
      // 오류 처리
      console.error('저장 오류:', error);
      res.status(500).json({ error: '장바구니 담기 중 오류가 발생했습니다.' });
    });
});

// 장바구니 정보 받아오기
router.post('/infoLoading', (req, res) => {
  const cartId = req.body.cartId;

  // SQL 쿼리 작성
  const query = 'SELECT * FROM shoppingcart WHERE cart_id = ?';

  // 데이터베이스 쿼리 실행
  db.query(query, [cartId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // 결과를 배열로 변환
    const cartInfo = results.map(result => ({
      cart_id: result.cart_id,
      user_uid: result.user_uid,
      cart_name: result.cart_name,
      cart_option: result.cart_option,
      cart_product_name: result.cart_product_name,
      cart_thumbnail: result.cart_thumbnail,
      cart_price: result.cart_price,
    }));

    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ cartInfo });
  });
});

module.exports = router;



