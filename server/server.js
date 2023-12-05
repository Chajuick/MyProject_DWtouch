const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// 환경 변수를 로드합니다.
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '내부 서버 오류' });
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.message);
  } else {
    console.log('MySQL 데이터베이스에 연결되었습니다.');
  }
});

// 이미지가 저장된 폴더를 정적 파일로 제공
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

// 라우트 모듈들을 분리하여 가져옵니다.
const mainBannersRouter = require('./routes/mainBannersRoutes');
const eventsRouter = require('./routes/eventsRoutes');
const authRouter = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoutes');
const mypageRouter = require("./routes/mypageRoutes");
const productsRouter = require("./routes/productsRoutes");
const shoppingcartRouter = require("./routes/shoppingcartRoutes");
const couponPointsRouter = require("./routes/couponPointsRoutes");
const orderRouter = require("./routes/orderRoutes");

// 라우트 모듈들을 사용합니다.
app.use('/api/mainbanners', mainBannersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/auth', authRouter);
app.use('/api/register', registerRouter);
app.use('/api/mypage', mypageRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', shoppingcartRouter);
app.use('/api/coupon-point', couponPointsRouter);
app.use('/api/order', orderRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
