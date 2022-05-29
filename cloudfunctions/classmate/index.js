
const login = require('./login')
const musicSuggest = require('./music-suggest')
const musicResult = require('./music-result')
const musicUrl = require('./music-url')
const bookSave = require('./book-save')
const bookGet = require('./book-get')
const bookCode = require('./book-code')
const bookInvitation = require('./book-invitation')
const bookEdit = require('./book-edit')
const bookDetail = require('./book-detail')

const test = require('./test')
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
    case "book-save-get":
      return bookSave.get(event, context)
    case "book-code":
      return bookCode.main(event, context)
    case "book-get":
      return bookGet.main(event, context)
    case "book-invitation":
      return bookInvitation.main(event, context)
    case "book-edit":
      return bookEdit.main(event, context)
    case "book-edit-get":
      return bookEdit.get(event, context)
    case "book-detail":
      return bookDetail.main(event, context)
    case "test":
      return test.main()
    default:
      return {
        code: 400,
        msg: '没有找到对应的方法'
      }
  }
}