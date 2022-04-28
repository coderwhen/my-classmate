// index.js

Page({
  data: {
    banners: [1,2,3,4,5]
  },
  onLoad() {
    
  },
  onReady() {
    wx.hideTabBar({
      // animation: true,
    })
    setTimeout(() => {
      wx.showTabBar({
        animation: true,
      })
    }, 2000)
  },
  handleTryBtnClick(e) {
    wx.switchTab({
      url: '/pages/book/index',
    })
  }
})