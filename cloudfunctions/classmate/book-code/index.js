const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})

exports.main = async (event, context) => {
  const { scene } = event

  return await cloud.openapi.wxacode.getUnlimited({
    "page": 'pages/invitation/index',
    "scene": scene,
    "checkPath": false,
    "envVersion": 'develop'
  })
}