const { delay, extractMessageContent } = require("@adiwajshing/baileys")
const { isUrl } = require("../../lib/Function")

module.exports = {
    name: "sticker",
    alias: ["s","stiker","setiker"],
    desc: "Convert Image, Video, Gif To Sticker",
    type: "convert",
    exec: async(zkyera, m, { command, prefix, text, quoted, mime }) => {
        if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
        global.mess("wait", m)
        if (/image|video|sticker/.test(mime)) {
            let download = await quoted.download()
            zkyera.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else if (quoted.mentions[0]) {
            let url = await zkyera.profilePictureUrl(quoted.mentions[0], "image")
            zkyera.sendFile(m.from, url, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else if (isUrl(text)) {
            if (isUrl(text)) zkyera.sendFile(m.from, isUrl(text)[0], "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            else m.reply('No Url Match')
        } else if (text) {
            let fetch = await fetchUrl(global.api("zenz", "/searching/stickersearch", { query: text }, "apikey"))
            for (let url of fetch.result) {
                await delay(1000)
                zkyera.sendFile(m.from, url, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            }
        } else if (quoted.type == "templateMessage") {
            let message = quoted.imageMessage || quoted.videoMessage
            let download = await zkyera.downloadMediaMessage(message)
            zkyera.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else if (quoted.type == "buttonsMessage") {
            let message = quoted.imageMessage || quoted.videoMessage
            let download = await zkyera.downloadMediaMessage(message)
            zkyera.sendFile(m.from, download, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
        } else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}