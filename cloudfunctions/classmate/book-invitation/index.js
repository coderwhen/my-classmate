const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: cloud.DYNAMIC_CURRENT_ENV
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
        localField: 'openid',
        foreignField: '_openid',
        as: 'users',
      })
      .end()
    const { users: [userInfo] } = classMate
    console.log(userInfo._openid, wxContext.OPENID)
    return {
      self: wxContext.OPENID ? 
        userInfo._openid === wxContext.OPENID:
        false
      ,
      userInfo
    }
  } catch (e) {
    cloud.logger(e)
    throw e
  }
}