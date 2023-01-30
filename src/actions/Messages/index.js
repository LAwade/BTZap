const { BOT_EMOJI, BOT_NAME } = require("../../config");

class Messages {

    constructor(){
        this.prefix = `${BOT_NAME} ${BOT_EMOJI} \n`
    }

    message(message){
        return `${this.prefix}${message}`;
    }

    success(message){
        return `${this.prefix}✅ *${message}*`;
    }

    error(message){
        return `${this.prefix}❌ *${message}*`;
    }

    warning(message){
        return `${this.prefix}⚠️ *${message}*`;
    }

    wait(message){
        return `${this.prefix}⌛ *${message}*`;
    }

    info(message){
        return `${this.prefix}❗*${message}*`;
    }
}

module.exports = Messages