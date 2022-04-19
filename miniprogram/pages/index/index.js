// index.js

Page({
  data: {
    banners: [1,2,3,4,5]
  },
  onReady() {
    wx.startPullDownRefresh();
  },
  onPullDownRefresh() {
    console.log('asdasd')
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 2000)
  }
})