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

// 유저 쿠폰 수량 받아오기
router.post('/user-coupon-loading', async (req, res) => {
  const userUID = req.body.userUID;
  // SQL 쿼리 작성
  const userCouponQuery = 'SELECT * FROM user_coupons WHERE user_id = ?';
  const couponQuery = 'SELECT * FROM coupons WHERE coupons_uid = ?';

  try {
    // 유저 쿠폰 정보 조회
    const userCouponResults = await queryDatabase(userCouponQuery, [userUID]);
    if (userCouponResults.length === 0) {
      // 만약 유저 쿠폰이 없으면 빈 배열로 응답
      res.setHeader('Content-Type', 'application/json');
      return res.json({ userCouponResults: [] });
    }

    // 각 유저 쿠폰에 대해 쿠폰 정보 조회
    const couponPromises = userCouponResults.map(async (userCoupon) => {
      const couponID = userCoupon.coupons_id;
      const couponResults = await queryDatabase(couponQuery, [couponID]);
      return couponResults;
    });

    // 모든 쿠폰 정보를 기다림
    const allCouponResults = await Promise.all(couponPromises);

    // 클라이언트에게 응답
    res.setHeader('Content-Type', 'application/json');
    res.json({ userCouponResults: allCouponResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 사용한 쿠폰 지우기
router.post('/user-coupon-delete', async (req, res) => {
  const usedCouponData = req.body;
  const userUid = usedCouponData.userUid;
  const usedCoupon = usedCouponData.usedCoupon;

  // SQL 쿼리 작성
  const deleteQuery = 'DELETE FROM user_coupons WHERE user_id = ? AND coupons_id IN (?)';
  try {
    // 사용한 쿠폰 삭제
    await queryDatabase(deleteQuery, [userUid, usedCoupon]);

    // 클라이언트에게 응답
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 포인트 차감
router.post('/sub-point', async (req, res) => {
  try {
    const usingPoints = req.body.usingPoints;
    const userUid = req.body.userUid;
    // SQL 쿼리 작성
    const selectQuery = 'SELECT * FROM user_info WHERE user_uid = ?';
    const updateQuery = 'UPDATE user_info SET user_points = user_points - ? WHERE user_uid = ?';
    // 사용자 정보 조회
    const userInfo = await queryDatabase(selectQuery, [userUid]);
    // 사용자 정보가 존재하지 않을 경우
    if (userInfo.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // 현재 포인트에서 usingPoints만큼 차감
    const currentPoints = userInfo[0].user_points;
    const updatedPoints = currentPoints - usingPoints;
    // 포인트 갱신
    await queryDatabase(updateQuery, [usingPoints, userUid]);
    // 갱신된 포인트가 음수가 될 경우
    if (updatedPoints < 0) {
      throw new Error('Insufficient points');
    }
    // 클라이언트에게 응답
    res.status(200).json({ success: true, updatedPoints });
  } catch (error) {
    console.error(error);
    // 에러 메시지에 따라 응답 상태 및 메시지를 설정
    let status = 500;
    let errorMessage = 'Internal Server Error';
    if (error.message === 'Insufficient points') {
      status = 400; // Bad Request
      errorMessage = 'Insufficient points';
    }
    res.status(status).json({ error: errorMessage });
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



