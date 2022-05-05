const fs = require("fs")
const chalk = require("chalk")

global.reloadFile = (file, options = {}) => {
    nocache(file, module => console.log(`File "${file}" has updated`))
}

// Rest Api
global.APIs = {
    zenz: 'https://zenzapis.xyz',
}

// Apikey
global.APIKeys = {
    'https://zenzapis.xyz': '36F2874241',
}

// Other
global.options = {
    autoRead: true,
    self: true,
    mute: false
}

global.prefa = /^[zZ#$+.?_&<>!/\\]/
global.owner = ["6285777727179", "6287893136261", "6285155064115", "6281390645409", "6281216351929", "6287851766722"]
global.sessionName = {
    legacy: "/tmp/zkyera-legacy",
    multi: "/tmp/zkyera-multi"
}

global.packname = "zkyera"
global.author = "ZKY ERA"

global.notion_secret = "secret_QK8lDnFeY9XuZBkUzfOn3NQTbxwAckFaSGe32eiNJEp"

global.mess = (type, m) => {
    let msg = {
        wait: 'Wait, in progress',
        owner: 'Perintah ini hanya dapat digunakan oleh Owner!',
        group: 'Perintah ini hanya dapat digunakan di group!',
        private: 'Perintah ini hanya dapat digunakan di private chat!',
        admin: 'Perintah ini hanya dapat digunakan oleh admin group!',
        botAdmin: 'Bot bukan admin, tidak dapat mengakses fitur tersebut',
        bot: 'Fitur ini hanya dapat diakses oleh Bot',
        dead: 'Fitur ini sedang dimatikan!',
        media: 'Reply media',
        error: "No Results Found"
    } [type]
    if (msg) return m.reply(msg, m.from, {
        quoted: m
    })
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update File "${file}"`))
})