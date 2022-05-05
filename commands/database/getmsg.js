module.exports = {
    name: "getmsg",
    alias: ['vn', 'msg', 'video', 'gif', 'audio', 'img', 'sticker'].map(v => 'get' + v),
    desc: "retrieve messages from database",
    type: "database",
    example: "send command %prefix%command <name>",
    exec: async(zkyera, m, { prefix, command, quoted, text }) => {
        let which = command.replace(/get/i, '')
        let database = global.db.database
        if(!(text.toLowerCase() in database)) return m.reply(`"${text}" not saved in the database`)
        let _m = database[text.toLowerCase()]
        zkyera.relayMessage(m.from, _m.message, { messageId: _m.id })
    },
    isQuery: true
}