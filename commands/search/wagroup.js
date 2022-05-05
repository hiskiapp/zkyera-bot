const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "wagroup",
    alias: ["wagroup"],
    desc: "Search WhatsApp Group",
    type: "search",
    example: `Example : %prefix%command Mabar`,
    exec: async(zkyera, m, { text, toUpper }) => {
        global.mess("wait", m)
        let fetch = await fetchUrl(global.api("zenz", "/searching/wagroup", { query: text }, "apikey"))
        if (fetch.result.length == 0) return global.mess("error", m)
        let caption = `WA Group Search Query : ${toUpper(text)}\n\n`
        for (let i of fetch.result) {
            caption += `⭔ Name : ${i.nama}\n`
            caption += `⭔ Link : ${i.link}\n\n`
        }
        zkyera.sendText(m.from, caption, m)
    },
    isQuery: true
}
