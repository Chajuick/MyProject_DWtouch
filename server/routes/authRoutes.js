// authRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const coolsms = require("coolsms-node-sdk").default;
const messageService = new coolsms("NCSVKT0PTX0SKCI9", "PJT6NCSSK2JXTCPL3KMH0DAWIAHGIHVE");

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

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 로그인 라우트
router.post('/login', (req, res) => {
  const { userid, password } = req.body;

  const sqlSelect = 'SELECT * FROM user_info WHERE user_id = ?';
  const sqlFind = 'SELECT * FROM session WHERE user_uid = ?';
  const sqlInsert = 'INSERT INTO session (session_key, user_uid) VALUES (?, ?)';
  const sqlDelete = 'DELETE FROM session WHERE user_uid = ?';

  db.query(sqlSelect, [userid], (err, results) => {
    if (err) {
      console.error('로그인 오류: ' + err.message);
      res.status(500).json({ error: '로그인 오류 : CODE 004' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        const storedPassword = user.user_password;

        bcrypt.compare(password, storedPassword, (err, passwordMatch) => {
          if (err) {
            console.error('비밀번호 비교 오류: ' + err.message);
            res.status(500).json({ error: '로그인 오류 : CODE 003' });
          } else if (passwordMatch) {
            const randomKey = generateRandomKey();
            const userUid = results[0].user_uid;

            // 중복 uid 확인
            db.query(sqlFind, [userUid], (err, existingSession) => {
              if (err) {
                console.error('세션 확인 오류: ' + err.message);
                res.status(500).json({ error: '로그인 오류 : CODE 005' });
              } else if (existingSession.length > 0) {
                // 중복 uid 발견 시
                db.query(sqlDelete, [userUid], (err) => {
                  if (err) {
                    console.error('세션 삭제 오류: ' + err.message);
                    res.status(500).json({ error: '로그인 오류 : CODE 008' });
                  } else {
                    db.query(sqlInsert, [randomKey, userUid], (err) => {
                      if (err) {
                        console.error('세션 삽입 오류: ' + err.message);
                        res.status(500).json({ error: '로그인 오류 : CODE 007' });
                      } else {
                        res.json({ success: true, message: '로그인 성공', user: user, session: { randomKey, userUid } });
                      }
                    });
                  }
                });
              } else {
                // 중복 uid 없을 때 세션 작업
                db.query(sqlInsert, [randomKey, userUid], (err) => {
                  if (err) {
                    console.error('세션 삽입 오류: ' + err.message);
                    res.status(500).json({ error: '로그인 오류 : CODE 007' });
                  } else {
                    res.json({ success: true, message: '로그인 성공', user: user, session: { randomKey, userUid } });
                  }
                });
              }
            });
          } else {
            // 비밀번호 불일치
            res.json({ success: false, message: '로그인 오류 : CODE 002 ' });
          }
        });
      } else {
        res.json({ success: false, message: '로그인 오류 : CODE 001' });
      }
    }
  });
});

// 로그아웃 라우트
router.post('/logout', (req, res) => {
  const { session } = req.body;

  const sqlDelete = 'DELETE FROM session WHERE user_uid = ? AND session_key = ?';

  db.query(sqlDelete, [session.user_uid, session.session_key], (err, results) => {
    if (err) {
      console.error('세션 삭제 오류: ' + err.message);
      res.status(500).json({ error: '로그아웃 오류 : CODE 001' });
    } else {
      res.json({ success: true, message: '로그아웃 성공' });
    }
  });
});


// 유저 정보 갱신
router.post('/update', (req, res) => {
  const { session } = req.body;

  // SQL 쿼리: session 테이블에서 user_uid와 session_key가 일치하는 행을 조회
  const sqlSessionSelect = 'SELECT * FROM session WHERE user_uid = ? AND session_key = ?';

  db.query(sqlSessionSelect, [session.user_uid, session.session_key], (err, sessionResults) => {
    if (err) {
      console.error('세션 조회 오류: ' + err.message);
      res.status(500).json({ error: '유저 정보 갱신 오류 : CODE 001' });
    } else {
      // 세션 테이블에서 해당 세션이 존재하는 경우
      if (sessionResults.length > 0) {
        // SQL 쿼리: user_info 테이블에서 user_uid가 일치하는 행을 조회
        const sqlUserInfoSelect = 'SELECT * FROM user_info WHERE user_uid = ?';

        db.query(sqlUserInfoSelect, [session.user_uid], (err, userResults) => {
          if (err) {
            console.error('유저 정보 조회 오류: ' + err.message);
            res.status(500).json({ error: '유저 정보 갱신 오류 : CODE 002' });
          } else {
            // user_info 테이블에서 해당 유저 정보가 존재하는 경우
            if (userResults.length > 0) {
              const user = userResults[0];
              res.json({ success: true, message: '유저 정보 갱신 성공', user: user });
            } else {
              res.status(404).json({ success: false, message: '유저 정보가 존재하지 않습니다' });
            }
          }
        });
      } else {
        res.status(401).json({ success: false, message: '세션 정보가 유효하지 않습니다' });
      }
    }
  });
});

// 아이디 찾기 라우트
router.post('/find-username', (req, res) => {
  const { phoneNum } = req.body;

  const sql = 'SELECT user_id FROM user_info WHERE user_phone_num = ?';
  db.query(sql, [phoneNum], (err, results) => {
    if (err) {
      console.error('아이디 찾기 오류: ' + err.message);
      res.status(500).json({ error: '아이디 찾기 오류 : CODE 005' });
    } else {
      if (results.length > 0) {
        const username = results[0].user_id;
        res.json({ success: true, message: '아이디 찾기 성공', username });
      } else {
        res.json({ success: false, message: '일치하는 사용자 없음' });
      }
    }
  });
});

// 비밀번호 재발급 라우트
router.post('/check-user-info', (req, res) => {
  const { userid, username, phoneNum } = req.body;

  const sql = 'SELECT * FROM user_info WHERE user_id = ? AND user_name = ? AND user_phone_num = ?';
  db.query(sql, [userid, username, phoneNum], (err, results) => {
    if (err) {
      console.error('회원정보 확인 오류: ' + err.message);
      res.status(500).json({ error: '회원정보 확인 오류 : CODE 006' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        // 인증 문자 발송
        const randomKey = generateRandomKey();
        messageService.sendOne({
          to: phoneNum,
          from: "01067793140",
          text: "[DWStudio]보안을 위해 꼭 로그인 후 비밀번호 변경 바랍니다. 비밀번호 : " + randomKey + ""
        }).then(() => {
          // 새로운 랜덤 키를 해싱하여 비밀번호로 변경
          bcrypt.hash(randomKey, 10, (err, hashedKey) => {
            if (err) {
              console.error('랜덤 키 해싱 오류: ' + err.message);
              res.status(500).json({ error: '비밀번호 변경 오류 : CODE 007' });
            } else {
              // 해싱된 키를 데이터베이스에 업데이트
              const updateSql = 'UPDATE user_info SET user_password = ? WHERE user_id = ?';
              db.query(updateSql, [hashedKey, userid], (updateErr) => {
                if (updateErr) {
                  console.error('비밀번호 변경 오류: ' + updateErr.message);
                  res.status(500).json({ error: '비밀번호 변경 오류 : CODE 008' });
                } else {
                  // 업데이트가 성공하면 클라이언트에게 성공 응답과 함께 랜덤 키 전달
                  res.json({ passwordChange: true, randomKey: randomKey });
                }
              });
            }
          });
        }).catch((sendErr) => {
          console.error('SMS 전송 오류: ' + sendErr.message);
          res.status(500).json({ error: 'SMS 전송 오류 : CODE 009' });
        });
      } else {
        res.json({ success: false, message: '일치하는 사용자 정보 없음' });
      }
    }
  });
});



module.exports = router;
