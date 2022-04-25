// pages/invitation/index.js
Page({
    data: {

    },
    onLoad(e) {
      if(e.id) {
        this.setData({
          type: 0
        })
      }
    },
    onShareAppMessage() {
      return {
        title: '同学帮我写个同学录吧！',
        path: '/pages/invitation/index?id=1'
      }
    },
    onShareTimeline() {
      return {
        title: '同学帮我写个同学录吧！',
        path: '/pages/invitation/index?id=1'
      }
    }
})