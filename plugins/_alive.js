>const events = require("../lib/utils");
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
			pattern: "alive?(.*)",
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
    let menu = `•━━━━ ❮❮ *𝙱𝙾𝚃 𝙼𝙴𝙽𝚄* ❯❯ ━━━━━•
 ––––––━━━━━━━━•
│☘︎ *𝙱𝚘𝚝 𝙸𝚗𝚏𝚘*
┣━━━━━━━━┅┅
├[ *𝙾𝚠𝚗𝚎𝚛* ]— *𝙹𝚜𝚕*
│ *User : ${message.pushName}*
│ *Time : ${time}*
│ *Number :919497206865*
┗––––––━━┅┅┅
  
 *CONFIG* 乂

× ​.*Mode*

 *CONVERTOR* 乂

× ​.*Fancy*
× ​.*Sticker*

 *EDIT* 乂

× ​.*Mp3*
× ​.*Photo*

 *HEROKU* 乂
 
× ​.*Restart*
× .*Shutdown*
× ​.*Setvar*
× ​.*Delvar*
× ​.*Getvar*
× ​.*Allvar*
× ​.*Setsudo*
× ​.*Delsudo*
× ​.*Getsudo*

 *MISC* 乂

× ​.*React*
× ​.*Filter*
× ​.*Stop*
× ​.*Stop*
× ​.*Getqr*
× ​.*Reverse*
× ​.*Eval*
× ​.*Yu*
× ​.*Ak*
× ​.*Ak*
× ​.*Ty*
× ​.*Mode*
× ​.*Test*

 *OWNER* 乂

× ​.*Update*

 *SEARCH* 乂

× ​.*True*

 *TOOL* 乂

× ​.*Bilty*
× ​.*Tgs*
× ​.*Take*

 *TYPE* 乂

× ​.*Test21*
× ​.*Welcome*
× ​.*Goodbye*
× ​.*GetExif*

 *USER* 乂
 
× ​.*m*
× .*Remove*
× ​.*Ping*
× ​.*Pp*
× ​.*Setname*
× ​.*Setbio*
× .*Block*
× .*Unblock*
× ​.*Jid*
× ​.*React*

  *UTILITY* 乂

×  .*Age*
× ​.*Cntd*
× ​ .*Runtime*
× ​.*Url*

  *WHATSAPP* 乂

× ​.*Pin*
× ​.*Unpain*
× .*Archive*
× .*Unarchive*`;
    return await message.client.sendMessage(message.jid, {
      image: { url: 'https://i.imgur.com/MCRx4Tr.jpeg' },
      caption: ' *『 ʙᴏᴛ ɪɴғᴏ 』* ',
      footer: menu,
      buttons: [
        {buttonId: '.list', buttonText: {displayText: 'ᴄᴏᴍᴍᴀɴᴅ'}},
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
