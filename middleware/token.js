const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

let createToken = (email, pass, company) => {

}

let checkAuth = () => {

}

module.exports = {
  checkAuth,
  createToken
}
