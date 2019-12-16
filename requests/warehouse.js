const rp = require('request-promise')
const { ERROR_REQ } = require('../constants/messages')
const { TEMPLATE_WAREHOUSE } = require('../constants/templates')

const warehouseInfo = async (license, token) => {
  const headers = {
    'bot-token': token
  }

  const options = {
    headers,
    url: `${process.env.WH_API}/api/warehouseToSideService/${license}`,
    // url: `http://localhost:5000/api/warehouseToSideService/${license}`,
    method: 'Get'
  }

  return rp(options)
  .then((body) => {
    try {
      return TEMPLATE_WAREHOUSE(JSON.parse(body));
    } catch(err) {
      return ERROR_REQ;
    }
  })
  .catch((err) => {
    let error = JSON.parse(err.error);
    return `${error.message} Your session is finished!`;
  })
}

module.exports = { warehouseInfo }
