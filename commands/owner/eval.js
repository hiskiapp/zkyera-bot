const fs = require("fs")
const baileys = require("@adiwajshing/baileys")


module.exports = {
    name: "eval",
    alias: [">",">>","=>"],
    desc: "Running JavaScript Code via Command",
    type: "owner",
    exec: async (zkyera, m, opt) => {
        let evaled
        let { text } = opt
        try {
            if (text.endsWith("--sync")) {
                evaled = await eval(`(async () => { ${text.trim.replace("--sync", "")} })`)
                return m.reply(evaled)
            }
            evaled = await eval(text)
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
            await zkyera.sendMessage(m.from, { text: evaled }, { quoted: m })
        } catch (e) {
            zkyera.sendMessage(m.from, { text: String(e) }, { quoted: m })
        }
    },
    isOwner: true
}
