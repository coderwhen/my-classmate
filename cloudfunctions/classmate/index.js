
const login = require('./login')
const musicSuggest = require('./music-suggest')
const musicResult = require('./music-result')
const musicUrl = require('./music-url')
const bookSave = require('./book-save')
const bookCover = require('./book-cover')
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  switch (event.type) {
    case "login":
      return login.main(event, context)
    case "music-suggest":
      return musicSuggest.main(event, context)
    case "music-result":
      return musicResult.main(event, context)
    case "music-url":
      return musicUrl.main(event, context)
    case "book-save":
      return bookSave.main(event, context)
    case "book-cover":
      return bookCover.main(event, context)
    default:
      return {
        code: 400,
        msg: '没有找到对应的方法'
      }
  }
}