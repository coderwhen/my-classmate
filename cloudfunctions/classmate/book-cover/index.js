const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database().collection('yc_classmate')

exports.main = async (event, context) => {
  return db.doc(event._id).update({
    data: {
      cover: event.cover
    }
  })
}
