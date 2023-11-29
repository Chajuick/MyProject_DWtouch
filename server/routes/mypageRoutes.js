// mypage.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 비밀번호 확인
router.post('/checkpw', (req, res) => {
  const { userid, password } = req.body;

  const sql = 'SELECT * FROM user_info WHERE user_id = ?';
  db.query(sql, [userid], (err, results) => {
    if (err) {
      console.error('비밀번호 확인 오류: ' + err.message);
      res.status(500).json({ error: '비밀번호 확인 오류 : CODE 004' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        const storedPassword = user.user_password; // 데이터베이스에 저장된 해시된 비밀번호

        // 클라이언트에서 보낸 해시된 비밀번호와 데이터베이스에 저장된 비밀번호 비교
        bcrypt.compare(password, storedPassword, (err, passwordMatch) => {
          if (err) {
            console.error('비밀번호 비교 오류: ' + err.message);
            res.status(500).json({ error: '비밀번호 확인 오류 : CODE 003' });
          } else if (passwordMatch) {
            // 비밀번호 일치
            res.json({ success: true, message: '비밀번호 확인 성공' });
          } else {
            // 비밀번호 불일치
            res.json({ success: false, message: '비밀번호 확인 오류 : CODE 002 ' });
          }
        });
      } else {
        res.json({ success: false, message: '비밀번호 확인 오류 : CODE 001' });
      }
    }
  });
});

// 회원정보 변경(비번포함)
router.post('/editpwprofile', async (req, res) => {
  try {
    const {
      uid,
      password,
      name,
      gender,
      reBirthDate,
      phoneNumber,
      postCode,
      address,
      detailAddress,
    } = req.body;

    // 사용자가 존재하는지 확인
    const user = await User.findByPk(uid);

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 사용자 정보 업데이트
    user.user_password = password; // 클라이언트에서 이미 해싱됨
    user.user_name = name;
    user.user_gender = gender;
    user.user_birth_date = reBirthDate;
    user.user_phone_num = phoneNumber;
    user.user_postcode = postCode;
    user.user_address = address;
    user.user_detailaddress = detailAddress;

    // 업데이트된 사용자 정보를 데이터베이스에 저장
    await user.save();

    // 클라이언트에 성공 응답을 보낼 수 있습니다.
    res.json({ success: true, message: '프로필이 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    res.status(500).json({ success: false, error: '내부 서버 오류' });
  }
});

// 회원정보 변경(비번 미포함)
router.post('/editprofile', async (req, res) => {
  try {
    const {
      uid,
      name,
      gender,
      reBirthDate,
      phoneNumber,
      postCode,
      address,
      detailAddress,
    } = req.body;

    // 사용자가 존재하는지 확인
    const user = await User.findByPk(uid);

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 사용자 정보 업데이트
    user.user_name = name;
    user.user_gender = gender;
    user.user_birth_date = reBirthDate;
    user.user_phone_num = phoneNumber;
    user.user_postcode = postCode;
    user.user_address = address;
    user.user_detailaddress = detailAddress;

    // 업데이트된 사용자 정보를 데이터베이스에 저장
    await user.save();

    // 클라이언트에 성공 응답을 보낼 수 있습니다.
    res.json({ success: true, message: '프로필이 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    res.status(500).json({ success: false, error: '내부 서버 오류' });
  }
});

module.exports = router;



