const {find} = require('abu-bot')
const {Module, isPublic} = require('../lib/');
Module({pattern: 'true ?(.*)', desc: 'Searches for number in truecaller!',tupe: 'search',fromMe: isPublic}, async (msg, query) => {
let user =  query[1];
if (!user) return await msg.reply('_Need number, .true 91xxxxxxxxxx_');
if (user.includes(" ")) return await msg.reply("_No space allowed in between numbers!_")
if (!user) return await msg.reply("_Need number/reply/mention_");
const trueCaller = async (num) => {try { var res = await find(num,'',msg.client.user.id) } catch { var res = false }; return res;}
for (let i = 0; i < 6; i++){
    var _result = await trueCaller(user.replace( /^\D| +/g, ''))
    if (i === 5 || _result === false) {
        return await msg.reply("_Error, try again!_")
    } else return await msg.reply(_result)
}
});
