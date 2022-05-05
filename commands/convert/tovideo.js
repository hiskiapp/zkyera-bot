const { getRandom } = require("../../lib/Function")
let axios = require('axios')
let BodyForm = require('form-data')

module.exports = {
    name: "tovideo",
    alias: ["tovideo","tomp4","v"],
    desc: "Convert Sticker Gif To Video",
    type: "convert",
    exec: async(zkyera, m, { command, prefix, text, quoted, mime }) => {
        if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
        if (/image|video|sticker/.test(mime)) {
            global.mess("wait", m)
            let download = await zkyera.downloadMediaMessage(quoted)
            const form = new BodyForm()
            form.append('sampleFile', download, { filename: getRandom('webp') })
            axios.post(global.api("zenz", "/convert/webp-to-mp4", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
            }).then(({ data }) => {
                zkyera.sendFile(m.from, data.result, "", m, { caption: 'Convert Sticker Gif To Video' })
            })
        } else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}