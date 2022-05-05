module.exports = {
    name: "tweetmaker",
    alias: ["twc","tweetcomment"],
    desc: "Twitter Comment Maker",
    type: "creator",
    exec: async(zkyera, m, { text }) => {
        if (!text.includes('|')) return m.reply(`Example : ${prefix + command} Text|Username`)
        let [a, b] = text.split`|`
        zkyera.sendFile(m.from, global.api("zenz", "/creator/maketweet", {text: a, text2: b}, "apikey"), "", m)
    }
}