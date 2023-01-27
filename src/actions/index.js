const { BOT_EMOJI } = require("../config");
const { extractDataFromMessage } = require("../utils");


class Action {

    constructor(bot, baileysMessage){
        const { remoteJid, args, isImage } = extractDataFromMessage(baileysMessage);
        this.bot = bot
        this.remoteJid = remoteJid
        this.args = args
        this.isImage = isImage
        this.baileysMessage = baileysMessage
    }

    async sticker(){
        if(!this.isImage){
            await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} Você precisa informar uma imagem!`})
            return
        }
    }

}