const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const app = express();
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

// 환경 변수를 로드합니다.
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

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

app.use(
  session({
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

// 라우트 모듈들을 분리하여 가져옵니다.
const mainBannersRouter = require('./routes/mainBannersRoutes');
const eventsRouter = require('./routes/eventsRoutes');
const authRouter = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoutes');
const mypageRouter = require("./routes/mypageRoutes");
const productsRouter = require("./routes/productsRoutes");
const shoppingcartRouter = require("./routes/shoppingcartRoutes");

// 라우트 모듈들을 사용합니다.
app.use('/api/mainbanners', mainBannersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/auth', authRouter);
app.use('/api/register', registerRouter);
app.use('/api/mypage', mypageRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', shoppingcartRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
