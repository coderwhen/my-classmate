// pages/login/index.js
const app = getApp()

Page({
  data: {

  },
  handleUserLogin() {
    wx.getUserProfile({
      desc: 'desc',
    }).then(res => {
      wx.showLoading({
        title: '登录中',
        mask: true
      })
      wx.cloud.callFunction({
        name: 'classmate',
        data: {
          type: 'login',
          userInfo: res.userInfo
        }
      }).then(resalt => {
        console.log(resalt)
        app.globalData.userInfo = res.userInfo
        app.globalData.isLogin = true
        wx.navigateBack()
        wx.setStorageSync('_userInfo', res.userInfo)
      }).catch(err => {
        wx.showToast({
          title: '前方发生错误,请稍后再试！',
          icon: 'none',
          duration: 1500
        })
      }).finally(() => {
        wx.hideLoading()
      })
    }).catch(err => {
      wx.showToast({
        title: '取消登录',
        duration: 1500
      })
    })
  },
  handleLookLook(e) {
    wx.navigateBack()
  }
})