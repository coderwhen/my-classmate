const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { bookId, query } = event
  const {
    page = 0,
    pageSize = 5
  } = query
  const classMateList = db.collection('yc_classmate_list')
  return await
    db.collection('yc_classmate_list').where({
      classmateid: bookId
    })
    .orderBy('time', 'desc')
    .skip(page * pageSize)
    .limit(pageSize)
    .get()
}
