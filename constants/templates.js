const TEMPLATE_TTN = ({status, serialNumber, price, release_date, delivery_date}) => `
  Your query is successfull!
  <b>Status:</b> ${status}
  <b>License:</b> ${serialNumber}
  <b>Price:</b> ${price}
  <b>Release Date:</b> ${release_date}
  <b>Delivery Date:</b> ${delivery_date}
`;

const TEMPLATE_DRIVER = ({address}) => `
  Your query is successfull!
  <b>Address:</b> ${address}
`;

module.exports = {
  TEMPLATE_DRIVER,
  TEMPLATE_TTN
};
