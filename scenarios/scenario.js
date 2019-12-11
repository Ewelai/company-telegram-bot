const WizardScene = require("telegraf/scenes/wizard");
const Markup = require('telegraf/markup')
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

/* TODO:
1. Порядок ввода == порядку записи в стейт 
*/

const login = new WizardScene('login', (ctx) => {
  // ctx.reply('Enter your email, please!')
  // return ctx.wizard.next();
// }, (ctx) => {
//   ctx.reply('Enter your password, please!')
//   ctx.wizard.state.email = ctx.message.text;
//   return ctx.wizard.next();
// }, (ctx) => {
  ctx.wizard.state.password = 'passw';
  ctx.wizard.state.email = 'em';
  const email = ctx.wizard.state.email;
  const pass = ctx.wizard.state.password;

  console.log('email', email)
  console.log('pass', pass)
  ctx.reply('Welcome! Choose your destiny, please.', Markup.inlineKeyboard([
    Markup.callbackButton('Express Cargo', 'expressCargo'),
    Markup.callbackButton('Warehouse', 'warehouse')
  ]).extra());
  return ctx.scene.leave();
});

const expressCargoScene = new WizardScene('expressCargo', (ctx) => {
  ctx.reply('ECScene')
  return ctx.scene.leave();
});

const warehouseScene = new WizardScene('warehouse', (ctx) => {
  ctx.reply('WHScene')
  return ctx.scene.leave();
});

// const ttn = new WizardScene('ttnNumber', (ctx) => {
  // First step
  // ctx.reply('Enter ttn');
//   return ctx.wizard.next();
// }, async(ctx) => {
//   // Second step
//   let license = ctx.message.text;
//   if(!isNaN(license)) {
//     let result = await expressCargo(license);
//     ctx.replyWithHTML(result);
//     return ctx.scene.leave();
//   } else {
//     return ctx.reply(ERROR);
//   }
// });

// const driverLicense = new WizardScene('driverLicense', (ctx) => {
//   ctx.reply('Enter driver license');
//   return ctx.wizard.next();
// }, (ctx) => {
//   ctx.reply('Finish driver');
//   return ctx.scene.leave();
// });

// const warehouseLicense = new WizardScene('warehouseLicense', (ctx) => {
//   ctx.reply('Enter warehouse license');
//   return ctx.wizard.next();
// }, async(ctx) => {
//   let license = ctx.message.text;
//   if(!isNaN(license)) {
//     let result = await warehouseInfo(license);
//     ctx.replyWithHTML(result);
//     return ctx.scene.leave();
//   } else {
//     return ctx.reply(ERROR);
//   }
// });

module.exports = { 
  expressCargoScene, 
  warehouseScene,
  login
  // driverLicense,
};
