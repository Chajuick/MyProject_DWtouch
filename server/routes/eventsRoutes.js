// eventSlidesRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.get('/', (req, res) => {
  const sql_eventSlide = 'SELECT * FROM events';

  db.query(sql_eventSlide, (err, results) => {
    if (err) {
      console.error('이벤트 데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '이벤트 데이터 가져오기 오류' });
    } else {
      const events = results.map((row) => ({
        slideImg: row.event_url_slide_img,
        slideDetail: row.event_url_slide_detail,
        bigboxImg: row.event_url_bigbox,
        smallboxImg: row.event_url_smallbox,
        link: row.event_link,
      }));
      res.json(events);
    }
  });
});

module.exports = router;
