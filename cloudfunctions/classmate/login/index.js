// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'wwxp-2krlz'
})

exports.main = async (event, content) => {
    const wxContext = cloud.getWXContext()
    const db_user = cloud.database().collection('yc_user')
    const user = await db_user.where({
        _openid: wxContext.OPENID
    }).get()
    if (user.data.length > 0) {
        return user.data[0]
    }
    const res = await db_user.add({
        data: {
            _openid: wxContext.OPENID,
            ...event.userInfo
        }
    })
    return res
}