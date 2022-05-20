const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const { list: [classMate] } = await db.collection('yc_classmate')
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
    const { users: [userInfo] } = classMate
    console.log(userInfo._openid, wxContext.OPENID)
    return {
      self: userInfo._openid === wxContext.OPENID,
      userInfo
    }
  } catch (e) {
    throw e
  }
}