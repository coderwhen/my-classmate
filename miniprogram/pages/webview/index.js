// pages/webview/index.js
Page({
  data: {
    url: ''
  },
  onLoad(options) {
    const { url } = options
    this.setData({
      url
    })
  },
})