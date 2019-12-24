const Telegraf = require('telegraf');
const WizardScene = require("telegraf/scenes/wizard");
const Markup = require('telegraf/markup')
const { warehouseInfo } = require('../requests/warehouse');
const { expressCargo } = require('../requests/expressCargo');
const { ERROR } = require('../constants/messages');
const { createToken } = require('../middleware/token');
const { BACK_LEAVE } = require('../constants/conditions');

let dataForToken

const login = new WizardScene('login', (ctx) => {
  ctx.reply('Enter your email, please!')

  return ctx.wizard.next();
}, (ctx) => {
  ctx.reply('Enter your password, please!')
  ctx.wizard.state.email = ctx.message.text;

  return ctx.wizard.next();
}, (ctx) => {
  const email = ctx.wizard.state.email.toLowerCase();
  const pass = ctx.wizard.state.password;

  dataForToken = { email, pass };
  
  ctx.reply('Welcome! Choose your destiny, please.', Markup.inlineKeyboard([
    Markup.callbackButton('Express Cargo', 'expressCargo'),
    Markup.callbackButton('Warehouse', 'warehouse')
  ]).extra());

  return ctx.scene.leave();
});

const sceneCreator = (company, type, serviceRequest) => {
  return new WizardScene(company, (ctx) => {

    ctx.reply(`Enter ${type} license`)
    const token = createToken({...dataForToken, company})
    ctx.wizard.state.token = token;

    return ctx.wizard.next()
  }, async(ctx) => {
    let license = ctx.message.text;
    const token = ctx.wizard.state.token;

    if(Number(license)) {
      ctx.reply('Loading...')
      const ttnLicense = await serviceRequest(license, token);
      ctx.replyWithHTML(ttnLicense);
    } else {
      ctx.reply(ERROR).then(() => {
        ctx.reply('Type "Back" to get back or "Leave" to stop session.');
      });

      return ctx.wizard.next();
    }
  }, (ctx) => {
    BACK_LEAVE(ctx);
  });
}

const expressCargoScene = sceneCreator('expressCargo', 'ttn', expressCargo) 
const warehouseScene = sceneCreator('warehouse', 'warehouse', warehouseInfo)

module.exports = { 
  expressCargoScene, 
  warehouseScene,
  login
};
