const { Sequelize, DataTypes } = require('sequelize');

// Sequelize 인스턴스를 생성하고 데이터베이스 연결 설정을 구성합니다.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// User 모델 정의
const User = sequelize.define('User', {
  user_uid: {
    type: DataTypes.INTEGER,
    primaryKey: true, // user_uid를 기본 키로 설정
    autoIncrement: true, // 자동 증가 속성 추가
  },
  user_id: {
    type: DataTypes.STRING, // 사용자 아이디를 문자열로 정의
    allowNull: false, // 필수 항목
    unique: true, // 고유한 아이디여야 함
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_phone_num: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_birth_date: {
    type: DataTypes.STRING,
  },
  user_gender: {
    type: DataTypes.STRING(1), // VARCHAR(1)로 변경
  },
  user_address: {
    type: DataTypes.STRING,
  },
  user_postcode: {
    type: DataTypes.STRING,
  },
  user_detailaddress: {
    type: DataTypes.STRING,
  },
  user_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // 기본값 0
  },
  user_grades: {
    type: DataTypes.TINYINT,
    defaultValue: 1, // 기본값 1
  },
  user_permissions: {
    type: DataTypes.TINYINT,
    defaultValue: 1, // 기본값 1
  },
  user_total_purchase_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
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
  tableName: 'user_info', // 테이블 이름 설정 (user_info)
});

// 모델을 데이터베이스에 동기화하여 테이블을 생성합니다.
sequelize.sync()
  .then(() => {
    console.log('User 모델과 데이터베이스 동기화 완료');
  })
  .catch((error) => {
    console.error('동기화 오류:', error);
  });


module.exports = User;