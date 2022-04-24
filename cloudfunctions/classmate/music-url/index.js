// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'wwxp-2krlz'
})
const {
    song_url
} = require('NeteaseCloudMusicApi')

exports.main = async (event,context) => {
    return await song_url({
        id: event.id
    })
}