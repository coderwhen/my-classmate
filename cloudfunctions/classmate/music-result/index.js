const cloud = require('wx-server-sdk')
cloud.init({
    env: 'wwxp-2krlz'
})
const {
    search
} = require('NeteaseCloudMusicApi')

exports.main = async (event, context) => {
    console.log(event)
    return await search({
        keywords: event.keywords,
        limit: 5
    })
}