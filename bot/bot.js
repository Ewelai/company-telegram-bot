const URL = process.env.URL;
const PORT = process.env.PORT || 2000;
const BOT_TOKEN = process.env.BOT_TOKEN;

const Telegraf = require('telegraf');
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Markup = require('telegraf/markup')
const bot = new Telegraf(BOT_TOKEN);
const { ttn, driverLicense, warehouseLicense } = require('../scenarios/scenario');

bot.telegram.setWebhook(`${URL}bot${BOT_TOKEN}`);
bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)

bot.start((ctx) => {
  // console.log('Id пользователя:', ctx.from.id);
  // console.log(ctx.from);
  return ctx.reply('Welcome! Choose your destiny, please.', Markup.inlineKeyboard([
    Markup.callbackButton('TTN number', 'ttnNumber'),
    // Markup.callbackButton('Driver license', 'driverLicense'),
    Markup.callbackButton('Warehouse license', 'warehouseLicense')
  ]).extra());
});

// Create stages
const stage = new Stage();
stage.register(ttn);
// stage.register(driverLicense);
stage.register(warehouseLicense);

// Config stages
bot.use(session());
bot.use(stage.middleware());
bot.launch()

// Actions
bot.action('ttnNumber', (ctx) => ctx.scene.enter('ttnNumber'));
// bot.action('driverLicense', (ctx) => ctx.scene.enter('driverLicense'));
bot.action('warehouseLicense', (ctx) => ctx.scene.enter('warehouseLicense'));

module.exports = bot;
