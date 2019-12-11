const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

let createToken = (data) => {
  return jwt.sign(data, jwtSecret)
}

module.exports = {
  createToken
}
