const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wwxp-2krlz'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { scene } = event
  const { data: [classmate] } = await db.collection('yc_classmate_code').where({
    _id: scene
  }).get()
  if (classmate) {
    return {
      code: 200,
      data: {
        fileID: classmate.fileID
      },
      msg: 'ok'
    }
  } else {
    const { buffer } = await cloud.openapi.wxacode.getUnlimited({
      "page": 'pages/invitation/index',
      "scene": scene,
      "checkPath": false,
      "envVersion": 'release'
    })
    const { fileID } = await cloud.uploadFile({
      fileContent: buffer,
      cloudPath: 'qrcode/' + scene + '.png'
    })

    db.collection('yc_classmate_code').add({
      data: {
        _id: scene,
        fileID
      }
    })

    return {
      code: 200,
      data: {
        fileID
      },
      msg: 'ok'
    }
  }

}