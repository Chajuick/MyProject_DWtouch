// products.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 카테고리 물품들 배열
router.post('/list', (req, res) => {
  const categoryId = req.body.categoryId;

  // SQL 쿼리 작성
  const query = 'SELECT * FROM products WHERE main_category_id = ?';

  // 데이터베이스 쿼리 실행
  db.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // 결과를 배열로 변환
    const products = results.map(result => ({
      product_name: result.product_name,
      main_img: `http://localhost:3001/imgs/${result.product_main_img}`,
      description_first: result.product_description_first,
      description_second: result.product_description_second,
      link: result.product_link,
      price: result.product_default_price,
      option: result.product_option,
      sale: result.product_sale,
    }));

    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ products });
  });
});

// 옵션 이미지 배열
router.post('/opt-img-get', (req, res) => {
  const productId = req.body.productId;

  // SQL 쿼리 작성
  const query = 'SELECT * FROM product_opt_image WHERE product_id = ?';

  // 데이터베이스 쿼리 실행
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // 결과를 배열로 변환
    const optImgs = results.map(result => ({
      opt_value: result.opt_value,
      img: `http://localhost:3001/imgs/${result.img_url}`,
    }));
    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ optImgs });
  });
});

// 물품 정보
router.post('/optinfo', (req, res) => {
  const productId = req.body.productId;

  // SQL 쿼리 작성
  const query = 'SELECT * FROM products WHERE product_id = ?';

  // 데이터베이스 쿼리 실행
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // 결과를 배열로 변환
    const product = results.map(result => ({
      product_name: result.product_name,
      main_img: `http://localhost:3001/imgs/${result.product_main_img}`,
      default_price: result.product_default_price,
      opt_price: result.product_opt_price,
      link: result.product_link,
      sale: result.product_sale,
      sale_detail: result.product_sale_detail,
    }));

    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ product });
  });
});

// 리뷰 테이블
router.post('/reviewTable', (req, res) => {
  const productName = req.body.productName;

  // SQL 쿼리 작성
  const query = 'SELECT * FROM review WHERE review_product_name = ?';

  // 데이터베이스 쿼리 실행
  db.query(query, [productName], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // 결과를 배열로 변환
    const review = results.map(result => ({
      review_title: result.review_title,
      review_photo: [result.review_main_img, result.review_sub_img1, result.review_sub_img2, result.review_sub_img3].filter(img => img !== null),
      review_product_name: result.review_product_name,
      review_product_option: result.review_product_opt,
      review_content: result.review_content,
      review_star_points: result.review_star_points,
      review_editor: result.review_editor,
      review_edit_date: result.review_edit_date,
    }));

    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ review });
  });
});

module.exports = router;



