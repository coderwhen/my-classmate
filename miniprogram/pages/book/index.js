// pages/book/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ['我的同学录','我参加的'],
        tabActiveIndex: 0
    },
    onShow(e) {
        if(app.globalData._tabPage.book != this.data.tabActiveIndex) {
            this.setData({
                tabActiveIndex: app.globalData._tabPage.book
            })
        }
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
    }
})