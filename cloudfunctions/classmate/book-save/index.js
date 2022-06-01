// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})
const db = cloud.database().collection('yc_classmate')
exports.main = async (event, context) => {
  console.log(event)
  try {
    const { bookId } = event
    delete event.type
    const wxContext = cloud.getWXContext()
    if (bookId) {
      const result = await db.doc(bookId).set({
        data: {
          cover: {
            status: 'done',
            url: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/cover/default.png'
          },
          openid: wxContext.OPENID,
          ...event
        }
      })

      console.log(result)
      return {
        code: 200,
        data: {
          bookId
        },
        msg: '修改成功！'
      }

    } else {
      const result = await db.add({
        data: {
          cover: {
            status: 'done',
            url: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/cover/default.png'
          },
          openid: wxContext.OPENID,
          ...event
        }
      })
      console.log(result)
      return {
        code: 200,
        data: {
          bookId: result._id
        },
        msg: '创建成功！'
      }
    }
  } catch (e) {
    console.log(e)
    return {
      code: 500,
      msg: 'error'
    }
  }
}

exports.get = async (event, context) => {
  try {
    const { bookId } = event
    const wxContext = cloud.getWXContext()
    const { data: [classmate] } = await db.where({
      _id: bookId,
      openid: wxContext.OPENID
    }).get()
    return {
      code: 200,
      data: classmate,
      msg: 'success'
    }
  } catch (e) {
    return {
      code: 500,
      data: null,
      msg: 'error'
    }
  }
}