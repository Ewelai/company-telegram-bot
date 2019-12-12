const WizardScene = require("telegraf/scenes/wizard");
const Markup = require('telegraf/markup')
const { expressCargo } = require('../requests/expressCargo');
const { warehouseInfo } = require('../requests/warehouse');
const { ERROR } = require('../consts/messages');
const { TEMPLATE_TTN, TEMPLATE_WAREHOUSE } = require('../consts/templates');
const { createToken } = require('../middleware/token')

/* TODO:
1. Порядок ввода == порядку записи в стейт 
*/
let dataForToken

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

  dataForToken = { email, pass }
  
  ctx.reply('Welcome! Choose your destiny, please.', Markup.inlineKeyboard([
    Markup.callbackButton('Express Cargo', 'expressCargo'),
    Markup.callbackButton('Warehouse', 'warehouse')
  ]).extra());
  return ctx.scene.leave();
});

const expressCargoScene = new WizardScene('expressCargo', (ctx) => {
  ctx.reply('Enter ttn license')
  const token = createToken({...dataForToken, company: 'express_cargo'})
  ctx.wizard.state.token = token;
  return ctx.wizard.next()
}, async(ctx) => {
  let license = ctx.message.text
  const token = ctx.wizard.state.token

  if(Number(license)) {
    const ttnLicense = await expressCargo(license, token)

    ctx.reply('Loading...')
    ctx.replyWithHTML(ttnLicense);
    return ctx.scene.leave();
  } else {
    // ctx.reply(ERROR);
    // return ctx.reply(ERROR, Markup.inlineKeyboard([
    //   Markup.callbackButton('Back', 'scBack'),
    //   Markup.callbackButton('Leave', 'scLeave')
    // ]).extra());
  }

  // return ctx.scene.leave();
});

const warehouseScene = new WizardScene('warehouse', (ctx) => {
  ctx.reply('Enter warehouse license')
  const token = createToken({...dataForToken, company: 'main'})
  ctx.wizard.state.token = token;
  return ctx.scene.leave();
});

module.exports = { 
  expressCargoScene, 
  warehouseScene,
  login
};
