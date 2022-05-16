const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database()

exports.main = async (event, context) => {
  db.collection('yc_classmate')
  // .doc(event._id)
  // .aggregate()
  .lookup({
    from: 'books',
    localField: 'book',
    foreignField: 'title',
    as: 'bookList',
  })
  .end()
}