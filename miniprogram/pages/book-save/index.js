// pages/book-save/index.js
Page({
    data: {

    },
    handleChooseMusic(e) {
        console.log(e)
        wx.navigateTo({
            url: '/pages/choose-music/index'
        })
    }
})