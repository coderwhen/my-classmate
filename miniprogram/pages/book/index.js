// pages/book/index.js
const app = getApp()
const {
  getClassMate
} = require('../../api/index')
Page({
  data: {
    alumniBooks: [],
    loading: true,
    error: false,
    isLogin: false
  },
  onShow(e) {
    const data = {}
    // if (app.globalData._tabPage.book != this.data.tabActiveIndex) {
    //   data.tabActiveIndex = app.globalData._tabPage.book
    // }
    this.setData({
      // ...data,
      isLogin: app.globalData.isLogin
    })
    if (app.globalData.isLogin) {
      this.setData({
        loading: true
      })
      wx.showLoading({
        title: '加载同学录中...',
        mask: true
      })
      getClassMate().then(res => {
        console.log(res)
        this.setData({
          alumniBooks: res.result.data
        })
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        wx.hideLoading()
        this.setData({
          loading: false
        })
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
    const { alumniBooks, loading } = this.data
    if(loading) {
      wx.showToast({
        title: '马上就准备好了，请稍等片刻！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if(alumniBooks.length >= 3) {
      wx.showToast({
        title: '您最多只能创建3个同学录哟！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.requestSubscribeMessage({
      tmplIds: ['6CVbCY1SRcVuhvsCTtPzBcmUXFsZWv0HS2b4tRdlJ4U'],
    }).then(res => {
      console.log(res)
      if(res['6CVbCY1SRcVuhvsCTtPzBcmUXFsZWv0HS2b4tRdlJ4U'] === 'accept') {
        wx.navigateTo({
          url: '/pages/book-save/index'
        })
      } else {
        wx.showToast({
          title: '客官请三思！',
          icon: 'error'
        })
      }
    }).catch(err => {
      console.log(err)
    })
    
  },
  handleToShare(e) {
    this.setData({
      tabActiveIndex: 0
    })
  },
  handleToLogin(e) {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
})