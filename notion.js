const {
  Client
} = require("@notionhq/client")

global.notion = new Client({
  auth: process.env.NOTION_SECRET,
});