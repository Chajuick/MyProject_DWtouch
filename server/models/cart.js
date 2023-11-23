const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_uid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cart_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cart_option: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  cart_product_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cart_thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cart_price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'shoppingcart',
});

sequelize.sync()
  .then(() => {
    console.log('Cart 모델과 데이터베이스 동기화 완료');
  })
  .catch((error) => {
    console.error('동기화 오류:', error);
  });

module.exports = Cart;