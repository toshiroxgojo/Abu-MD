const { Module,isPublic } = require("../lib/");
const { FancyRandom } = require('abu-bot');
Module(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "check bot ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    const botz = await FancyRandom("Testing Bot Speed...⌫")
    await message.reply(botz);
    const end = new Date().getTime();    
const Jsl1 = await FancyRandom("✿︎..Response in " + (end - start) + " ms..✿︎")
    return await message.reply(Jsl1);
  }
);
