const { BOT_EMOJI, TEMP_FOLDER } = require("../config");
const { extractDataFromMessage, downloadSticker } = require("../utils");
const path = require('path');
const { exec } = require("child_process");
const  fs = require("fs");

class Action {

    constructor(bot, baileysMessage){
        const { remoteJid, args, type, params } = extractDataFromMessage(baileysMessage);
        this.bot = bot
        this.remoteJid = remoteJid
        this.args = args
        this.type = type
        this.params = params
        this.baileysMessage = baileysMessage
    }

    async sticker(){
        if(this.type != 'video' && this.type != 'image'){
            await this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} Você precisa informar uma imagem!`})
            return
        }

        if(this.params?.seconds > 5){
            this.bot.sendMessage(this.remoteJid, { text: `${BOT_EMOJI} O tamanho ou o tempo do vídeo é muito longo.` })
            return 
        }

        const inputPath = await downloadSticker(this.baileysMessage, 'input')
        const outputPath = path.resolve(TEMP_FOLDER, 'output.webp');

        exec(`ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`, async (error) => {
            if(error){
                await this.bot.sendMessage(this.remoteJid, { text : `${BOT_EMOJI} Error ao converter figurinha!`})
                return
            }
            await this.bot.sendMessage(this.remoteJid, { sticker: { url: outputPath }})

            fs.unlinkSync(inputPath)
            fs.unlinkSync(outputPath)
        });
    }
}

module.exports = Action