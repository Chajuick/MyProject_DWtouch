const jwt = require('jsonwebtoken');

// 사용자 정보를 기반으로 토큰 생성
const generateToken = (userId) => {
  const payload = { userId };
  const secretKey = 'your-secret-key';
  const options = { expiresIn: '1h' }; // 토큰 만료 시간

  // 토큰 생성
  const token = jwt.sign(payload, secretKey, options);

  return token;
};

// 예시: 사용자 ID가 123인 경우 토큰 생성
const userId = 123;
const token = generateToken(userId);
console.log('Generated Token:', token);