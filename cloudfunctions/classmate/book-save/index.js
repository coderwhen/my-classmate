// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database().collection('yc_classmate')
exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext()
  delete event.type
  return await db.add({
    data: {
      openid: wxContext.OPENID,
      ...event
    }
  })
}