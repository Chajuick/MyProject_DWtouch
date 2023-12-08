// orderRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const TermCondition = require('../models/term');

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createTerm = async (orderPhoneNum, termsUid) => {
  try {
    // 기존 행 찾기
    const existingTerm = await TermCondition.findOne({
      where: {
        user_phone: orderPhoneNum,
        terms_uid: termsUid,
      },
    });

    // 기존 행이 있으면 삭제
    if (existingTerm) {
      await existingTerm.destroy();
    }

    // 새로운 newTerm을 저장
    const newTerm = await TermCondition.create({
      user_phone: orderPhoneNum,
      terms_uid: termsUid,
    });

  } catch (error) {
    console.error("Error in createTerm:", error);
    throw error; // 에러를 호출한 곳으로 다시 던집니다.
  }
};

// 약관 동의 정보 추가 라우터
router.post('/addToTermCondition', async (req, res) => {
  try {
    const termData = req.body;
    const orderPhoneNum = termData.orderPhoneNum;
    const termsPersonal = termData.termsPersonal;
    const termsEvent = termData.termsEvent;

    // termsPersonal이 참이면 1인 TermCondition 생성
    if (termsPersonal) {
      await createTerm(orderPhoneNum, 1);
    }

    // termsEvent이 참이면 2인 TermCondition 생성
    if (termsEvent) {
      await createTerm(orderPhoneNum, 2);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error); // 에러 로깅
    return res.status(500).json({ error: "Failed to process the request" });
  }
});


module.exports = router;
