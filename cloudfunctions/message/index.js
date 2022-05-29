// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // console.log(event, wxContext)
  // return {
  //   MsgType: 'transfer_customer_service',
  //   ToUserName: wxContext.OPENID,
  //   FromUserName: 'gh_850c027935f2',
  //   CreateTime: parseInt(+new Date / 1000),
  // }
  try {
    wx.cloud.openapi.customerServiceMessage.send({
      "touser": wxContext.OPENID,
      "msgtype": 'text',
      "text": {
        "content": 'Hello World'
      }
    })
  } catch (e) {

  }
}