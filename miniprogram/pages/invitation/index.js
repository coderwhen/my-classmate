// pages/invitation/index.js
Page({
  data: {
    
  },
  onLoad(e) {
    if (e.id) {
      this.setData({
        type: 0
      })
    }

  },
  onReady() {
    wx.getImageInfo({
      src: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/yq.png'
    }).then(res => {
      console.log(res)
      this.data.bg = res.path
      const ctx = wx.createCanvasContext('cav')
      console.log(ctx)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 400, 500)
      // ctx.moveTo(100, 100)
      ctx.drawImage(this.data.bg, 0, 0, 300, 300)
      ctx.fillStyle = "#222222"
      ctx.setFontSize(20)
      ctx.setFontSize(20)
      ctx.fillText('Hello', 20, 20)
      ctx.fillText('MINA', 100, 100)
      ctx.fillText("长按识别二维码", 15, 350)
      ctx.draw()
    })

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