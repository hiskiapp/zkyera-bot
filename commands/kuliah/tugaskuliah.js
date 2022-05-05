const {
    fetchUrl
} = require("../../lib/Function")
require("../../notion")

module.exports = {
    name: "tugaskuliah",
    alias: ["tukul"],
    desc: "Cek tugas kuliah",
    type: "kuliah",
    example: `Example : %prefix%command tanggal_start (format: yyyy-mm-dd)`,
    exec: async (zkyera, m, {
        text,
        command,
        prefix,
        toUpper
    }) => {
        global.mess("wait", m)
        let database_id = "b192da2593c84f3e824d6298664bfea0";
        if ((new Date(text) !== "Invalid Date") && !isNaN(new Date(text))) {
            const tugas = await notion.databases.query({
                database_id: database_id,
                filter: {
                    property: "Deadline",
                    date: {
                        on_or_after: text,
                    },
                },
                sorts: [{
                    property: "Deadline",
                    direction: "descending"
                }]
            });

            let teks = `*Tugas Kuliah Setelah Tgl ${text}*\n\n`
            for (let tug of Object.keys(tugas.results)) {
                teks += `┌──⭓ *${tugas.results[tug].properties['Title'].title[0].text.content}*\n`
                teks += `│\n`
                teks += `Deadline : ${tugas.results[tug].properties['Deadline'].date.start}\n`
                teks += `Status : ${tugas.results[tug].properties['Status'].select.name}\n`
                teks += `Detail : https://hiskia.app/${tugas.results[tug].id.replace(/-/g, "")}\n`
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