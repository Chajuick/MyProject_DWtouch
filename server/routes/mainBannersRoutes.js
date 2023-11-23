// mainBannersRoutes.js
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
  const sql_mainBanner = 'SELECT * FROM mainbanners';

  db.query(sql_mainBanner, (err, results) => {
    if (err) {
      console.error('메인배너 데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '메인배너 데이터 가져오기 오류' });
    } else {
      const banner = results.map((row) => ({
        bck: row.mainbanner_bck,
        image: row.mainbanner_img,
        title: row.mainbanner_title,
        detail_1: row.mainbanner_detail_st,
        detail_2: row.mainbanner_detail_nd,
        link: row.mainbanner_link,
        style: row.mainbanner_style,
      }));
      res.json(banner);
    }
  });
});

module.exports = router;



