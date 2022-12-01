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


const image = "https://i.imgur.com/78yZXmv.jpeg";
const image_1 = "https://i.imgur.com/78yZXmv.jpeg";
const audios = "https://i.imgur.com/MGCyHxB.jpeg";

Module
	(
		{
			pattern: "menu?(.*)",
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
    let menu = `❖━━━━ ❮❮ *ᴍᴇɴᴜ* ❯❯ ━━━━━❖
 *User : ${message.pushName}*
 *Time : ${time}*
 
*ʙᴜɪʟᴅ-ᴏᴘᴇʀᴀᴛᴇ-ᴛʀᴀɴsғᴇʀ  ʙᴏᴛ  ɪs  ᴀ ᴄᴏᴍᴘᴜᴛᴇʀ  ᴘʀᴏɢʀᴀᴍ  ʀᴜɴ  ᴏɴ  ᴡʜᴀᴛsᴀᴘᴘ  ᴛʜᴀᴛ ɪs sᴘᴇᴄɪғɪᴄᴀʟʟʏ ᴍᴀᴅᴇ ᴛᴏ ᴅᴏ*

 *ᴡʜᴀᴛsᴀᴘᴘ ᴡᴏʀᴋs  ᴀᴜᴛᴏᴍᴀᴛɪᴄɴ, ᴡʜᴀᴛsᴀᴘᴘ  ʙᴏᴛ  ɪs  ᴅᴇsɪɢɴᴇᴅ  ɪɴ  sᴜᴄʜ  ᴀ ᴡᴀʏ  ᴛʜᴀᴛ  ɪᴛ  ᴄᴀɴ  ʙᴇ  ᴜsᴇᴅ  ᴡɪᴛʜ  ᴄᴏɴᴠᴇɴɪᴇɴᴄᴇ, ᴀɴᴅ ᴍᴀʏ ʜᴀᴠᴇ ʟɪᴛᴛʟᴇ ʙᴜɢs, ᴛʜᴇʀᴇ ᴀʀᴇ ғᴇᴀᴛᴜʀᴇs ᴏғ ᴛʜɪs  ᴡʜᴀᴛsᴀᴘᴘ  ʙᴏᴛ  ᴡɪʟʟ  ᴅᴇғɪɴɪᴛᴇʟʏ  ʜᴇʟᴘ  ʏᴏᴜ  ᴛᴏ  ʜᴀᴠᴇ  ғᴜɴ , ᴇᴛᴄ.* 

@⁨ī.am/◈┈┉♞┉┈◈⁩⁩⁩⁩⁩`;
    return await message.client.sendMessage(message.jid, {
      image: { url: 'https://i.imgur.com/MCRx4Tr.jpeg' },
      caption: ' *『 ɪ ɴ ᴛ ʀ ᴏ ᴅ ᴜ ᴄ ᴛ ɪ ᴏ ɴ 』* ',
      footer: menu,
      buttons: [
        {buttonId: '.alive', buttonText: {displayText: 'ʟɪsᴛᴍᴇɴᴜ'}},
      {buttonId: '.ping', buttonText: {displayText: 'sᴘᴇᴇᴅ ᴛᴇsᴛ'}},{buttonId: '.script', buttonText: {displayText: 'sᴄʀɪᴘᴛ ʙᴏᴛ'}}
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
