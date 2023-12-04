// couponPointsRoutes.js
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

// 포인트 정보 받아오기
router.post('/point-loading', (req, res) => {
  const userUID = req.body.userUid;
  // SQL 쿼리 작성
  const query = 'SELECT * FROM user_info WHERE user_uid = ?';
  // 데이터베이스 쿼리 실행
  db.query(query, [userUID], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // 결과 확인
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // 포인트 정보를 배열로 변환
    const pointInfo = results[0].user_points;
    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ pointInfo });
  });
});

// 유저 쿠폰 수량 받아오기
router.post('/user-coupon-amount-loading', async (req, res) => {
  const userUID = req.body.userUID;
  // SQL 쿼리 작성
  const query = 'SELECT * FROM user_coupons WHERE user_id = ?';
  try {
    const results = await queryDatabase(query, [userUID]);
    const couponAmount = results.length;
    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ couponAmount });
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



