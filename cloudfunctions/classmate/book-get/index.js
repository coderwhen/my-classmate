const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database().collection('yc_classmate')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return db.where({
    openid: wxContext.OPENID
  }).get()
}