const Telegraf = require('telegraf');
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const bot = new Telegraf(process.env.BOT_TOKEN, {polling: true});
const scene = require('./scenarios/scenario');
const { HELP, STOP } = require('./constants/messages');

const stage = new Stage();
stage.register(scene.login);
stage.register(scene.expressCargoScene);
stage.register(scene.warehouseScene);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  ctx.replyWithHTML(`Welcome ${ctx.from.first_name}! Type /login to get access or just start conversation!`)
});

// Commands
// bot.command('stop', (ctx) => {
//   ctx.reply(STOP);
//   ctx.scene.leave('login');
//   ctx.scene.leave('expressCargo');
//   ctx.scene.leave('warehouse');
// });
bot.command('help', (ctx) => ctx.replyWithHTML(HELP));
bot.command('login', (ctx) => ctx.scene.enter('login'));
bot.hears('/stop', (ctx) => {
  ctx.reply(STOP);
  ctx.scene.leave('login');
  ctx.scene.leave('expressCargo');
  ctx.scene.leave('warehouse');
})

// Actions
bot.action('expressCargo', (ctx) => ctx.scene.enter('expressCargo'));
bot.action('warehouse', (ctx) => ctx.scene.enter('warehouse'));

bot.launch()

module.exports = bot;
