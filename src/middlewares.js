const Action = require("./actions")
const BeachTennis = require("./actions/BeachTennis")
const Commands = require("./actions/Commands")
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
        const bt = new BeachTennis(bot, baileysMessage)

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
            case 'play':
            case 'p':
                bt.play()
                break;
            case 'cancelar':
            case 'c':
                bt.cancelar()
                break;
            default:
                cmd.menus()
        }
    })
}
module.exports = middlewares