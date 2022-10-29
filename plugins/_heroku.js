(function(_0x2bf471,_0x1a3520){const _0x2057a8=Jsl_0x2a0d,_0x5c6020=_0x2bf471();while(!![]){try{const _0x88cc3c=parseInt(_0x2057a8(0x84))/0x1*(parseInt(_0x2057a8(0x83))/0x2)+-parseInt(_0x2057a8(0x88))/0x3+parseInt(_0x2057a8(0x8a))/0x4+parseInt(_0x2057a8(0x80))/0x5+-parseInt(_0x2057a8(0x87))/0x6*(-parseInt(_0x2057a8(0x81))/0x7)+parseInt(_0x2057a8(0x82))/0x8*(-parseInt(_0x2057a8(0x8b))/0x9)+-parseInt(_0x2057a8(0x85))/0xa;if(_0x88cc3c===_0x1a3520)break;else _0x5c6020['push'](_0x5c6020['shift']());}catch(_0x4baf19){_0x5c6020['push'](_0x5c6020['shift']());}}}(Jsl_0x2a71,0xd5acc));function Jsl_0x2a0d(_0x453b46,_0x37d42e){const _0x2a71ff=Jsl_0x2a71();return Jsl_0x2a0d=function(_0x2a0dfb,_0x1af3db){_0x2a0dfb=_0x2a0dfb-0x7f;let _0x4f343f=_0x2a71ff[_0x2a0dfb];return _0x4f343f;},Jsl_0x2a0d(_0x453b46,_0x37d42e);}async function sendButton(_0x44242a,_0x1c011d,_0x336172,_0x397c7e){const _0x680140=Jsl_0x2a0d,_0x5833c8={'text':_0x1c011d,'footer':_0x336172,'buttons':_0x44242a,'headerType':0x1};return await _0x397c7e[_0x680140(0x89)][_0x680140(0x7f)](_0x397c7e[_0x680140(0x86)],_0x5833c8);};function Jsl_0x2a71(){const _0x565b50=['3876747FyTGIi','client','6117220jaJOsh','30609eUFigl','sendMessage','3126920afuoKn','2135833OpbLsN','904fAHByZ','168gAGwbH','5263cCBEin','15706020omSdzD','jid','30laVLNy'];Jsl_0x2a71=function(){return _0x565b50;};return Jsl_0x2a71();}
    const {
        Module
    } = require('../lib/');
    const Config = require('../config');
    const Heroku = require('heroku-client');
    const got = require('got');
    const {
        getString
    } = require('../lib/misc/lang');
    const Lang = getString('heroku');
    const heroku = new Heroku({
        token: Config.HEROKU_API_KEY
    });
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
        }
    let baseURI = '/apps/' + Config.HEROKU_APP_NAME;
    
    Module({
        pattern: 'restart$',
        fromMe: true,
        dontAddCommandList: true,
        type: 'owner'
    }, (async (message, match) => {
    
        await message.reply(Lang.RESTART_MSG)
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.send(error.message)
        });
    }));
    
    Module({
        pattern: 'shutdown$',
        fromMe: true,
        dontAddCommandList: true,
        type: 'owner'
    }, (async (message, match) => {
    
        await heroku.get(baseURI + '/formation').then(async (formation) => {
            forID = formation[0].id;
            await message.reply(Lang.SHUTDOWN_MSG)
            await heroku.patch(baseURI + '/formation/' + forID, {
                body: {
                    quantity: 0
                }
            });
        }).catch(async (err) => {
            await message.send(error.message)
        });
    }));
    
    Module({
        pattern: 'dyno$',
        fromMe: true,
        dontAddCommandList: true,
        type: 'owner'
    }, (async (message, match) => {
    
        heroku.get('/account').then(async (account) => {
            url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
            headers = {
                "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
                "Authorization": "Bearer " + Config.HEROKU_API_KEY,
                "Accept": "application/vnd.heroku+json; version=3.account-quotas",
            }
            await got(url, {
                headers: headers
            }).then(async (res) => {
                const resp = JSON.parse(res.body);
                total_quota = Math.floor(resp.account_quota);
                quota_used = Math.floor(resp.quota_used);
                percentage = Math.round((quota_used / total_quota) * 100);
                remaining = total_quota - quota_used;
                await message.reply(
                    "_Total: *{}*_\n".format(secondsToDhms(total_quota)) +
                    "_Used: *{}*_\n".format(secondsToDhms(quota_used)) +
                    "_Percent: *{}*_\n".format(percentage) +
                    "_Remaining: *{}*_\n".format(secondsToDhms(remaining)))
    
            }).catch(async (err) => {
                await message.send(error.message)
            });
        });
    }));
    
    Module({
        pattern: 'setvar ?(.*)',
        fromMe: true,
        desc: Lang.SETVAR_DESC,
        type: 'owner'
    }, (async (message, match) => {
    
        if (match[1] === '' || !match[1].includes(":")) return await message.reply(Lang.KEY_VAL_MISSING)
    
        if ((varKey = match[1].split(':')[0]) && (varValue = match[1].replace(match[1].split(':')[0] + ":", ""))) {
            await heroku.patch(baseURI + '/config-vars', {
                body: {
                    [varKey]: varValue
                }
            }).then(async (app) => {
                await message.reply(Lang.SET_SUCCESS.format(varKey, varValue))
            });
        } else {
            await message.reply(Lang.INVALID)
        }
    }));
    
    
    Module({
        pattern: 'delvar ?(.*)',
        fromMe: true,
        desc: Lang.DELVAR_DESC,
        type: 'owner'
    }, (async (message, match) => {
    
        if (match[1] === '') return await message.reply(Lang.NOT_FOUND)
        await heroku.get(baseURI + '/config-vars').then(async (vars) => {
            key = match[1].trim();
            for (vr in vars) {
                if (key == vr) {
                    await heroku.patch(baseURI + '/config-vars', {
                        body: {
                            [key]: null
                        }
                    });
                    return await message.reply(Lang.DEL_SUCCESS.format(key))
                }
            }
            await await message.reply(Lang.NOT_FOUND)
        }).catch(async (error) => {
            await message.reply(error.message)
        });
    
    }));
    Module({
        pattern: 'getvar ?(.*)',
        fromMe: true,
        desc: Lang.GETVAR_DESC,
        type: 'owner'
    }, (async (message, match) => {
    
        if (match[1] === '') return await message.reply(Lang.NOT_FOUND)
        await heroku.get(baseURI + '/config-vars').then(async (vars) => {
            for (vr in vars) {
                if (match[1].trim() == vr) return await message.reply(vars[vr])
            }
            await await message.reply(Lang.NOT_FOUND)
        }).catch(async (error) => {
            await await message.send(error.message)
        });
    }));
    Module({
            pattern: "allvar",
            fromMe: true,
            desc: Lang.ALLVAR_DESC,
            type: 'owner'
        },
        async (message, match) => {
            let msg = Lang.ALL_VARS + "\n\n\n```"
            await heroku
                .get(baseURI + "/config-vars")
                .then(async (keys) => {
                    for (let key in keys) {
                        msg += `${key} : ${keys[key]}\n\n`
                    }
                    return await await message.reply(msg += '```')
                })
                .catch(async (error) => {
                    await message.send(error.message)
                })
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
    Module({
        pattern: 'antispam ?(.*)',
        fromMe: true,
        desc: "Detects spam messages and kicks user.",
        type: 'config'
    }, (async (message, match) => {
        var admin = await isAdmin(message)
        if (!admin) return await message.reply("_I'm not admin_");
        var Jids = [...Config.ANTI_SPAM?.match(/[0-9]+(-[0-9]+|)(@g.us|@s.whatsapp.net)/g)]
        var msg = Config.ANTI_SPAM;
        var toggle = "on"
        var off_msg = Jids?.filter(e=>e!==message.jid)
        if (!Jids.includes(message.jid)){
            Jids.push(message.jid)
            msg = Jids.join(",")
            toggle = "off"
        }
        const buttons = [
            {buttonId: 'setvar ANTI_SPAM:on', buttonText: {displayText: 'ON'}, type: 1},
            {buttonId: 'setvar ANTI_SPAM:off', buttonText: {displayText: 'OFF'}, type: 1}
        ]
        return await sendButton(buttons,"*Antispam control panel*","Antispam is currently "+toggle,message)
    }));
    
