// registerRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const User = require('../models/user');

const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms("NCSVKT0PTX0SKCI9", "PJT6NCSSK2JXTCPL3KMH0DAWIAHGIHVE");

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function generateRandomKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const keyLength = 6;
  let randomKey = '';

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }

  return randomKey;
}

// 아이디 중복 검사
router.post('/checkid', (req, res) => {
  const { username } = req.body; // 클라이언트에서 보낸 아이디

  const sql_checkId = 'SELECT user_id FROM user_info WHERE user_id = ?';
  db.query(sql_checkId, [username], (err, results) => {
    if (err) {
      // 에러 처리
      console.error('데이터베이스 오류:', err);
      res.status(500).json({ error: '데이터베이스 오류' });
    } else {
      if (results.length > 0) {
        // 사용 중인 아이디가 존재하는 경우
        res.json({ isAvailable: false });
      } else {
        // 사용 가능한 아이디인 경우
        res.json({ isAvailable: true });
      }
    }
  });
});

// 휴대폰 번호 중복 검사
router.post('/checkphonenum', (req, res) => {
  const { userphonenum } = req.body; // 클라이언트에서 보낸 아이디

  const sql_checkPhoneNum = 'SELECT user_phone_num FROM user_info WHERE user_phone_num = ?';
  db.query(sql_checkPhoneNum, [userphonenum], (err, results) => {
    if (err) {
      // 에러 처리
      console.error('데이터베이스 오류:', err);
      res.status(500).json({ error: '데이터베이스 오류' });
    } else {
      if (results.length > 0) {
        // 사용 중인 휴대폰 번호가 존재하는 경우
        res.json({ isAvailable: false });
      } else {
        // 사용 가능한 휴대폰 번호인 경우
        res.json({ isAvailable: true });
      }
    }
  });
});

// 인증 문자 발송
router.post('/verifyphonenum', (req, res) => {
  const { userphonenum } = req.body;
  const randomKey = generateRandomKey();
  messageService.sendOne({
    to: userphonenum,
    from: "01067793140",
    text: "[DWStudio]휴대폰 인증 번호 : " + randomKey
  }).then(res => console.log(res))
  .then( res.json({ VerifyStart: true, randomKey : randomKey }));
});

// 회원가입 라우터
router.post('/signup', (req, res) => {
  const userData = req.body;
  const id = userData.id;
  const password = userData.password;
  const name = userData.name;
  const gender = userData.gender;
  const birthdate = userData.RebirthDate;
  const phoneNumber = userData.phoneNumber;
  const address = userData.address;
  const postcode = userData.postCode;
  const detailaddress = userData.detailAddress;

  // 회원 정보를 User 모델을 사용하여 생성
  const newUser = new User({
    user_id: id,
    user_password: password,
    user_name: name,
    user_gender: gender,
    user_birth_date: birthdate,
    user_phone_num: phoneNumber,
    user_address: address,
    user_postcode: postcode,
    user_detailaddress: detailaddress,
  });

  // 회원 정보를 데이터베이스에 저장
  newUser.save()
    .then(() => {
      // 저장이 성공한 경우
      res.status(200).json({
        success: true, // 회원가입 성공 여부
        message: '회원 가입이 성공적으로 완료되었습니다.'
      });
    })
    .catch((error) => {
      // 오류 처리
      console.error('회원 가입 오류:', error);
      res.status(500).json({ error: '회원 가입 중 오류가 발생했습니다.' });
    });
});

module.exports = router;



