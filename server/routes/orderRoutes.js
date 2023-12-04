// orderRoutes.js
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
