const { Sequelize, DataTypes } = require('sequelize');

// Sequelize 인스턴스를 생성하고 데이터베이스 연결 설정을 구성합니다.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// order 모델 정의
const Order = sequelize.define('Order', {
  order_info_uid: {
    type: DataTypes.INTEGER,
    primaryKey: true, // order_uid를 기본 키로 설정
    autoIncrement: true, // 자동 증가 속성 추가
  },
  user_uid: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
  },
  product_list: {
    type: DataTypes.JSON,
  },
  order_sale_amount: {
    type: DataTypes.INTEGER,
  },
  order_default_price: {
    type: DataTypes.INTEGER,
  },
  order_final_price: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.INTEGER,
  },
  destination: {
    type: DataTypes.JSON,
  },
  payment: {
    type: DataTypes.STRING,
  },
  delivery_price: {
    type: DataTypes.INTEGER, 
  },
  delivery_mes: {
    type: DataTypes.STRING,
  },
  delivery_used_coupon: {
    type: DataTypes.JSON,
  },
  orderer_name: {
    type: DataTypes.STRING,
  },
  orderer_phone: {
    type: DataTypes.STRING,
  },
  recipient_name: {
    type: DataTypes.STRING,
  },
  recipient_phone: {
    type: DataTypes.STRING,
  },
  using_points: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'order_info', // 테이블 이름 설정 (order_info)
});

// 모델을 데이터베이스에 동기화하여 테이블을 생성합니다.
sequelize.sync()
  .then(() => {
    console.log('order 모델과 데이터베이스 동기화 완료');
  })
  .catch((error) => {
    console.error('동기화 오류:', error);
  });


module.exports = Order;