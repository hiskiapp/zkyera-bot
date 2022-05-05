const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "emojis",
    alias: ["emos", "emoji2"],
    desc: "Convert Emojis 2 To Sticker",
    type: "convert",
    example: `List Type :\n\n${type().sort((a, b) => a - b).join("\n")}\n\nExample : %prefix%command <type> <text>`,
    exec: async(zkyera, m, { command, prefix, text, args }) => {
        if (!text) return m.reply(`Example : ${prefix + command} apple 😅`)
        type = args[0].toLowerCase()
        let [text1, ...text2] = text.replace(args[0], "").trimStart().split`|`
        text2 = text2.join("|")
        let fetch = await fetchUrl(global.api("zenz", `/api/emoji`, {query: text1}, "apikey"))
        switch(type) {
            case "apple": 
                zkyera.sendFile(m.from, fetch.result.apple, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "google":
                zkyera.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "samsung":
                zkyera.sendFile(m.from, fetch.result.samsung, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "microsoft":
                zkyera.sendFile(m.from, fetch.result.microsoft, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "whatsapp":
                zkyera.sendFile(m.from, fetch.result.whatsapp, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "twitter":
                zkyera.sendFile(m.from, fetch.result.twitter, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "facebook":
                zkyera.sendFile(m.from, fetch.result.facebook, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "jooxpixel":
                zkyera.sendFile(m.from, fetch.result.jooxPixel, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "openemoji":
                zkyera.sendFile(m.from, fetch.result.openemoji, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "emojidex":
                zkyera.sendFile(m.from, fetch.result.emojidex, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "messanger":
                zkyera.sendFile(m.from, fetch.result.messanger, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "lg":
                zkyera.sendFile(m.from, fetch.result.LG, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "htc":
                zkyera.sendFile(m.from, fetch.result.HTC, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "mozilla":
                zkyera.sendFile(m.from, fetch.result.mozilla, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "softbank":
                zkyera.sendFile(m.from, fetch.result.softbank, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "docomo":
                zkyera.sendFile(m.from, fetch.result.docomo, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
            case "kddi":
                zkyera.sendFile(m.from, fetch.result.KDDI, "", m, { asSticker: true, author: global.author, packname: global.packname, categories: ['😄','😊'] })
            break
        }
    },
    isQuery: true
}

function type() {
    return ["apple", "google","samsung", "microsoft", "whatsapp", "twitter", "facebook", "jooxpixel", "openemoji", "emojidex", "messanger", "lg", "htc", "mozilla", "softbank", "docomo", "kddi"]
}