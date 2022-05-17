const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database()

exports.main = async (event, context) => {
  return await db.collection('yc_classmate')
  .aggregate()
  .match({
    _id: event._id
  })
  .lookup({
    from: 'yc_user',
    localField: 'userInfo.openId',
    foreignField: '_openid',
    as: 'users',
  })
  .end()
}