// pages/book/index.js
const app = getApp()
const {
  getClassMate
} = require('../../api/index')
Page({
  data: {
    // tabs数据
    tabs: ['我的同学录', '我参加的'],
    tabActiveIndex: 0,
    alumniBooks: [],
    joins: [],
    isLogin: false
  },
  onShow(e) {
    const data = {}
    if (app.globalData._tabPage.book != this.data.tabActiveIndex) {
      data.tabActiveIndex = app.globalData._tabPage.book
    }
    this.setData({
      ...data,
      isLogin: app.globalData.isLogin
    })
    if (app.globalData.isLogin) {
      getClassMate().then(res => {
        console.log(res)
        this.setData({
          alumniBooks: res.result.data
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  /**
   * 处理tab切换时改变索引
   */
  handleTabChange(e) {
    const index = e.detail.index
    this.setData({
      tabActiveIndex: index
    })
  },
  /**
   * 处理swiper切换时改变索引
   */
  handleSwiperChange(e) {
    const index = e.detail.current
    this.setData({
      tabActiveIndex: index
    })
  },
  handleCreateBook(e) {
    wx.navigateTo({
      url: '/pages/book-save/index'
    })
  }
})