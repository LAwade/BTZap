const { BOT_EMOJI } = require("./config")
const { isCommand, extractDataFromMessage } = require("./utils")

async function middlewares(bot){
    bot.ev.on('messages.upsert', async( { messages } ) => {
        const baileysMessage = messages[0]
        if(!baileysMessage?.message || !isCommand(baileysMessage)){
            return 
        }

        const { command, remoteJid } = extractDataFromMessage(baileysMessage) 
        
        switch(command.toLowerCase()){
            case 'ping':
                await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} Pong!` })
                break;
            case 'f':

                break;
        }
    })
}
module.exports = middlewares