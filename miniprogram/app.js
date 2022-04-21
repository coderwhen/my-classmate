// app.js
App({
  globalData: {
    isLogin: false,
    userInfo: {},
    _tabPage: {
      book: 0,
      message: 0
    }
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    const userInfo = wx.getStorageSync('_userInfo')
    if(userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLogin = true
    }
  }
})
