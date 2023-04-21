const { PREFIX } = require("../../config");
const { extractDataFromMessage } = require("../../utils");
const Messages = require("../Messages");

class Commands {

    constructor(bot, baileysMessage){
        const { remoteJid } = extractDataFromMessage(baileysMessage);

        this.msg = new Messages
        this.remoteJid = remoteJid
        this.bot = bot
    }

    menus(){
        const menus = {
            pix: "Pix Pagamento",
            paypal: "Paypal Pagamento",
            planos: "TeamSpeak e BOT",
            tutorial: "Tutorial TeamSpeak",
            botibia: "TS3BOT Tibia",
            conftibia: "Configurar TS3BOT",
        }

        let msgMenu = "*Selecione um opção:* \n"
        msgMenu += `Digite ${PREFIX} e o nome do comando\n`
        msgMenu += "-----------------------\n"
        for(const k in menus){
            msgMenu += `🔹${PREFIX}${k} - ${menus[k]}\n`
        }

        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(msgMenu) 
        })
    }

    pix(){
        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(`Nosso PIX: *lendariosteam@outlook.com* \n\n*Assim que efetuar o pagamento envie o comprovante e seu IP personalizado do seu TeamSpeak junto com seu e-mail cadastrado!*`) 
        })
    }

    paypal(){
        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(`Nosso PayPal: *lucasawade46@gmail.com* \n\n*Assim que efetuar o pagamento envie o comprovante e seu IP personalizado do seu TeamSpeak junto com seu e-mail cadastrado!*`) 
        })
    }

    conftibia(){
        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(`*Acesse o vídeo no YouTube \nVideo:* https://youtu.be/6dEEFw3u5Mo`) 
        })
    }

    planos(){
        let planos = ""
        planos += "Nossos Planos de TeamSpeak e BOT\n - 100 Slots - R$ 10,00\n - 150 Slots - R$ 15,00\n - 200 Slots + BOT - R$ 20,00\n - 500 Slots + BOT - R$ 40,00\n"
        planos += "-------------------------------\n"
        planos += "Configuração de TeamSpeak 3\n - Permissões & Salas - R$ 15,00\n"
        planos += "-------------------------------\n"
        planos += "BOT Tibia e Comandos\n - BOT Tibia - R$ 20,00\n"
        planos += "-------------------------------\n"
        planos += "Add Novos Servidores de OT\n - OT Server - R$ 20,00\n\n"
        planos += "*Aproveite nosso período de 5 Dias de teste para conferir todos os nossos recursos!*\n\n"
        planos += "*APENAS REALIZAMOS O ALUGUEL DOS SERVIDORES DE TEAMSPEAK 3 E BOT!*"
        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(planos) 
        })
    }

    botibia(){
        let bot = "*Funcionalidade do BOT*\n\n"
        bot += "*BOT List (Tíbia):*\n"
        bot += "- Friend List \n - Hunted List \n - Neutral List \n - Death List \n - Alerta de Mortes, Level e Conexão"
        bot += "\n\n"
        bot += "*BOT Command (TS):*\n - Mass Poke \n - Mass kick \n - Mass Move \n - Mass kick Channel \n - Mass Move Group"
        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(bot) 
        })
    }
    tutorial(){
        let tutorial = "*Para as configurações você deve estar conectado ao seu painel administrativo da Lendários TeaM.*\n\n"
        tutorial += "🔑 Chave de privilégio:  Para buscar sua chave de privilégio só acessar o menu: \n - Meu TeamSpeak > Gerenciar Token \n\n"
        tutorial += "👷🏽‍♂️ Configurações de Grupos: Para criar grupos personalizados. \n - Meu TeamSpeak > Criar Cargo. \n\n"
        tutorial += "🛠 Templates de Salas: Para agilizar criação de salas. \n - Meu TeamSpeak > Instalar template."
        this.bot.sendMessage(this.remoteJid, { 
            text: this.msg.message(tutorial) 
        })
    }
}

module.exports = Commands