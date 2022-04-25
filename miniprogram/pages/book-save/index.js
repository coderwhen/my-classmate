// pages/book-save/index.js
Page({
    data: {
      coverImageUrl: '',
      title: '',
    },
    handleChooseMusic(e) {
        wx.navigateTo({
            url: '/pages/choose-music/index'
        }).catch(err => {
          console.log(err)
        })
    },
    handleChooseImage(e) {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          console.log(res)
          this.setData({
            coverImageUrl: res.tempFilePaths[0]
          })
        },
      })
    }
})