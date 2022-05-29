// index.js
Page({
  data: {
    banners: [
      {
        id: '1',
        url: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/banner/b1.jpg',
        path: '/pages/book-detail/index?bookId=0ab5303b626a970a00abd9b65e749f14'
      },
      {
        id: '2',
        url: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/banner/b2.png',
        path: '/pages/book/index'
      },
      {
        id: '3',
        url: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/banner/banner1.jpg',
        path: '/pages/book/index'
      }
    ],
    discover: false
  },
  onLoad() {

  },
  onReady() {

  },
  onPullDownRefresh(e) {
    const time = (Math.random() + 1) * 1000
    console.log(time)
    setTimeout(_ => {
      wx.stopPullDownRefresh()
    }, time)
  },
  handleSwiperClick(e) {
    const { banner } = e.target.dataset
    console.log(banner)
    const { path } = banner
    if (path) {
      wx.navigateTo({
        url: path,
        fail: _ => {
          wx.switchTab({
            url: path,
          })
        }
      })
    }
  },
  handleImageLoad(e) {
    this.setData({
      discover: true
    })
  },
  /**
   * 去试试
   * @param {*} e 
   */
  handleTryBtnClick(e) {
    wx.switchTab({
      url: '/pages/book/index',
    })
  },
  handleLook(e) {
    wx.navigateTo({
      url: '/pages/book-detail/index?bookId=0ab5303b626a970a00abd9b65e749f14',
    })
  }
})