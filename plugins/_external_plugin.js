const {
    Module
} = require('../lib/');
const Config = require('../config');
const axios = require('axios');
const fs = require('fs');
const Db = require('../lib/db/plugin');
let {
    getString
} = require('../lib/misc/lang');
let Lang = getString('external_plugin');

Module({
    pattern: 'install ?(.*)',
    fromMe: true,
    type: 'owner',
    desc: Lang.INSTALL_DESC
}, (async (message, match) => {
    match = match[1]!==""?match[1]:message.reply_message.text
    if (!match || !/\bhttps?:\/\/\S+/gi.test(match)) return await message.sendMessage(Lang.NEED_URL)
    let links = match.match(/\bhttps?:\/\/\S+/gi);
    for (let link of links){
    try {
        var url = new URL(link);
    } catch {
        return await message.sendMessage(Lang.INVALID_URL);
    }
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }
    try {
        var response = await axios(url+"?timestamp="+new Date());
    } catch {
        return await message.sendMessage(Lang.INVALID_URL)
    }
    let plugin_name = /pattern: ["'](.*)["'],/g.exec(response.data)
    var plugin_name_temp = response.data.match(/pattern: ["'](.*)["'],/g)?response.data.match(/pattern: ["'](.*)["'],/g).map(e=>e.replace("pattern","").replace(/[^a-zA-Z]/g, "")):"temp"
    try { plugin_name = plugin_name[1].split(" ")[0] } catch { return await message.reply("_Invalid plugin. No plugin name found!_") }
    fs.writeFileSync('./plugins/' + plugin_name + '.js', response.data);
    try {
        require('./' + plugin_name);
    } catch (e) {
        fs.unlinkSync('/root/Abu/plugins/' + plugin_name + '.js')
        return await message.reply(Lang.INVALID_PLUGIN + e);
    }
    await Db.installPlugin(url, plugin_name);
    await message.sendMessage(Lang.INSTALLED.format(plugin_name_temp.join(", ")));
}
}));

Module({
    pattern: 'plugin ?(.*)',
    fromMe: true,
    type: 'owner',
    desc: Lang.PLUGIN_DESC
}, (async (message, match) => {
    var plugins = await Db.PluginDB.findAll();
    if (match[1] !== '') {
        var plugin = plugins.filter(_plugin => _plugin.dataValues.name === match[1])
        try {
            await message.reply(plugin.dataValues.name + ": " + plugin.dataValues.url);
        } catch {
            return await message.reply(Lang.PLUGIN_NOT_FOUND)
        }
        return;
    }
    var msg = Lang.INSTALLED_PLUGINS;
    var plugins = await Db.PluginDB.findAll();
    if (plugins.length < 1) {
        return await message.sendMessage(Lang.NO_PLUGIN);
    } else {
        plugins.map(
            (plugin) => {
                msg += '*' + plugin.dataValues.name + '* : ' + plugin.dataValues.url + '\n\n';
            }
        );
        return await message.reply(msg);
    }
}));

Module({
    pattern: 'remove(?: |$)(.*)',
    fromMe: true,
    type: 'owner',
    desc: Lang.REMOVE_DESC
}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.NEED_PLUGIN);
    var plugin = await Db.PluginDB.findAll({
        where: {
            name: match[1]
        }
    });
    if (plugin.length < 1) {
        return await message.sendMessage(Lang.NO_PLUGIN);
    } else {
        await plugin[0].destroy();
        delete require.cache[require.resolve('./' + match[1] + '.js')]
        fs.unlinkSync('./plugins/' + match[1] + '.js');
    const buttons = [{buttonId: '.reboot', buttonText: {displayText: 'Restart'}, type: 1}]
          
          const buttonMessage = {
              text: Lang.DELETED.format(match[1]),
              footer: '_Restart to make effect_',
              buttons: buttons,
              headerType: 1
          }
        await message.client.sendMessage(message.jid,buttonMessage);
    }
}));
