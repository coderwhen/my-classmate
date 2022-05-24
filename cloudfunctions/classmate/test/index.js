const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})


exports.main = async () => {
  const db = cloud.database()

  await db.collection('yc_message').update({
    data: {
      test: 'asdasda'
    }
  })
}