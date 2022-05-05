let { fetchBuffer, fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "gimage",
    alias: ["image"],
    desc: "Search Image from Google",
    type: "search",
    example: "Example : %prefix%command zkyera",
    exec: async(zkyera, m, { text, command, toUpper }) => {
        global.mess("wait", m)
        if (!text) return m.reply(`Example : ${prefix + command} zkyera Zoldyck`)
        let fetch = await fetchUrl(global.api("zenz", "/searching/gimage", { query: text }, "apikey"))
        let random = fetch.result[Math.floor(Math.random() * fetch.result.length)]
        let buttons = [
            {buttonId: `pinterest ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
        ]
        let buttonMessage = {
            image: { url: random },
            caption: `Search Google Image Query : ${toUpper(text)}`,
            footer: `Powered by https://hiskia.app`,
            buttons: buttons,
            headerType: 4
        }
        zkyera.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}