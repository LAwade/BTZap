const { downloadContentFromMessage } = require("@adiwajshing/baileys")
const { PREFIX, TEMP_FOLDER } = require("../config")
const path = require('path')
const { writeFile } = require('fs/promises')


function extractDataFromMessage(baileysMessage){
    const message = typeMessage(baileysMessage)

    if(!message.text){
        return {
            remoteJid: '',
            fullMessage: '',
            command: '',
            args: '',
            type: null,
            params: null
        }
    }

    const [command, ...args] = message.text.trim().split(' ')
    const arg = args.reduce((acc, arg) => acc + ' ' + arg, '').trim()

    return {
        remoteJid: baileysMessage?.key?.remoteJid,
        fullMessage: message.text,
        command: command.replace(PREFIX, '').trim(),
        args: arg.trim(),
        type: message.type,
        params: message?.params
    }
}

function typeMessage(baileysMessage){
    
    if(baileysMessage.message){
        if(!!baileysMessage.message?.imageMessage || !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage){
            content = baileysMessage.message?.imageMessage || baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
            return { type: 'image', text: baileysMessage.message?.extendedTextMessage?.text, content }
        }
        if(!!baileysMessage.message?.videoMessage || !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage){
            content = baileysMessage.message?.videoMessage || baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage
            seconds = baileysMessage.message?.videoMessage?.seconds || baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.seconds
            return { type: 'video', text: baileysMessage.message?.extendedTextMessage?.text, content, params: { seconds } }
        }
        if(baileysMessage.message?.conversation || baileysMessage.message.extendedTextMessage?.text){
            return { type: 'text', text: baileysMessage.message?.conversation, content: null}
        }
    }
    return { type: undefined, text: '', content: null}
}

function isCommand(baileysMessage){
    const { fullMessage } = extractDataFromMessage(baileysMessage)
    return fullMessage && fullMessage.startsWith(PREFIX)
}

async function downloadSticker(baileysMessage, fileName){
    const content = typeMessage(baileysMessage)

    if(!content){
        return null;
    }

    const stream =  await downloadContentFromMessage(content.content, (content.type == 'image' ? 'image' : 'video'))

    let buffer = Buffer.from([])
    for await (const chunk of stream){
        buffer = Buffer.concat([buffer, chunk])
    }

    const filePath = path.resolve(TEMP_FOLDER, `${fileName}.`  + content.type == 'image' ? 'png' : 'gif')
    await writeFile(filePath, buffer)
    return filePath
}

module.exports = {
    extractDataFromMessage,
    isCommand,
    downloadSticker
}