const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})

exports.main = async (event, context) => {
  const {data:classMate} = await cloud.database().collection('yc_classmate').doc(event._id).get()
  const re = await cloud.database().collection('yc_classmate_list').add({
    data: {
      classmateid: event._id,
      "test1": "test1",
      "test2": "test2",
    }
  })
  const r = await cloud.database().collection('yc_message').add({
    data: {
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