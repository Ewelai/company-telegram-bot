const Telegraf = require('telegraf');
const WizardScene = require("telegraf/scenes/wizard");
const Markup = require('telegraf/markup')
const { expressCargo } = require('../requests/expressCargo');
const { ERROR } = require('../constants/messages');
const { createToken } = require('../middleware/token');
const { BACK_LEAVE } = require('../constants/conditions');

/* TODO:
1. Порядок ввода == порядку записи в стейт 
*/

let dataForToken

const login = new WizardScene('login', (ctx) => {
  // ctx.reply('Enter your email, please!')
  // return ctx.wizard.next();
// }, (ctx) => {
//   ctx.reply('Enter your password, please!');
//   ctx.wizard.state.email = ctx.message.text;
//   return ctx.wizard.next();
// }, (ctx) => {
  ctx.wizard.state.password = '123'; 
  ctx.wizard.state.email = 'sysadmin@mail.ru'; // Invalid email. Remove 1 to get it valid
  const email = ctx.wizard.state.email;
  const pass = ctx.wizard.state.password;

  dataForToken = { email, pass };
  
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
  return ctx.wizard.next();
}, async(ctx) => {
  let license = ctx.message.text;
  const token = ctx.wizard.state.token;

  if(Number(license)) {
    ctx.reply('Loading...')
    const ttnLicense = await expressCargo(license, token);
    ctx.replyWithHTML(ttnLicense);
    return ctx.scene.leave();
  } else {
    ctx.reply(ERROR).then(() => {
      ctx.reply('Type "Back" to get back or "Leave" to stop session.');
    });

    return ctx.wizard.next();
  }
}, (ctx) => {
  BACK_LEAVE(ctx);
});

const warehouseScene = new WizardScene('warehouse', (ctx) => {
  ctx.reply('Enter warehouse license');
  const token = createToken({...dataForToken, company: 'main'});
  ctx.wizard.state.token = token;
  return ctx.scene.leave();
});

module.exports = { 
  expressCargoScene, 
  warehouseScene,
  login
};


// ctx.reply(ERROR).then(() => {
//   ctx.reply('Back', aboutMenu)
// });

// const aboutMenu = Telegraf.Extra
//   .markdown()
//   .markup((m) => m.keyboard([
//     m.callbackButton('Back')
//   ]).resize())
