const { Module, styletext, listall, tiny, isPublic } = require("../lib/");
Module(
  {
    pattern: "fancy ?(.*)",
    fromMe: isPublic,
    desc: "converts text to fancy text",
    type: "converter",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.text || isNaN(match)) {
      let text = tiny(
        "_Reply to a message\nExample: .fancy 32\n\n_"
      );
      listall("Fancy").forEach((txt, num) => {
        text += `${(num += 1)} ${txt}\n`;
      });
      return await message.reply(text);
    } else {
      message.reply(styletext(message.reply_message.text, parseInt(match)));
    }
  }
);

Module({
    pattern: 'react ?(.*)',
    fromMe: true,
    use: 'utility'
}, (async (m, t) => {
    let msg = {
        remoteJid: m.reply_message.jid,
        id: m.reply_message.id
    }
    const reactionMessage = {
        react: {
            text: t[1],
            key: msg
        }
    }

    await m.client.sendMessage(m.jid, reactionMessage);
}));
