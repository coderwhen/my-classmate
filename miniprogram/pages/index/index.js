// index.js
Page({
  data: {
    banners: [1,2,3,4,5]
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  handleTryBtnClick(e) {
    wx.switchTab({
      url: '/pages/book/index',
    })
  }
})