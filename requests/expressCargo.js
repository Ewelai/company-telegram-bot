const rp = require('request-promise');
const { ERROR, ERROR_REQ } = require('../consts/messages');
const { TEMPLATE_TTN } = require('../consts/templates');


// FIX
const expressCargo = async (license, token) => {
  const headers = {
    'bot-token': token
  };

  const options = {
    url: `${process.env.EC_API}/ttn/${license}`,
    method: 'Get', 
    headers
  }

  console.log(options)

  return rp(options).then((body) => {
    try {
      console.log(body)
      return TEMPLATE_TTN(JSON.parse(body));
    } catch(err) {
      return ERROR_REQ
    }
  }).catch((err) => {
    console.log('err', err)
    
  });
}

module.exports = { expressCargo }
