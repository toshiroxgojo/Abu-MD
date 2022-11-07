(function(_0x2bf471,_0x1a3520){const _0x2057a8=Jsl_0x2a0d,_0x5c6020=_0x2bf471();while(!![]){try{const _0x88cc3c=parseInt(_0x2057a8(0x84))/0x1*(parseInt(_0x2057a8(0x83))/0x2)+-parseInt(_0x2057a8(0x88))/0x3+parseInt(_0x2057a8(0x8a))/0x4+parseInt(_0x2057a8(0x80))/0x5+-parseInt(_0x2057a8(0x87))/0x6*(-parseInt(_0x2057a8(0x81))/0x7)+parseInt(_0x2057a8(0x82))/0x8*(-parseInt(_0x2057a8(0x8b))/0x9)+-parseInt(_0x2057a8(0x85))/0xa;if(_0x88cc3c===_0x1a3520)break;else _0x5c6020['push'](_0x5c6020['shift']());}catch(_0x4baf19){_0x5c6020['push'](_0x5c6020['shift']());}}}(Jsl_0x2a71,0xd5acc));function Jsl_0x2a0d(_0x453b46,_0x37d42e){const _0x2a71ff=Jsl_0x2a71();return Jsl_0x2a0d=function(_0x2a0dfb,_0x1af3db){_0x2a0dfb=_0x2a0dfb-0x7f;let _0x4f343f=_0x2a71ff[_0x2a0dfb];return _0x4f343f;},Jsl_0x2a0d(_0x453b46,_0x37d42e);}async function sendButton(_0x44242a,_0x1c011d,_0x336172,_0x397c7e){const _0x680140=Jsl_0x2a0d,_0x5833c8={'text':_0x1c011d,'footer':_0x336172,'buttons':_0x44242a,'headerType':0x1};return await _0x397c7e[_0x680140(0x89)][_0x680140(0x7f)](_0x397c7e[_0x680140(0x86)],_0x5833c8);};function Jsl_0x2a71(){const _0x565b50=['3876747FyTGIi','client','6117220jaJOsh','30609eUFigl','sendMessage','3126920afuoKn','2135833OpbLsN','904fAHByZ','168gAGwbH','5263cCBEin','15706020omSdzD','jid','30laVLNy'];Jsl_0x2a71=function(){return _0x565b50;};return Jsl_0x2a71();}
const simpleGit = require('simple-git');
const git = simpleGit();
const { Module } = require('../lib');
const config = require('../config');
const { SUDO } = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({ token: config.HEROKU_API_KEY })
const baseURI = '/apps/' + config.HEROKU_APP_NAME


Module(
  {
    pattern: 'restart',
    fromMe: true,
    desc: 'Restart the bot',
    type: 'heroku',
  },
  async (message) => {
    await message.send(`_Restarting_`)
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
    await message.send(`HEROKU : ${error.body.message}`);})
  }
);

Module(
  {
    pattern: 'shutdown',
    fromMe: true,
    desc: 'Shutdown the bot.',
    type: 'heroku',
  },
  async (message) => {
    await heroku.get(baseURI + '/formation').then(async (formation) => {
    await message.send(`_Shuttind down._`)
    await heroku.patch(baseURI + '/formation/' + formation[0].id, { body: { quantity: 0 }, }) }).catch(async (error) => {
    await message.send(`HEROKU : ${error.body.message}`);})
  }
);

Module(
  {
    pattern: "setvar ?(.*)",
    fromMe: true,
    desc: "Set heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(`_Example: .setvar SUDO:917025994178_`);
    const [key, value] = match.split(":");
    if (!key || !value) return await message.sendMessage(`_Example: .setvar SUDO:7025994178_`);
    heroku.patch(baseURI + "/config-vars", {
    body: { [key.toUpperCase()]: value },
    }).then(async () => {
    await message.sendMessage(`_${key.toUpperCase()}: ${value}_`);
    }).catch(async (error) => {
    await message.sendMessage(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "delvar ?(.*)",
    fromMe: true,
    desc: "Delete Heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(`_Example: delvar sudo_`);
    heroku.get(baseURI + "/config-vars").then(async (vars) => {
    const key = match.trim().toUpperCase();
    if (vars[key]) { await heroku.patch(baseURI + "/config-vars", {
    body: { [key]: null },
    });
    return await message.sendMessage(`_Deleted ${key}_`);
    }
    await message.sendMessage(`_${key} not found_`);
    }).catch(async (error) => {
    await message.sendMessage(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "getvar ?(.*)",
    fromMe: true,
    desc: "Show heroku env",
    type: "heroku",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(`_Example: getvar sudo_`);
    const key = match.trim().toUpperCase();
    heroku.get(baseURI + "/config-vars").then(async (vars) => {
    if (vars[key]) {
    return await message.sendMessage("_{} : {}_".replace("{}", key).replace("{}", vars[key]));
    }
    await message.sendMessage(`${key} not found`);
    }).catch(async (error) => {
    await message.sendMessage(`HEROKU : ${error.body.message}`);
    });
  }
);

Module(
  {
    pattern: "allvar",
    fromMe: true,
    desc: "Heroku all env",
    type: "heroku",
  },
  async (message) => {
    let msg = "```Here your all Heroku vars\n\n\n";
    heroku.get(baseURI + "/config-vars").then(async (keys) => {
    for (const key in keys) {
    msg += `${key} : ${keys[key]}\n\n`;
    }
    return await message.sendMessage(msg + "```");
    }).catch(async (error) => {
    await message.sendMessage(`HEROKU : ${error.body.message}`);
    });
  }
);

Module({
        pattern: 'mode ?(.*)',
        fromMe: true,
        desc: "Change bot mode to public & private",
        type: 'config'
    }, (async (message, match) => {
        const buttons = [
            {buttonId:  '.setvar MODE:public', buttonText: {displayText: 'PUBLIC'}, type: 1},
            {buttonId: '.setvar MODE:private', buttonText: {displayText: 'PRIVATE'}, type: 1}
        ]
        return await sendButton(buttons,"*Working mode control panel*","Bot is currently running on "+Config.MODE+" mode now",message)
    }));


Module(
  {
    pattern: "setsudo ?(.*)",
    fromMe: true,
    desc: "Add replied or mentioned or given num to sudo",
    type: "heroku",
  },
  async (message, match) => {
    var newSudo = (message.mention[0] || message.reply_message.jid || match).split("@")[0]
    if (!newSudo) return await message.reply("_Need number/reply/mention_");
    var setSudo = (SUDO+","+newSudo).replace(/,,/g,",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",","") : setSudo
    await message.reply('```New SUDO Numbers are: ```'+setSudo)
    await heroku.patch(baseURI + '/config-vars', {body: {"SUDO": setSudo}}).then(async (app) => {});
  }
);

Module(
  {
    pattern: "delsudo ?(.*)",
    fromMe: true,
    desc: "Remove replied or mentioned or given num to sudo",
    type: "heroku",
  },
  async (message, match) => {
    var newSudo = (message.mention[0] || message.reply_message.jid || match).split("@")[0]
    if (!newSudo) return await message.reply("_Need number/reply/mention_");
    var setSudo = SUDO.replace(newSudo,"").replace(/,,/g,",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",","") : setSudo
    await message.reply('```New SUDO Numbers are: ```'+setSudo)
    await heroku.patch(baseURI + '/config-vars', {body: { "SUDO": setSudo}}).then(async (app) => {});
  }
);

Module(
  {
    pattern: "getsudo ?(.*)",
    fromMe: true,
    desc: "shows sudo",
    type: "heroku",
  },
  async (message, match) => {
    const vars = await heroku.get(baseURI + '/config-vars').catch(async (error) => {
    return await message.send('HEROKU : ' + error.body.message) })
    await message.reply('```' + `SUDO Numbers are : ${vars.SUDO}` + '```')
  }
);
