const {
    Module, isPublic
} = require('../lib/');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const Config = require('../config');
const {
    getString
} = require('../lib/misc/lang');
const Lang = getString('converters');

Module({
    pattern: 'mp3 ?(.*)',
    fromMe: isPublic,
    type: 'edit',
    desc: Lang.MP3_DESC
}, (async (message, match) => {
    if (message.reply_message === false) return await message.reply(Lang.MP3_NEED_REPLY)
    var {seconds} = message.quoted.message[Object.keys(message.quoted.message)[0]];
    if (seconds>120) await message.reply(`_Alert: Duration more than 2 mins. This process may fail or take much more time!_`)
    var savedFile = await message.reply_message.download();
    ffmpeg(savedFile)
        .save('./temp/tomp3.mp3')
        .on('end', async () => {
            await message.client.sendMessage(message.jid, {
                audio: fs.readFileSync('./temp/tomp3.mp3'),
                mimetype: 'audio/mp4',
                ptt: false
            }, {
                quoted: message.quoted
            })
        });
}));

Module({
    pattern: 'photo ?(.*)',
    fromMe: isPublic,
    type: 'edit',
    desc: Lang.PHOTO_DESC
}, (async (message, match) => {
    if (message.reply_message === false) return await message.send(Lang.PHOTO_NEED_REPLY)
        var savedFile = await message.reply_message.download();
        ffmpeg(savedFile)
            .fromFormat('webp_pipe')
            .save('output.png')
            .on('end', async () => {
                await message.reply(fs.readFileSync('output.png'), 'image');
            });

}));
