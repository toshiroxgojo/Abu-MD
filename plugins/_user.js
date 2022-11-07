const { Module } = require("../lib/");

Module(
  {
    pattern: "pp ?(.*)",
    fromMe: true,
    desc: "Set profile picture",
    type: "user",
  },
  async (message, match) => {
    if (!message.reply_message.image) return await message.reply("_Reply to a photo_");
    let media = await message.reply_message.download();
    await message.client.updateProfilePicture(message.jid, { url: media })
    return await message.reply("_Profile Picture Updated_");
  }
);

Module(
  {
    pattern: "setname ?(.*)",
    fromMe: true,
    desc: "Set User name",
    type: "user",
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match) return await message.reply("_Enter name_");
    await message.updateName(match);
    return await message.reply(`_Username Updated : ${match}_`);
  }
);

Module(
  {
    pattern: "setbio ?(.*)",
    fromMe: true,
    desc: "To change your profile status",
    type: "user",
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match) return await message.reply("_Need Status!_\n_Example: setbio Hey there! I am using WhatsApp._");
    await message.updateBio(match);
    return await message.reply("_Profile status updated_");
  }
);

Module(
  {
    pattern: "block ?(.*)",
    fromMe: true,
    desc: "Block a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.send(`_@${jid.split("@")[0]} Blocked_`, { mentions: [jid] });
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);

Module(
  {
    pattern: "unblock ?(.*)",
    fromMe: true,
    desc: "Unblock a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.send(`_@${jid.split("@")[0]} unblocked_`, { mentions: [jid] });
    } else {
      await message.unblock(message.jid);
      return await message.reply("_User unblocked_");
    }
  }
);

Module(
  {
    pattern: "jid",
    fromMe: true,
    desc: "Give jid of chat/user",
    type: "user",
  },
  async (message, match) => {
    return await message.send(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);

Module(
  {
    pattern: "react ?(.*)",
    fromMe: true,
    desc: "sends reaction",
    type: "user" ,
  },
  async (message, match) => {
   await message.react(
     match, message.reply_message.key
   );
  }
);

Module(
  {
    pattern: "pin ?(.*)",
    fromMe: true,
    desc: "Pin a chat",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.pinChat(message.jid, true)
    await message.reply("_Pined_");
  }
);

Module(
  {
    pattern: "unpin ?(.*)",
    fromMe: true,
    desc: "Unpin a chat",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.pinChat(message.jid, false)
    await message.reply("_Unpined_");
  }
);

Module(
  {
    pattern: "archive ?(.*)",
    fromMe: true,
    desc: "Archive a chat",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.archiveChat(message.jid, true)
    await message.reply("_Archived_")
  }
);

Module(
  {
    pattern: "unarchive ?(.*)",
    fromMe: true,
    desc: "Unarchive a chat",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.archiveChat(message.jid, false)
    await message.reply("_Unarchived_")
  }
);
