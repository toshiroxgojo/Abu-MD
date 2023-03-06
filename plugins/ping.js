const { Module,isPublic } = require("../lib/");
const { FancyRandom } = require('abu-bot');
Module(
  {
    pattern: "ping",
    fromMe: isPublic,
    desc: "check bot ping",
    type: "user",
  },
  async (message, match) => {
    const start = new Date().getTime();
    const botz = await FancyRandom("Testing Bot Speed...⌫")
    await message.reply(botz);
    const end = new Date().getTime();    
const Jsl1 = await FancyRandom("✿︎..Response in " + (end - start) + " ms..✿︎")
    return await message.reply(Jsl1);
  }
);

Module({
  pattern: 'runtime',
  fromMe: isPiblic,
  type: 'utility',
  desc: 'Shows Bot Running time'
}, (async (message, match) => {
  var ut_sec = require("os").uptime(); 
  var ut_min = ut_sec/60; 
  var ut_hour = ut_min/60; 
  ut_sec = Math.floor(ut_sec); 
  ut_min = Math.floor(ut_min); 
  ut_hour = Math.floor(ut_hour); 
  ut_hour = ut_hour%60; 
  ut_min = ut_min%60; 
  ut_sec = ut_sec%60; 
  var sec_num = parseInt(process.uptime(), 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  var uptime_process = (`Runtime: ${hours} Hour(s), ${minutes} minute(s) ${seconds} second(s)`)  
  var Jsl1 = await FancyRandom(uptime_process)
    return await message.reply(Jsl1);
}));
