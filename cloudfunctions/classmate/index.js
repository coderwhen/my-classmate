
const login = require('./login')
const musicSuggest = require('./music-suggest')
const musicResult = require('./music-result')
const musicUrl = require('./music-url')
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
        default:
            return {
                code: 400,
                msg: '没有找到对应的方法'
            }
    }
}