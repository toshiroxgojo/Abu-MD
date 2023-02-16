const { Module ,isPublic } = require("../lib/");
Module(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "To check ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    await message.reply("*_Testing Bot Speed..._*");
    const end = new Date().getTime();
    return await message.reply(
      "*_Response in" + (end - start) + "ms_*"
    );
  }
);
