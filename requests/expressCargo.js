const rp = require('request-promise');
const { ERROR } = require('../consts/messages');
const { TEMPLATE_TTN } = require('../consts/templates');


// FIX
const expressCargo = async (license) => {
  let options = {
    url: `${process.env.EC_API}/ttn/${license}`,
    method: 'Get'
  }

  console.log(options.url)

  return rp(options).then((body) => {
    console.log(body)
    return TEMPLATE_TTN(JSON.parse(body));
  }).catch((err) => {
    console.log(err)
    return ERROR;
  });
}

module.exports = { expressCargo }
