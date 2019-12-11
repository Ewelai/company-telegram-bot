const Telegraf = require('telegraf');
const session = require("telegraf/session");
const Stage = require("telegraf/stage");

// const Markup = require('telegraf/markup')
const bot = new Telegraf(process.env.BOT_TOKEN);
const scene = require('../scenarios/scenario');

const stage = new Stage();
stage.register(scene.login);
stage.register(scene.expressCargoScene);
// stage.register(driverLicense);
stage.register(scene.warehouseScene);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.reply(`Welcome! Type login in chat for access.`)
});

// bot.start((ctx) => {
//   // console.log('Id пользователя:', ctx.from.id);
//   // console.log(ctx.from);
//   return ctx.reply('Welcome! Choose your destiny, please.', Markup.inlineKeyboard([
//     Markup.callbackButton('TTN number', 'ttnNumber'),
//     // Markup.callbackButton('Driver license', 'driverLicense'),
//     Markup.callbackButton('Warehouse license', 'warehouseLicense')
//   ]).extra());
// });


// Actions
bot.hears('login', Stage.enter('login'))
bot.action('expressCargo', (ctx) => ctx.scene.enter('expressCargo'));
bot.action('warehouse', (ctx) => ctx.scene.enter('warehouse'));

bot.launch()

module.exports = bot;
