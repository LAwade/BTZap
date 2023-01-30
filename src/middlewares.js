const Action = require("./actions")
const Commands = require("./actions/Commands")
const { BOT_EMOJI } = require("./config")
const { isCommand, extractDataFromMessage } = require("./utils")

async function middlewares(bot){
    bot.ev.on('messages.upsert', async( { messages } ) => {
        const baileysMessage = messages[0]

        if(!baileysMessage?.message || !isCommand(baileysMessage)){
            return 
        }

        const { command, remoteJid } = extractDataFromMessage(baileysMessage) 
        const action = new Action(bot, baileysMessage)

        const cmd = new Commands(bot, baileysMessage)
        switch(command.toLowerCase()){
            case 'menu':
                cmd.menus()
                break;
            case 'pix':
                cmd.pix()
                break;
            case 'paypal':
                cmd.paypal()
                break;
            case 'planos':
                cmd.planos()
                break;
            case 'tutorial':
                cmd.tutorial()
                break;
            case 'botibia':
                cmd.botibia()
                break;
            case 'conftibia':
                cmd.conftibia()
                break;
            case 'f':
                action.sticker()
                break;
            default:
                cmd.menus()
        }
    })
}
module.exports = middlewares