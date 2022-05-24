const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})

const db = cloud.database()

exports.main = async (event, context) => {
  
  const { bookId, bookListId } = event
  delete event.type
  delete event.bookId
  delete event.bookListId
  const wxContext = cloud.getWXContext()
  const { data: [classMate] } = await db.collection('yc_classmate_list').where({
    _openid: wxContext.OPENID,
    classmateid: bookId
  }).get()
  
  if (!classMate) {
    const re = await db.collection('yc_classmate_list').add({
      data: {
        classmateid: bookId,
        ...event,
        _openid: wxContext.OPENID,
        time: new Date().getTime()
      }
    })
    
  } else {
    const re = await db.collection('yc_classmate_list').doc(classMate._id).update({
      data: {
        classmateid: bookId,
        ...event,
        _openid: wxContext.OPENID,
        time: new Date().getTime()
      }
    })
    
  }

  const r = await db.collection('yc_message').add({
    data: {
      openid: wxContext.OPENID,
      message: bookListId ? '更新了你的同学录！' : '给你同学录留言！',
      time: new Date().getTime()
    }
  })

  
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      "touser": classMate.openid,
      "page": 'pages/index/index',
      "lang": 'zh_CN',
      "data": {
        "thing1": {
          "value": '测试用户'
        },
        "thing3": {
          "value": '测试测试测试'
        },
        "thing5": {
          "value": '系统提示'
        },
        "thing6": {
          "value": '更新同学录'
        },
        "time2": {
          "value": "2022-5-21"
        }
      },
      "templateId": '50cr-QnQDUOzZv4zHhjMbjMU3MIz6CiHIYIlLlDtuIs',
      "miniprogramState": 'developer'
    })
    return result
  } catch (err) {
    return err
  }
}

exports.get = async (event, context) => {
  const {bookId} = event
  const wxContext = cloud.getWXContext()
  const classMateList = db.collection('yc_classmate_list')
  const { data: [classMateDetail] } = await classMateList.where({
    _openid: wxContext.OPENID,
    classmateid: bookId
  }).get()
  if(classMateDetail) {
    return {
      code: 200,
      data: classMateDetail,
      msg: '存在！'
    }
  } else {
    return {
      code: 404,
      msg: '不存在！'
    }
  }
}