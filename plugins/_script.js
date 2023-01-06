const events = require("../lib/utils");
const {
  Module,
  isPublic,
  tiny,
  clockString,
  handler 
} = require("../lib");
const { FancyRandom, jslbuffer } = require('abu-bot');
const { BOT_INFO } = require("../config");
const { hostname, uptime } = require("os");


const image = "https://i.imgur.com/bk3EKWZ.jpeg";
const image_1 = "https://i.imgur.com/bk3EKWZ.jpeg";
const audios = "https://i.imgur.com/bk3EKWZ.jpeg";

Module
	(
		{
			pattern: "script?(.*)",
			fromMe: isPublic,
			type: "menu",
		},
		async (message, match) => {
			const image1 = await jslbuffer(image)
			const image2 = await jslbuffer(image_1)
			const audio = await jslbuffer(audios)
      
		const stars = ['×'];
  const star = stars[Math.floor(Math.random()*stars.length)];
    let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",");
    let menu = `╭──❍「 *𝙰𝙱𝚄 𝚂𝙴𝚁*」❍
├📮 *𝙱𝙾𝚃 𝚂𝙲𝚁𝙸𝙿𝚃*
├ *𝙶𝙸𝚃* : github.com/Afx-Abu/Abu-MD
├ *𝙶𝚁𝙾𝚄𝙿* : https://bit.ly/3sLjYm6
├ *𝚄𝚂𝙴𝚁 : ${message.pushName}*
├ *𝚃𝙸𝙼𝙴 : ${time}*
╰──❍ 
📍𝚗𝚘𝚝𝚎: .● *𝙰𝙱𝚄 𝙼𝙳 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝙱𝚘𝚝 𝙲𝚛𝚎𝚊𝚝𝚎𝚍 𝙱𝚈 𝙰𝙱𝚄*.● *𝙰𝙱𝚄 𝙼𝙳 𝚜𝚌𝚛𝚒𝚙𝚝 𝙲𝚛𝚎𝚍𝚒𝚝 𝙱𝚈 𝙰𝚏𝚡-𝙰𝚋𝚞*.● *𝙿𝚕𝚞𝚐𝚒𝚗 𝚌𝚛𝚎𝚊𝚝𝚎𝚍 𝙱𝚢 𝙰𝚏𝚡-𝚃𝚘𝚡𝚒𝚌𝙻𝚎𝚘⁩⁩⁩⁩⁩*`;
    return await message.client.sendMessage(message.jid, {
      image: { url: 'https://i.imgur.com/Y9he4cr.jpeg' },
      caption: ' *『 ᴀ ʙ ᴜ s ᴇ ʀ ᴍ ᴅ 』* ',
      footer: menu,
      buttons: [
        {buttonId: '.menu', buttonText: {displayText: 'ᴍᴇɴᴜ'}},
      {buttonId: '.ping', buttonText: {displayText: 'sᴘᴇᴇᴅ ᴛᴇsᴛ'}},{buttonId: '.alive', buttonText: {displayText: 'ᴄᴏᴍᴍᴀɴᴅ'}}
    ],
			contextInfo: {
				externalAdReply: {
					title: "『𝐀𝐛𝐮 𝐦𝐝 』",
					body: "𝙰𝚋𝚞 𝚂𝚎𝚛",
					mediaType: 2,
					thumbnail: image2,
					mediaUrl: 'https://www.instagram.com/akash_ak_4',
					sourceUrl: 'https://github.com/Afx-Abu/Abu-MD',
					showAdAttribution:true
					}
				}
			}, { quoted: message }
		)	
	}
);
