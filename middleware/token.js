const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

const createToken = (data) => {
  return jwt.sign(data, jwtSecret)
};

module.exports = {
  createToken
}
