const path = require('path')

const PREFIX = '.'
const BOT_NAME = 'LendárioBOT'
const BOT_EMOJI = '🚀'
const TEMP_FOLDER = path.resolve(__dirname, '..', 'assets', 'temp')
const LIST_STORAGE = path.resolve(__dirname, '..', 'assets', 'storage')

module.exports = {
    PREFIX,
    BOT_NAME,
    BOT_EMOJI,
    TEMP_FOLDER,
    LIST_STORAGE
}