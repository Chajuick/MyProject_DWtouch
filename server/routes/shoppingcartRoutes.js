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
router.post('/addToCart', async (req, res) => {
  try {
    const cartData = req.body;
    const userUid = cartData.user_uid;
    const cartName = cartData.project_name;
    const cartOption = cartData.option;
    const cartProductName = cartData.product_name;
    const cartPrice = cartData.price;
    const cartFinalPrice = cartData.final_price;
    const cartQuantity = cartData.product_quantity;
    const cartSaleInfo = cartData.sale_info;
    const cartSaleDetail = cartData.sale_detail;
    const cartDefaultPrice = cartData.default_price;
    let cartThumbnail = "";
    if (cartData.product_name === "포토북" || cartData.product_name === "팬북" || cartData.product_name === "졸업앨범") {
      if (cartData.option[1] === 0) {
        if (cartData.option[2] === 0) {
          cartThumbnail = "productThumbnail/photobook/matte.png";
        } else if (cartData.option[2] === 1) {
          cartThumbnail = "productThumbnail/photobook/glossy.png";
        } 
      } else if (cartData.option[1] === 1) {
        if (cartData.option[3] === 0) {
          cartThumbnail = "productThumbnail/photobook/black.png";
        } else if (cartData.option[3] === 1) {
          cartThumbnail = "productThumbnail/photobook/pink.png";
        } else if (cartData.option[3] === 2) {
          cartThumbnail = "productThumbnail/photobook/red.png";
        } else if (cartData.option[3] === 3) {
          cartThumbnail = "productThumbnail/photobook/blue.png";
        } else if (cartData.option[3] === 4) {
          cartThumbnail = "productThumbnail/photobook/green.png";
        } else if (cartData.option[3] === 5) {
          cartThumbnail = "productThumbnail/photobook/yellow.png";
        } else if (cartData.option[3] === 6) {
          cartThumbnail = "productThumbnail/photobook/orange.png";
        }
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
      cart_final_price: cartFinalPrice,
      product_quantity: cartQuantity,
      cart_sale_info: cartSaleInfo,
      cart_sale_detail: cartSaleDetail,
      cart_default_price: cartDefaultPrice,
    });

    // 장바구니 정보를 데이터베이스에 저장
    const savedCart = await newCart.save();

    // 저장이 성공한 경우
    res.status(200).json({
      success: true,
      message: '장바구니 담기 완료',
      cart_id: savedCart.cart_id,
    });
  } catch (error) {
    // 오류 처리
    console.error('저장 오류:', error);
    res.status(500).json({ error: '장바구니 담기 중 오류가 발생했습니다.' });
  }
});

// 유저 uid로 장바구니 정보 받아오기
router.post('/infoLoading', (req, res) => {
  const userUid = req.body.userUid;
  // SQL 쿼리 작성
  const query = 'SELECT * FROM shoppingcart WHERE user_uid = ?';
  // 데이터베이스 쿼리 실행
  db.query(query, [userUid], (err, results) => {
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
      cart_product_quantity: result.product_quantity,
      cart_product_name: result.cart_product_name,
      cart_thumbnail: `http://localhost:3001/imgs/${result.cart_thumbnail}`,
      cart_default_price: result.cart_default_price,
      cart_price: result.cart_price,
      cart_final_price: result.cart_final_price,
      cart_sale_info: result.cart_sale_info,
      cart_sale_detail: result.cart_sale_detail,
      cart_create_date: result.createdAt,
    }));

    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ cartInfo });
  });
});

// 선택한 카트 항목 삭제
router.post('/infoDel', (req, res) => {
  const cartIds = req.body.cartIds;

  // SQL 쿼리 작성
  const query = 'DELETE FROM shoppingcart WHERE cart_id IN (?)';

  // 데이터베이스 쿼리 실행
  db.query(query, [cartIds], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // 클라이언트에게 응답
    res.json({ success: true });
  });
});

module.exports = router;



