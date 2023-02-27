const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";
module.exports = {
  AUDIO_DATA: process.env.AUDIO_DATA === undefined || process.env.AUDIO_DATA === "private" ? 'Abu¹¹ꫂ;Abu MD bot;https://www.linkpicture.com/q/rgnk.jpg' : process.env.AUDIO_DATA,
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f","deb80cd12ababea1c9b9a8ad6ce3fab2","78c84c62b32a88e86daf87dd509a657a"],
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  SESSION_ID:process.env.SESSION_ID || "inrl~7pL1J8UGHftwhE/P63aHSiUKkLAKaF+/ZJYnAg",
  LANG: process.env.LANG || "EN",
  HANDLERS:
    process.env.HANDLER === "false" || process.env.HANDLER === "null"
      ? "^"
      : "^"
      : ".",
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "main",
  PACKNAME: process.env.PACKNAME || "Abu,💔",
  BOT_INFO: process.env.BOT_INFO || 'Abu;Jsl;927025⁸;https://i.imgur.com/P7ziVhr.jpeg;https://chat.whatsapp.com/Dt3C4wrQmt0GG6io1IBIHb',
  WELCOME_MSG:
    process.env.WELCOME_MSG ||
    "Hi @user Welcome to @gname",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
  AUTHOR: process.env.AUTHOR || "ToxicLeo",
  DATABASE_URL: DATABASE_URL,
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
  SUDO: process.env.SUDO || "917025994178",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  MODE: process.env.MODE || "public",
};
