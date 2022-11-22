const {Module, isPublic} = require('../lib/')
Module({
  pattern: 'uptime',
  fromMe: isPublic,
  type: 'utility',
  desc: 'Shows system (OS) /process uptime'
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
  var uptime_os = (`_System (OS) : ${ut_hour} Hour(s), ${ut_min} minute(s) and ${ut_sec} second(s)_`)  
  var sec_num = parseInt(process.uptime(), 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  var uptime_process = (`_Process : ${hours} Hour(s), ${minutes} minute(s) and ${seconds} second(s)_`)  
  return await message.reply(`                 _*[ UP-TIME ]*_\n\n${uptime_os}\n${uptime_process}`);
}));


Module({
  pattern: 'runtime',
  fromMe: isPublic,
  type: 'utility',
  desc: 'Shows system (OS) /process uptime'
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
  var uptime_process = (`_Runtime : ${hours} Hour(s), ${minutes} minute(s) and ${seconds} second(s)_`)  
  return await message.reply(`${uptime_process}`);
}));
