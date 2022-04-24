// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'wwxp-2krlz'
})
const {
    search_suggest
} = require('NeteaseCloudMusicApi')

exports.main = async (event, context) => {
    console.log(event)
    return await search_suggest({
        keywords: event.keywords,
        type: 'mobile'
    })
}