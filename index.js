const Jsl_0x5e73cc=Jsl_0x34e1;(function(_0x545f21,_0x2b7568){const _0x8d5c48=Jsl_0x34e1,_0x557d7f=_0x545f21();while(!![]){try{const _0x354185=-parseInt(_0x8d5c48(0x1a3))/0x1*(parseInt(_0x8d5c48(0x199))/0x2)+-parseInt(_0x8d5c48(0x16b))/0x3*(parseInt(_0x8d5c48(0x198))/0x4)+parseInt(_0x8d5c48(0x1a8))/0x5*(parseInt(_0x8d5c48(0x177))/0x6)+-parseInt(_0x8d5c48(0x1b3))/0x7*(-parseInt(_0x8d5c48(0x180))/0x8)+parseInt(_0x8d5c48(0x182))/0x9*(parseInt(_0x8d5c48(0x162))/0xa)+-parseInt(_0x8d5c48(0x1a4))/0xb+parseInt(_0x8d5c48(0x1b4))/0xc;if(_0x354185===_0x2b7568)break;else _0x557d7f['push'](_0x557d7f['shift']());}catch(_0x31f09b){_0x557d7f['push'](_0x557d7f['shift']());}}}(Jsl_0x39f6,0xb28c8));const {default:makeWASocket,useSingleFileAuthState,Browsers,makeInMemoryStore}=require(Jsl_0x5e73cc(0x170)),fs=require('fs'),{serialize}=require(Jsl_0x5e73cc(0x16e)),{Message,Image,Sticker}=require('./lib/Base'),pino=require(Jsl_0x5e73cc(0x1a1)),path=require(Jsl_0x5e73cc(0x18d)),events=require(Jsl_0x5e73cc(0x18b)),got=require(Jsl_0x5e73cc(0x197)),config=require('./config'),{DATABASE,VERSION}=require('./config'),{PluginDB}=require(Jsl_0x5e73cc(0x176)),Greetings=require(Jsl_0x5e73cc(0x172)),{decodeJid}=require('./lib/'),{bind}=require(Jsl_0x5e73cc(0x194)),store=makeInMemoryStore({'logger':pino()[Jsl_0x5e73cc(0x17d)]({'level':'silent','stream':Jsl_0x5e73cc(0x16c)})});require(Jsl_0x5e73cc(0x189))[Jsl_0x5e73cc(0x19b)][Jsl_0x5e73cc(0x1b5)]=0x64;let ssname=path[Jsl_0x5e73cc(0x195)](__dirname,'./temp/session.json');function Jsl_0x34e1(_0x1d5fc9,_0x3737e4){const _0x39f65c=Jsl_0x39f6();return Jsl_0x34e1=function(_0x34e16a,_0x4f64e2){_0x34e16a=_0x34e16a-0x161;let _0x9e2090=_0x39f65c[_0x34e16a];return _0x9e2090;},Jsl_0x34e1(_0x1d5fc9,_0x3737e4);}const {MakeSession}=require(Jsl_0x5e73cc(0x161));!fs[Jsl_0x5e73cc(0x196)](ssname)&&MakeSession(config['Session_Id'],ssname);async function Jsl(){const _0x11a5de=Jsl_0x5e73cc;await config[_0x11a5de(0x18a)][_0x11a5de(0x178)]();const {state:_0x565f0f,saveState:_0x246e3a}=useSingleFileAuthState(ssname,pino({'level':_0x11a5de(0x1aa)}));let _0x10b511=makeWASocket({'logger':pino({'level':'silent'}),'auth':_0x565f0f,'printQRInTerminal':!![],'browser':Browsers[_0x11a5de(0x179)](_0x11a5de(0x169)),'downloadHistory':![],'syncFullHistory':![]});store[_0x11a5de(0x19f)](_0x10b511['ev']),setInterval(()=>{const _0x1c83c7=_0x11a5de;store[_0x1c83c7(0x19c)](_0x1c83c7(0x17f));},0x1e*0x3c*0x3e8),_0x10b511['ev']['on']('connection.update',async _0x53fd10=>{const _0x2323ff=_0x11a5de,{connection:_0x4fcd3c,lastDisconnect:_0x4a58ef}=_0x53fd10;_0x4fcd3c===_0x2323ff(0x185)&&console[_0x2323ff(0x174)](_0x2323ff(0x1a6)+VERSION);_0x4fcd3c==='close'&&_0x4a58ef&&_0x4a58ef[_0x2323ff(0x18c)]&&_0x4a58ef[_0x2323ff(0x18c)][_0x2323ff(0x1ab)][_0x2323ff(0x1a7)]!=0x191&&(console[_0x2323ff(0x174)](_0x4a58ef[_0x2323ff(0x18c)][_0x2323ff(0x1ab)][_0x2323ff(0x192)]),Jsl());if(_0x4fcd3c===_0x2323ff(0x188)){console['log'](_0x2323ff(0x1b0)),console[_0x2323ff(0x174)](_0x2323ff(0x19e));let _0x4bacdd=await PluginDB[_0x2323ff(0x17c)]();_0x4bacdd[_0x2323ff(0x18f)](async _0x554e9d=>{const _0x18f3b0=_0x2323ff;if(!fs[_0x18f3b0(0x196)]('./plugins/'+_0x554e9d[_0x18f3b0(0x171)][_0x18f3b0(0x183)]+'.js')){console[_0x18f3b0(0x174)](_0x554e9d['dataValues'][_0x18f3b0(0x183)]);var _0x369075=await got(_0x554e9d[_0x18f3b0(0x171)][_0x18f3b0(0x16d)]);_0x369075['statusCode']==0xc8&&(fs[_0x18f3b0(0x191)]('./plugins/'+_0x554e9d[_0x18f3b0(0x171)][_0x18f3b0(0x183)]+_0x18f3b0(0x165),_0x369075['body']),require(_0x18f3b0(0x187)+_0x554e9d['dataValues']['name']+_0x18f3b0(0x165)));}}),fs['readdirSync'](_0x2323ff(0x1ad))['forEach'](_0x528277=>{const _0x2de05e=_0x2323ff;path[_0x2de05e(0x163)](_0x528277)[_0x2de05e(0x175)]()==_0x2de05e(0x165)&&require('./plugins/'+_0x528277);}),console[_0x2323ff(0x174)](_0x2323ff(0x1a9)),_0x10b511[_0x2323ff(0x167)](_0x10b511[_0x2323ff(0x19d)]['id'],{'text':_0x2323ff(0x164)});try{_0x10b511['ev']['on'](_0x2323ff(0x186),_0x246e3a),_0x10b511['ev']['on']('group-participants.update',async _0x2e23b5=>{Greetings(_0x2e23b5,_0x10b511);}),_0x10b511['ev']['on'](_0x2323ff(0x18e),async _0x5bb44f=>{const _0x2749ef=_0x2323ff;if(_0x5bb44f['type']!==_0x2749ef(0x17b))return;let _0x4af3a3=_0x5bb44f[_0x2749ef(0x184)][0x0],_0x1090d4=await serialize(JSON['parse'](JSON['stringify'](_0x4af3a3)),_0x10b511);if(!_0x1090d4[_0x2749ef(0x1b1)])return;let _0x29d751=_0x1090d4['body'];if(_0x29d751)console[_0x2749ef(0x174)](_0x29d751);events[_0x2749ef(0x1a0)][_0x2749ef(0x18f)](async _0x4502e6=>{const _0x1f8a38=_0x2749ef;if(_0x4502e6['fromMe']&&!config[_0x1f8a38(0x168)][_0x1f8a38(0x1ae)](',')[_0x1f8a38(0x1a5)](_0x1090d4[_0x1f8a38(0x190)][_0x1f8a38(0x1ae)]('@')[0x0]||!_0x1090d4[_0x1f8a38(0x16a)]))return;if(_0x4502e6[_0x1f8a38(0x173)]&&_0x4502e6['pattern'][_0x1f8a38(0x193)](_0x29d751)){var _0x2db17d=_0x29d751[_0x1f8a38(0x166)]()[_0x1f8a38(0x1ae)](/ +/)['slice'](0x1)[_0x1f8a38(0x195)]('\x20');whats=new Message(_0x10b511,_0x1090d4,_0x4af3a3),_0x4502e6['function'](whats,_0x2db17d,_0x1090d4,_0x10b511);}else{if(_0x29d751&&_0x4502e6['on']==='text')_0x1090d4['prefix']=_0x29d751[_0x1f8a38(0x17a)](new RegExp(config[_0x1f8a38(0x181)]))?_0x29d751[_0x1f8a38(0x17a)](new RegExp(config[_0x1f8a38(0x181)]))[0x0]:'',whats=new Message(_0x10b511,_0x1090d4,_0x4af3a3),_0x4502e6[_0x1f8a38(0x16f)](whats,_0x29d751,_0x1090d4,_0x10b511,_0x5bb44f);else{if((_0x4502e6['on']===_0x1f8a38(0x1af)||_0x4502e6['on']==='photo')&&_0x1090d4[_0x1f8a38(0x17e)]===_0x1f8a38(0x1b2))whats=new Image(_0x10b511,_0x1090d4,_0x4af3a3),_0x4502e6[_0x1f8a38(0x16f)](whats,_0x29d751,_0x1090d4,_0x10b511,_0x5bb44f,_0x4af3a3);else _0x4502e6['on']==='sticker'&&_0x1090d4['type']===_0x1f8a38(0x1a2)&&(whats=new Sticker(_0x10b511,_0x1090d4,_0x4af3a3),_0x4502e6[_0x1f8a38(0x16f)](whats,_0x1090d4,_0x10b511,_0x5bb44f,_0x4af3a3));}}});});}catch(_0x5e353f){console[_0x2323ff(0x174)](_0x5e353f+_0x2323ff(0x19a)+JSON['stringify'](msg));}}}),process['on'](_0x11a5de(0x1ac),_0x1b979b=>{const _0x2dfa8a=_0x11a5de;let _0x54a1eb=_0x1b979b[_0x2dfa8a(0x1b1)];_0x10b511[_0x2dfa8a(0x167)](_0x10b511[_0x2dfa8a(0x19d)]['id'],{'text':_0x54a1eb}),console[_0x2dfa8a(0x174)](_0x1b979b);});}setTimeout(()=>{Jsl();},0xbb8);function Jsl_0x39f6(){const _0xc91e7a=['extname','💗\x20𝙰𝙱𝚄\x20𝙼𝙳\x20𝚆𝙾𝚁𝙺𝙸𝙽𝙶..\x0a\x20𝙷𝙰𝙽𝙻𝙴𝚁\x20:\x20.\x0a\x20𝙿𝙻𝚄𝙶𝙸𝙽𝚂\x20:\x20.ʜᴇʟᴘ\x20.ᴍᴇɴᴜ\x20.ʟɪsᴛ\x0a\x20𝚅𝙴𝚁𝚂𝙸𝙾𝙽\x20:\x202.1.0','.js','trim','sendMessage','SUDO','Desktop','isSelf','5361RGPkvk','store','url','./lib/serialize','function','@adiwajshing/baileys','dataValues','./lib/Greetings','pattern','log','toLowerCase','./lib/db/plugins','8367426HisfZV','sync','macOS','match','notify','findAll','child','type','./lib/ss/store.json','10745672NpgssM','HANDLERS','181881IGZriF','name','messages','connecting','creds.update','./plugins/','open','events','DATABASE','./lib/utils','error','path','messages.upsert','map','sender','writeFileSync','payload','test','./lib/store','join','existsSync','got','1828yQIlob','470116NkCXjS','\x0a\x0a\x0a\x0a\x0a','EventEmitter','writeToFile','user','Installing\x20Plugins.✅','bind','commands','pino','stickerMessage','4lsxahc','11427581ALwCNj','includes','Abu\x20MD\x20','statusCode','5kMaVqX','✅\x20Plugins\x20Installed!','silent','output','uncaughtException','./plugins','split','image','Session\x20Restored\x20✅','message','imageMessage','7pKyuXO','8501784VQDkQX','defaultMaxListeners','./lib/session','40HooFvh'];Jsl_0x39f6=function(){return _0xc91e7a;};return Jsl_0x39f6();}
