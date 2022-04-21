// pages/message/index.js
Page({
    data: {
        tabs: ['留言通知','邀请通知'],
        tabActiveIndex: 0
    },
    onLoad(e) {
        console.log(e)
    },
    onShow(e) {
        console.log(e)
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