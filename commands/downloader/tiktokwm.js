const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "tiktokwm",
    alias: ["tiktokwm","ttwm","tiktokwatermark"],
    desc: "Download Media From https://tiktok.com",
    type: "downloader",
    example: "Example : %prefix%command https://www.tiktok.com/@vernalta/video/695975110141126579",
    exec: async(zkyera, m, { text }) => {
        global.mess("wait", m)
        let fetch = await fetchUrl(global.api("zenz", "/downloader/tiktok", { url: isUrl(text)[0] }, "apikey"))
        let buttons = [
            {buttonId: `tiktoknowm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
            {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
        ]
        let buttonMessage = {
            video: { url: fetch.result.watermark },
            caption: `Download Tiktok From : ${isUrl(text)[0]}`,
            footer: 'Powered by https://hiskia.app',
            buttons: buttons,
            headerType: 5
        }
        zkyera.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}