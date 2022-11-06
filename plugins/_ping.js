const { Module, isPublic} = require("../lib/");

Module(
  {
    pattern: "ping ?(.*)",
    fromMe: isPublic,
    desc: "check ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    await message.reply("*_Testing Ping_.....*");
    const end = new Date().getTime();
    return await message.reply(
      "*_Response In " + (end - start) + " MS_....*"
    );
  }
);
