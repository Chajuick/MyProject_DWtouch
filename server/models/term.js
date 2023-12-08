const { Sequelize, DataTypes } = require('sequelize');

// Sequelize 인스턴스를 생성하고 데이터베이스 연결 설정을 구성합니다.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// TermCondition 모델 정의
const TermCondition = sequelize.define('TermCondition', {
  terms_condition_uid: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 기본 키로 설정
    autoIncrement: true, // 자동 증가 속성 추가
  },
  terms_uid: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    unique: true, 
  },
  user_phone: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'terms_condition_info', // 테이블 이름 설정
});

// 모델을 데이터베이스에 동기화하여 테이블을 생성합니다.
sequelize.sync()
  .then(() => {
    console.log('term 모델과 데이터베이스 동기화 완료');
  })
  .catch((error) => {
    console.error('동기화 오류:', error);
  });


module.exports = TermCondition;