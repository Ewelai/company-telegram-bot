const WizardScene = require("telegraf/scenes/wizard");
const { warehouseInfo } = require('../requests/warehouse');
const { expressCargo } = require('../requests/expressCargo');
const { ERROR } = require('../consts/messages');
const { TEMPLATE_DRIVER, TEMPLATE_TTN } = require('../consts/templates');

// Models
// const TTNModel = require('../models/TTN');

/* 
  Release dete - warehouse
  Delivery Date - truck way
*/

const ttn = new WizardScene('ttnNumber', (ctx) => {
  // First step
  ctx.reply('Enter ttn');
  return ctx.wizard.next();
}, async(ctx) => {
  // Second step
  let license = ctx.message.text;
  if(!isNaN(license)) {
    let result = await expressCargo(license);
    ctx.replyWithHTML(result);
    return ctx.scene.leave();
  } else {
    return ctx.reply(ERROR);
  }
});

// const driverLicense = new WizardScene('driverLicense', (ctx) => {
//   ctx.reply('Enter driver license');
//   return ctx.wizard.next();
// }, (ctx) => {
//   ctx.reply('Finish driver');
//   return ctx.scene.leave();
// });

const warehouseLicense = new WizardScene('warehouseLicense', (ctx) => {
  ctx.reply('Enter warehouse license');
  return ctx.wizard.next();
}, async(ctx) => {
  let license = ctx.message.text;
  if(!isNaN(license)) {
    let result = await warehouseInfo(license);
    ctx.replyWithHTML(result);
    return ctx.scene.leave();
  } else {
    return ctx.reply(ERROR);
  }
});

module.exports = { 
  ttn, 
  warehouseLicense
  // driverLicense,
};
