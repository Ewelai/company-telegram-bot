const rp = require('request-promise');
const { ERROR } = require('../consts/messages');
const { TEMPLATE_WAREHOUSE } = require('../consts/templates');
const headers = {
  'Authorization': `Bearer ${process.env.TOKEN_WH}`
}

const warehouseInfo = async (license) => {
  let options = {
    headers,
    url: `${process.env.WH_API}/api/warehouseAddress/${license}`,
    method: 'Get'
  }

  return rp(options)
  .then((body) => {
    try {
      console.log(body)
      return TEMPLATE_WAREHOUSE(JSON.parse(body));
    } catch(err) {
      return ERROR_REQ
    }
  })
  .catch((err) => { 
    return ERROR;
  })
}

module.exports = { warehouseInfo }
