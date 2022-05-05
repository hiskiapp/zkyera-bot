const {
    data
} = require("cheerio/lib/api/attributes");
const {
    fetchUrl
} = require("../../lib/Function")
require("../../notion")

module.exports = {
    name: "matakuliah",
    alias: ["matkul"],
    desc: "Cek mata kuliah",
    type: "kuliah",
    example: `Example : %prefix%command Semester 4`,
    exec: async (zkyera, m, {
        text,
        command,
        prefix,
        toUpper
    }) => {
        global.mess("wait", m)

        let semester = toUpper(text);
        let database_id = "bc7fdd3fd3b64cc6bf107e7358458a35";
        const matkul = await notion.databases.query({
            database_id: database_id,
            filter: {
                property: "Semester",
                select: {
                    equals: semester,
                },
            },
        });

        let teks = `*Mata Kuliah ${semester}*\n\n`
        for (let mat of Object.keys(matkul.results)) {
            teks += `┌──⭓ *${matkul.results[mat].properties['Name'].title[0].text.content}*\n`
            teks += `│\n`
            teks += `Code : ${matkul.results[mat].properties['Code'].rich_text[0].text.content}\n`
            teks += `SKS : ${matkul.results[mat].properties['SKS'].number}\n`
            teks += `Hari : ${matkul.results[mat].properties['Day'].multi_select.map(day => day.name).join(', ')}\n`
            teks += `Jam : ${matkul.results[mat].properties['Hours'].multi_select.map(hour => hour.name).join(', ')}\n`
            teks += `List Mahasiswa : ${matkul.results[mat].properties['Detail'].url}\n`
            teks += `Materi & Tugas : https://hiskia.app/${matkul.results[mat].id.replace(/-/g, "")}\n`
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
    },

    isQuery: true

}