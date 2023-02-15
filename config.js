/* Copyright (C) 2023 Abu-MD
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Abu-MD - Jsl
*/
  
const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./database.db" : process.env.DATABASE_URL
let HANDLER = "false";
module.exports = {
  VERSION: require("./package.json").version,
    SESSION_ID: process.env.SESSION_ID || '', //your ssid to run bot
    MODE: process.env.MODE || "public",
    DATABASE: DATABASE_URL === "./database.db" ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: false }) : new Sequelize(DATABASE_URL, {dialect: "postgres", ssl: true, protocol: "postgres", dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false }),
    SUDO: process.env.SUDO || "917025994178",
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  LANG: process.env.LANG || "EN",
  HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "^[!]",
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "main",
  PACKNAME: process.env.PACKNAME || "Abu",
  WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
  GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
  AUTHOR: process.env.AUTHOR || "Jsl",
 };
