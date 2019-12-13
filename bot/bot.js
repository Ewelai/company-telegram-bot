const Telegraf = require('telegraf');
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const bot = new Telegraf(process.env.BOT_TOKEN, {polling: true});
const scene = require('../scenarios/scenario');
const { HELP, STOP } = require('../constants/messages');

const stage = new Stage();
stage.register(scene.login);
stage.register(scene.expressCargoScene);
stage.register(scene.warehouseScene);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.reply(`Welcome ${ctx.from.first_name}! Type "Login" to get access or just start conversation!`)
});

// Commands
// bot.command('stop', (ctx) => {
//   ctx.reply(STOP);
//   ctx.scene.login.leave();
//   ctx.scene.expressCargo.leave();
//   ctx.scene.warehouse.leave();
// });
bot.command('help', (ctx) => ctx.replyWithHTML(HELP));

bot.command('login', (ctx) => ctx.scene.enter('login'));

// Actions
// bot.hears('Login', Stage.enter('login'))
bot.action('expressCargo', (ctx) => ctx.scene.enter('expressCargo'));
bot.action('warehouse', (ctx) => ctx.scene.enter('warehouse'));

bot.launch()

module.exports = bot;


// bot.start((ctx) => {
//   // console.log('Id пользователя:', ctx.from.id);
//   // console.log(ctx.from);
//   return ctx.reply('Welcome! Choose your destiny, please.', Markup.inlineKeyboard([
//     Markup.callbackButton('TTN number', 'ttnNumber'),
//     // Markup.callbackButton('Driver license', 'driverLicense'),
//     Markup.callbackButton('Warehouse license', 'warehouseLicense')
//   ]).extra());
// });

