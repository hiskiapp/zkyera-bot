let { fetchBuffer, fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "pin",
    alias: ["pin"],
    desc: "Search Image from Pinterest",
    type: "search",
    example: "Example : %prefix%command zkyera",
    exec: async(zkyera, m, { text, command, toUpper }) => {
        global.mess("wait", m)
        let fetch = await fetchUrl(global.api("zenz", "/searching/pinterest", { query: text }, "apikey"))
        let random = fetch.result[Math.floor(Math.random() * fetch.result.length)]
        let buttons = [
            {buttonId: `pin ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
        ]  
        let buttonMessage = {
            image: { url: random },
            caption: `Search Pinterest Query : ${toUpper(text)}`,
            footer: `Powered by https://hiskia.app`,
            buttons: buttons,
            headerType: 4
        }
        zkyera.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}