const {
    data
} = require("cheerio/lib/api/attributes")
const {
    fetchUrl
} = require("../../lib/Function")
require("../../notion")

module.exports = {
    name: "materikuliah",
    alias: ["matliah"],
    desc: "Cek materi kuliah",
    type: "kuliah",
    example: `Example : %prefix%command tanggal_start (format: yyyy-mm-dd)`,
    exec: async (zkyera, m, {
        text,
        command,
        prefix,
        toUpper
    }) => {
        global.mess("wait", m)
        let database_id = "ae0f2282aa0c44b6929c1b1dfd510458";
        if ((new Date(text) !== "Invalid Date") && !isNaN(new Date(text))) {
            const materi = await notion.databases.query({
                database_id: database_id,
                filter: {
                    property: "Date",
                    date: {
                        on_or_after: text,
                    },
                },
                sorts: [{
                    property: "Date",
                    direction: "descending"
                }]
            });

            console.log(JSON.stringify(materi))

            let teks = `*Materi Kuliah Setelah Tgl ${text}*\n\n`
            for (let mat of Object.keys(materi.results)) {
                teks += `┌──⭓ *${materi.results[mat].properties['Topic'].title[0].text.content}*\n`
                teks += `│\n`
                teks += `Tanggal : ${materi.results[mat].properties['Date'].date.start}\n`
                teks += `Record : ${materi.results[mat].properties['Record'].url}\n`
                teks += `Detail : https://hiskia.app/${materi.results[mat].id.replace(/-/g, "")}\n`
                teks += `│\n`
                teks += `└───────⭓\n\n`
            }

            let templateButtons = [{
                index: 1,
                urlButton: {
                    displayText: 'Selengkapnya',
                    url: `https://hiskia.app/${database_id}`
                }
            }, ]

            let templateMessage = {
                text: teks,
                footer: `Powered By https://hiskia.app`,
                templateButtons: templateButtons
            }

            zkyera.sendMessage(m.from, templateMessage, {
                quoted: m
            })
        } else {
            zkyera.sendText(m.from, "Tanggal tidak valid", m)
        }
    },

    isQuery: true
}