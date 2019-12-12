const rp = require('request-promise');
const { ERROR, ERROR_REQ } = require('../constants/messages');
const { TEMPLATE_TTN } = require('../constants/templates');

const expressCargo = async (license, token) => {
  const headers = {
    'bot-token': token
  };

  const options = {
    url: `${process.env.EC_API}/ttn/${license}`,
    method: 'Get', 
    headers
  };

  return rp(options).then((body) => {
    try {
      console.log(body)
      return TEMPLATE_TTN(JSON.parse(body));
    } catch(err) {
      return ERROR_REQ;
    }
  }).catch((err) => {
    let error = JSON.parse(err.error);
    return `${error.message} Your session is finished!`;
  });
};

module.exports = { expressCargo };
