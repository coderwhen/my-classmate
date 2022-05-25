// app.js
App({
  globalData: {
    isLogin: false,
    userInfo: null,
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
        env: wx.cloud.DYNAMIC_CURRENT_ENV
      })
      console.log('init cloud')
    }

    const userInfo = wx.getStorageSync('_userInfo')
    if(userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLogin = true
    }
  }
})
