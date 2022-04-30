const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})

exports.main = async (event, context) => {
  return await cloud.openapi.wxacode.getUnlimited({
    "page": 'pages/invitation/index',
    "scene": 'a=1',
    "checkPath": false,
    "envVersion": 'develop'
  })
}