class Messages {

    constructor(){
        this.prefix = ``
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