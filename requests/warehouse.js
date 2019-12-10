const rp = require('request-promise');
const { ERROR } = require('../consts/messages');
const { TEMPLATE_DRIVER } = require('../consts/templates');
const headers = {
  'Authorization': `Bearer ${process.env.TOKEN_WH}`
}

const warehouseInfo = async (license) => {
  let options = {
    headers,
    url: `${process.env.WH_API}/api/warehouseAddress/${license}`,
    method: 'Get'
  }

  return rp(options).then((body) => {
    console.log(body)
    return TEMPLATE_DRIVER(JSON.parse(body));
  }).catch((err) => {
    return ERROR;
  })
}

module.exports = { warehouseInfo }
