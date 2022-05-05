require('./config')
const { Client } = require("@notionhq/client")

// Initializing a client
global.notion = new Client({
  auth: notion_secret,
});