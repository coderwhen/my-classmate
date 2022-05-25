// pages/message/index.js
const app = getApp()
Page({
    data: {
        tabs: ['留言通知', '邀请通知'],
        tabActiveIndex: 0,
        isLogin: false
    },
    onShow(e) {
        if (app.globalData._tabPage.book != this.data.tabActiveIndex) {
            this.setData({
                tabActiveIndex: app.globalData._tabPage.book
            })
        }
        this.setData({
            isLogin: app.globalData.isLogin
        })
    },
    handleTabChange(e) {
        const index = e.detail.index
        this.setData({
            tabActiveIndex: index
        })
    },
    handleSwiperChange(e) {
        const index = e.detail.current
        this.setData({
            tabActiveIndex: index
        })
    },
    handleToLogin(e) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
})