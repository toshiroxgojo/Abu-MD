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
    await message.sendMessage("❮ _Testing Bot Ping_ ❯");
    const end = new Date().getTime();
    return await message.sendMessage(
      "Response IN " + (end - start) + " MS_"
    );
  }
);
