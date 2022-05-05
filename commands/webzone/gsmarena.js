const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "gsmarena",
    alias: ["gsmarena"],
    desc: "Search Phone spec From Gsmarena",
    type: "webzone",
    example: `Example : %prefix%command Poco X3`,
    exec: async(zkyera, m, { text, toUpper }) => {
        global.mess("wait", m)
        let fetch = await fetchUrl(global.api("zenz", "/webzone/gsmarena", { query: text }, "apikey"))
        if (fetch.result.length == 0) return global.mess("error", m)
        let caption = `Gsmarena Search Query : ${toUpper(text)}\n\n`
        caption += `⭔ Judul : ${fetch.result.judul}\n`
        caption += `⭔ Release : ${fetch.result.rilis}\n`
        caption += `⭔ Ukuran : ${fetch.result.ukuran}\n`
        caption += `⭔ Type : ${fetch.result.type}\n`
        caption += `⭔ Storage : ${fetch.result.storage}\n`
        caption += `⭔ Display : ${fetch.result.display}\n`
        caption += `⭔ Inchi : ${fetch.result.inchi}\n`
        caption += `⭔ Pixel : ${fetch.result.pixel}\n`
        caption += `⭔ Video Pixel : ${fetch.result.videoPixel}\n`
        caption += `⭔ RAM : ${fetch.result.ram}\n`
        caption += `⭔ Chipset : ${fetch.result.chipset}\n`
        caption += `⭔ Battery : ${fetch.result.batrai}\n`
        caption += `⭔ Merek Battery : ${fetch.result.merek_batre}\n\n`
        caption += `⭔ Detail : ${fetch.result.detail}\n`
        zkyera.sendFile(m.from, fetch.result.thumb, "", m, { caption })
    },
    isQuery: true
}
