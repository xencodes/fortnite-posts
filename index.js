const telegraf = require("telegraf");
const axios = require("axios");
const image_hash = require("image-hash");

const CHANNEL_ID = -1001277944777;

let OLD_HASH = "";
const bot = new telegraf("654659052:AAEDWkjSea0waJPnshKvoUJA-pgia_TlxDo");
bot.telegram.sendMessage(CHANNEL_ID, `Started`);

function check_hash() {
  bot.telegram.sendMessage(CHANNEL_ID, `Checking...`);
  image_hash.imageHash("https://shorturl.at/uAIT5", 16, true, (err, data) => {
    if (OLD_HASH !== "" && OLD_HASH !== data) {
      bot.telegram.sendMessage(
        CHANNEL_ID,
        `Image updated... \nOLD: ${OLD_HASH}\nNEW:${data}\n\nhttps://shorturl.at/uAIT5`
      );
    }
    OLD_HASH = data;
  });
}

bot.command("ping", ctx => ctx.reply("i am alive"));

setInterval(() => {
  check_hash();
}, 1000 * 60 * 60);
bot.launch();
