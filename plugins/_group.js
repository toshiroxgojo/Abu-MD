const {
    getString
} = require('../lib/misc/lang');
const Lang = getString('group');
const {
    Module,isAdmin
} = require('../lib/')
Module({
    pattern: 'kick ?(.*)',
    fromMe: true,
    desc: Lang.KICK_DESC,
    type: 'group'
}, (async (message, match) => {
    
Module({
    pattern: 'add ?(.*)',
    fromMe: true,
    desc: Lang.ADD_DESC,
    type: 'group'
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var init = match[1] || message.reply_message.jid.split("@")[0]
    if (!init) return await message.reply(Lang.NEED_USER)
    var admin = await isAdmin(message);
    if (!admin) return await message.reply(Lang.NOT_ADMIN)
    var initt = init.split(" ").join("")
    var user = initt.replace(/\+/g, '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '')
    await message.client.groupAdd(user,message)
}))


Module(
  {
    pattern: "alljid",
    fromMe: true,
    desc: "gets jid of all group members",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This Module is for groups_");
    let { participants } = await client.groupMetadata(message.jid);
    let participant = participants.map((u) => u.id);
    let str = "╭──〔 *_ All Group Members Jids_* 〕\n";
    participant.forEach((result) => {
      str += `├ *${result}*\n`;
    });
    str += `╰──────────────`;
    message.reply(str);
  }
);

Module(
  {
    pattern: "kick ",
    fromMe: isPublic,
    desc: "kicks a person from group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This Module is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to kick");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin_");
    let jid = parsedJid(match);
    await message.kick(jid);
    return await message.reply(`@${jid[0].split("@")[0]} kicked`, {
      mentions: jid,
    });
  }
);

Module(
  {
    pattern: "amute",
    fromMe: true,
    desc: "auto mutes group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This Module is for groups_");
    if (!match) return message.reply("_Enter time to mute_\nEg : amute 20:10");

    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_I'm not admin_");
    message.reply(`_Group will mute at ${match}_`);
    await saveSchedule(message.jid, match, async () => {
      await message.reply("_Muting_");
      return await client.groupSettingUpdate(message.jid, "announcement");
    });
    return cron(match, async () => {
      await message.reply("_Muting_");
      return await client.groupSettingUpdate(message.jid, "announcement");
    });
  }
);

Module(
  {
    pattern: "aunmute",
    fromMe: true,
    desc: "auto unmutes group",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This Module is for groups_");
    if (!match)
      return message.reply("_Enter time to unmute_\nEg : aunmute 20:10");

    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_I'm not admin_");
    message.reply(`_Group will unmute at ${match}_`);
    await saveSchedule(message.jid, match, async () => {
      await message.reply("_Auto Unmuting_");
      return await client.groupSettingUpdate(message.jid, "not_announcement");
    });
    return cron(match, async () => {
      await message.reply("_Auto Unmuting_");
      return await client.groupSettingUpdate(message.jid, "not_announcement");
    });
  }
);


Module(
  {
    pattern: "promote ",
    fromMe: isPublic,
    desc: "promote a member",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This Module is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to promote_");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin_");
    let jid = parsedJid(match);
    await message.promote(jid);
    return await message.reply(`@${jid[0].split("@")[0]} promoted as admin`, {
      mentions: jid,
    });
  }
);

Module(
  {
    pattern: "demote ",
    fromMe: isPublic,
    desc: "demote a member",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This Module is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to demote");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin_");
    let jid = parsedJid(match);
    await message.demote(jid);
    return await message.reply(`@${jid[0].split("@")[0]} demoted from admin`, {
      mentions: jid,
    });
  }
);


Module({
    pattern: 'leave',
    fromMe: true,
    desc: Lang.LEAVE_DESC
}, (async (message, match) => {
    
    return await message.client.groupLeave(message.jid);
}))
Module({
    pattern: 'quoted',
    fromMe: true,
    desc:"Sends replied message's replied message. Useful for recovering deleted messages."
}, (async (message, match) => {
    try {
    var msg = await message.client.store.toJSON()?.messages[message.jid]?.toJSON().filter(e=>e.key.id===message.reply_message.id)
    var quoted = msg[0].message[Object.keys(msg[0].message)].contextInfo;
    var quoted2 = await message.client.store.toJSON()?.messages[message.jid]?.toJSON().filter(e=>e.key.id===quoted.stanzaId)
    if (quoted2.length) return await message.forwardMessage(message.jid,quoted2[0]);
    var obj = {key: {remoteJid: message.jid,fromMe: true,id: quoted.stanzaId,participant: quoted.participant},message: quoted.quotedMessage}
    return await message.forwardMessage(message.jid,obj);
    } catch { return await message.reply("_Failed to load message!_") }
})) 
Module({
    pattern: 'msgs ?(.*)',
    fromMe: true,
    desc:"Shows number of messages sent by each member. (Only from when bot was set up)"
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var m = message; var conn = message.client;
    let msgs = await conn.getMessages(m.jid);
    var users = (await conn.groupMetadata(m.jid)).participants.map(e=>e.id);
    if (message.mention[0]) users = message.mention;
    if (message.reply_message && !message.mention.length) users = message.reply_message.jid;
    function timeSince(date){var seconds=Math.floor((new Date()-date)/1000);var interval=seconds/31536000;if(interval>1){return Math.floor(interval)+" years ago"}
    interval=seconds/2592000;if(interval>1){return Math.floor(interval)+" months ago"}
    interval=seconds/86400;if(interval>1){return Math.floor(interval)+" days ago"}
    interval=seconds/3600;if(interval>1){return Math.floor(interval)+" hours ago"}
    interval=seconds/60;if(interval>1){return Math.floor(interval)+" minutes ago"}
    return Math.floor(seconds)+" seconds ago"};
    const flc = (x) => {
    if (x === "undefined") x = "others"
    try { return x.charAt(0).toUpperCase() + x.slice(1) } catch { return x }
    }
    let final_msg = "_Messages sent by each users_\n\n";
    for (let user of users){
    if (Object.keys(msgs).includes(user)){
    let count = msgs[user].total
    let name = msgs[user].name?.replace( /[\r\n]+/gm, "" )
    let lastMsg = timeSince(msgs[user].time)
    let types = msgs[user].type
    let types_msg = "\n"
    for (var type in types){
        types_msg+=`_${flc(type)}: *${types[type]}*_\n`
    } 
    final_msg+=`_Participant: *+${user.split("@")[0]}*_\n_Name: *${name}*_\n_Total msgs: *${count}*_\n_Last msg: *${lastMsg}*_${types_msg}\n\n`
}
}
return await m.sendReply(final_msg)

}))
Module({
    pattern: 'mute ?(.*)',
    type: 'group',
    fromMe: true,
    desc: Lang.MUTE_DESC,
    usage:'mute 1h\nmute 5m'
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var admin = await isAdmin(message);
    if (!admin) return await message.reply(Lang.NOT_ADMIN)
    if (match[1]){
    const h2m = function(h){return (1000*60*60*h)}
    const m2m = function(m){return (1000*60*m)}
    let duration = match[1].endsWith("h") ? h2m(match[1].match(/\d+/)[0]) : m2m(match[1].match(/\d+/)[0])
    match = match[1].endsWith("h") ? match[1]+'ours' : match[1]+'mins'
    await message.client.groupSettingUpdate(message.jid, 'announcement')
    await message.send(`_Muted for ${match}_`)
    await require("timers/promises").setTimeout(duration);
    return await message.client.groupSettingUpdate(message.jid, 'not_announcement')
    await message.send(Lang.UNMUTED)    
}
    await message.client.groupSettingUpdate(message.jid, 'announcement')
    await message.send(Lang.MUTED)
}))
Module({
    pattern: 'unmute',
    type: 'group',
    fromMe: true,
    desc: Lang.UNMUTE_DESC
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var admin = await isAdmin(message);
    if (!admin) return await message.reply(Lang.NOT_ADMIN)
    await message.client.groupSettingUpdate(message.jid, 'not_announcement')
    await message.send(Lang.UNMUTED)
}))
Module({
    pattern: 'jid',
    type: 'group',
    fromMe: true,
    desc: Lang.JID_DESC
}, (async (message, match) => {
    var jid = message.reply_message.jid || message.jid
    await message.reply(jid)
}))
Module({
    pattern: 'invite',
    fromMe: true,
    type: 'group',
    desc: Lang.INVITE_DESC
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var admin = await isAdmin(message);
    if (!admin) return await message.reply(Lang.NOT_ADMIN)
    var code = await message.client.groupInviteCode(message.jid)
    await message.client.sendMessage(message.jid, {
        text: "https://chat.whatsapp.com/" + code,detectLinks: true
    },{detectLinks: true})
}))
Module({
    pattern: 'revoke',
    fromMe: true,
    type: 'group',
    desc: Lang.REVOKE_DESC
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var admin = await isAdmin(message);
    if (!admin) return await message.reply(Lang.NOT_ADMIN)
    await message.client.groupRevokeInvite(message.jid)
    await message.send(Lang.REVOKED)
}))
Module({
    pattern: 'glock ?(.*)',
    fromMe: true,
    type: 'group',
    desc: "Change group settings to allow only admins to edit group's info!"
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    if (!(await isAdmin(message))) return await message.reply(Lang.NOT_ADMIN)
    return await message.client.groupSettingUpdate(message.jid,"locked")
}))
Module({
    pattern: 'gunlock ?(.*)',
    fromMe: true,
    type: 'group',
    desc: "Change group settings to allow everyone to edit group's info!"
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    if (!(await isAdmin(message))) return await message.reply(Lang.NOT_ADMIN)
    return await message.client.groupSettingUpdate(message.jid,"unlocked")
}))
Module({
    pattern: 'gname ?(.*)',
    fromMe: true,
    type: 'group',
    desc: "Change group subject"
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    let newName = match[1] || message.reply_message?.text
    if (!newName) return await message.reply("_Need text!_")
    var {restrict} = await message.client.groupMetadata(message.jid);
    if (restrict && !(await isAdmin(message))) return await message.reply(Lang.NOT_ADMIN)
    return await message.client.groupUpdateSubject(message.jid,(match[1] || message.reply_message?.text).slice(0,25))
}))
Module({
    pattern: 'gdesc ?(.*)',
    fromMe: true,
    type: 'group',
    desc: "Change group description"
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    let newName = match[1] || message.reply_message?.text
    if (!newName) return await message.reply("_Need text!_")
    var {restrict} = await message.client.groupMetadata(message.jid);
    if (restrict && !(await isAdmin(message))) return await message.reply(Lang.NOT_ADMIN)
    try { return await message.client.groupUpdateDescription(message.jid,(match[1] || message.reply_message?.text).slice(0,512)) } catch { return await message.reply("_Failed to change!_")}
}))
Module({
    pattern: 'common ?(.*)',
    fromMe: true,
    type: 'group',
    desc: "Get common participants in two groups, and kick using .common kick jid"
}, (async (message, match) => {
if (!match[1]) return await message.reply("*Need jids*\n*.common jid1,jid2*\n _OR_ \n*.common kick group_jid*")
if (match[1].includes("kick")) {
var co = match[1].split(" ")[1]
var g1 = (await message.client.groupMetadata(co))
var g2 = (await message.client.groupMetadata(message.jid)) 
var common = g1.participants.filter(({ id: id1 }) => g2.participants.some(({ id: id2 }) => id2 === id1));
var jids = [];
var msg = `Kicking common participants of:* ${g1.subject} & ${g2.subject} \n_count: ${common.length} \n`
common.map(async s => {
msg += "```@"+s.id.split("@")[0]+"```\n"
jids.push(s.id.split("@")[0]+"@s.whatsapp.net")
})    
await message.client.sendMessage(message.jid, {
        text: msg,
        mentions: jids
    })
for (let user of jids){
await new Promise((r) => setTimeout(r, 1000))
await message.client.groupParticipantsUpdate(message.jid, [user], "remove")
}
return;
}
var co = match[1].split(",")
var g1 = (await message.client.groupMetadata(co[0]))
var g2 = (await message.client.groupMetadata(co[1])) 
var common = g1.participants.filter(({ id: id1 }) => g2.participants.some(({ id: id2 }) => id2 === id1));
var msg = `*Common participants of:* ${g1.subject} & ${g2.subject}\n_count: ${common.length}_ \n`
var jids = [];
common.map(async s => {
msg += "```@"+s.id.split("@")[0]+"```\n"
jids.push(s.id.split("@")[0]+"@s.whatsapp.net")
})    
await message.client.sendMessage(message.jid, {
        text: msg,
        mentions: jids
    })
}));
Module({
    pattern: 'diff ?(.*)',
    fromMe: true,
    type: 'utility',
    desc: "Get difference of participants in two groups"
}, (async (message, match) => {
if (!match[1]) return await message.reply("*Need jids*\n*.diff jid1,jid2*")
var co = match[1].split(",")
var g1 = (await message.client.groupMetadata(co[0])).participants
var g2 = (await message.client.groupMetadata(co[1])).participants 
var common = g1.filter(({ id: jid1 }) => !g2.some(({ id: jid2 }) => jid2 === jid1));
var msg = "*Difference of participants*\n_count: "+common.length+"_ \n"
common.map(async s => {
msg += "```"+s.id.split("@")[0]+"``` \n"
})    
return await message.reply(msg)
}));
Module({
    pattern: 'tagall',
    fromMe: true,
    desc: Lang.TAGALL_DESC,
    type: 'group'
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    var {participants} = await message.client.groupMetadata(message.jid)
    var jids = [];
    var mn = '';
    for (var i in participants){
    mn += (parseInt(i)+1)+'. @' + participants[i].id.split('@')[0] + '\n';
        jids.push(participants[i].id.replace('c.us', 's.whatsapp.net'));
    };
    var msg = mn
    await message.client.sendMessage(message.jid, {
        text: '```'+msg+'```',
        mentions: jids
    })
}))
Module({
    pattern: 'tagadmin',
    fromMe: true,
    desc: Lang.TAGALL_DESC,
    dontAddCommandList: true,
    type: 'group'
}, (async (message, match) => {
    if (!message.isGroup) return await message.reply(Lang.GROUP_COMMAND)
    if (message.reply_message) return;
    var group = await message.client.groupMetadata(message.jid)
    var jids = [];
    var mn = '';
    var admins = group.participants.filter(v => v.admin !== null).map(x => x.id);
    admins.map(async (user) => {
        mn += '@' + user.split('@')[0] + '\n';
        jids.push(user.replace('c.us', 's.whatsapp.net'));
    });
    var msg = mn
    await message.client.sendMessage(message.jid, {
        text: msg,
        mentions: jids
    })
}))
Module({
    pattern: 'block ?(.*)',
    fromMe: true,
    type: 'owner'
}, (async (message, match) => {
    var isGroup = message.jid.endsWith('@g.us')
    var user = message.jid
    if (isGroup) user = message.mention[0] || message.reply_message.jid
    await message.client.updateBlockStatus(user, "block");
}));
Module({
    pattern: 'join ?(.*)',
    fromMe: true,
    type: 'owner'
}, (async (message, match) => {
    var rgx = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/
    if (!match[1] || !rgx.test(match[1])) return await message.reply("*Need group link*");
    await message.client.groupAcceptInvite(match[1].split("/")[3])
}));
Module({
    pattern: 'unblock ?(.*)',
    fromMe: true,
    type: 'owner'
}, (async (message) => {
    var isGroup = message.jid.endsWith('@g.us')
    if (!isGroup) return;
    var user = message.mention[0] || message.reply_message.jid
    await message.client.updateBlockStatus(user, "unblock");
}));
Module({
    pattern: 'pp ?(.*)',
    fromMe: true,
    type: 'owner',
    desc: "Change/Get profile picture (full screen supported) with replied message"
}, (async (message, match) => {
    if (message.reply_message && message.reply_message.image) {
    var image = await message.reply_message.download()
    await message.client.updateProfilePicture(message.client.user.id.split(":")[0]+"@s.whatsapp.net",{url: image});
    return await message.reply("*Updated profile pic ✅*")
}
if (message.reply_message && !message.reply_message.image) {
   try { var image = await message.client.profilePictureUrl(message.reply_message.jid,'image') } catch {return await message.reply("Profile pic not found!")}
   return await message.reply({url:image},"image")
}
}));
Module({
    pattern: 'gpp ?(.*)',
    fromMe: true,
    type: 'owner',
    desc: "Change/Get group icon (full screen supported) with replied message"
}, (async (message, match) => {
    if (message.reply_message && message.reply_message.image) {
    var image = await message.reply_message.download()
    await message.client.updateProfilePicture(message.jid,{url: image});
    return await message.reply("*Group icon updated ✅*")
}
if (!message.reply_message.image) {
   try { var image = await message.client.profilePictureUrl(message.jid,'image') } catch {return await message.reply("Profile pic not found!")}
   return await message.reply({url:image},"image")
}
}));

Module(
  {
    pattern: "poll ?(.*)",
    fromMe: true,
    desc: "create poll",
    type: "tool",
  },
  async (message, match) => {
    let [poll,opt] = match.split(";");
    if (match.split(";") < 2)
      return await message.reply(
        `${handler}poll question;option1,option2,option3.....`
      );
    
    let options = [];

    for (let i of opt.split(',')) {
      options.push({ optionName: i });
    }
    return await message.client.relayMessage(
      message.jid,
      {
        pollCreationMessage: {
          name: poll,
          options,
          selectableOptionsCount: 0,
        },
      },
      {}
    );
  }
);


Module(
  {
    on: "text",
    fromMe: false,
  },
  async (message, match) => {
    if (!message.isGroup) return;
    if (config.ANTILINK)
      if (isUrl(match)) {
        await message.reply("_Link detected_");
        let botadmin = await isAdmin(message.jid, message.user, message.client);
        let senderadmin = await isAdmin(
          message.jid,
          message.participant,
          message.client
        );
        if (botadmin) {
          if (!senderadmin) {
            await message.reply(
              `_Commencing Specified Action :${config.ANTILINK_ACTION}_`
            );
            return await message[config.ANTILINK_ACTION]([message.participant]);
          }
        } else {
          return await message.reply("_I'm not admin_");
        }
      }
  }
);
