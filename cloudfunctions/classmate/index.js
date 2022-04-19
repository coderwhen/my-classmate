
const login = require('./login')
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event)
    switch(event.type) {
        case "login":
            return login.main(event,context)
        default:
            return {
                code: 400,
                msg: '没有找到对应的方法'
            }
    }
}