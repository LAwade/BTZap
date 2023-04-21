const fs = require('fs')
const { fileRead, fileCreate } = require('../../utils')
const { extractDataFromMessage } = require("../../utils");
const Messages = require('../Messages');

class BeachTennis {

    constructor(bot, baileysMessage){
        const { remoteJid, participant, params } = extractDataFromMessage(baileysMessage);
        this.msg = new Messages()
        this.remoteJid = remoteJid
        this.participant = participant
        this.bot = bot
        this.params = params
        
        this.date = new Date()
        if(this.date.getHours() >= 20){
            this.date.setDate(currentDate.getDate() + 1);
        }
        
        const dataNow = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`
        this.file = `${dataNow}.json`
    }

    async play(){
        const player = {
            name: this.params?.pushName,
            participant: this.participant,
            status: "play"
        }

        let data = await fileRead(this.file)

        let isAdd = false
        const dataNow = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`
        if(Object.entries(data).length > 0){
            for(let v in data.players){
                if(data.players[v].participant == this.participant){
                    data.players[v].status = 'play'
                    isAdd = true
                }
            }

            if(!isAdd){
                data.players.push(player)
            }
        } else {
            data = {
                date: dataNow,
                players: [ player ]
            }
        }
        this.mensagem(data)
    }

    async cancelar(){
        let data = await fileRead(this.file)
        if(Object.entries(data).length > 0){
            for(let v in data.players){
                if(data.players[v].participant == this.participant){
                    data.players[v].status = 'canceled'
                }
            }
            this.mensagem(data)
        }
    }

    mensagem(data){
        const week = ["Domingão", "Segundonaa", "Terça", "Quarta", "Quinta", "SEXXTOU", "Sábadão"];
        let hour = this.date.getDay() == 0 || this.date.getDay() == 7 ? '8H' : '18H'

        fileCreate(this.file, data)
        let text = `🚀 *BOORRAA PRO* ▶️ 🏓🥎\n`
        text += `*Dia:* _${this.date.toLocaleDateString('pt-BR').replace(`/${this.date.getFullYear()}`, '')}_ - ${week[this.date.getDay()]} às ${hour}` + "\n\n";
        for(let p in data.players){
            text += (Number(p) + Number(1)) + (data.players[p].status == 'play' ?  `. *${data.players[p].name}* ✅` : `. ~${data.players[p].name}~ ❌`) + "\n"
        }

        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(text) 
        })
    }
}

module.exports = BeachTennis