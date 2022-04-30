// pages/invitation/index.js
Page({
  data: {
    loading: false
  },
  onLoad(e) {
    if (e.id) {
      this.setData({
        type: 0
      })
    }
    console.log(e)
    // setTimeout(() => {
    //   this.setData({
    //     loading: false
    //   })
    // }, 2000)
  },
  onReady() {
    wx.getImageInfo({
      src: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/yq.png'
    }).then(res => {
      console.log(res)
      this.data.bg = res.path
      const ctx = wx.createCanvasContext('cav')
      // 绘制背景
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, 0, 400, 500)
      // 绘制背景图片
      ctx.drawImage(this.data.bg, 0, 0, 320, 360)
      ctx.fillStyle = "#fff"
      ctx.fillRect(15, 15, 50, 50)
      ctx.setFontSize(16)
      ctx.fillText("懒羊羊睡醒了", 15, 90)
      ctx.setFontSize(26)
      ctx.fillText("你那么可爱", 15, 270)
      ctx.fillText("帮我写个同学录吧!", 15, 305)
      ctx.setFontSize(16)
      ctx.fillStyle = "#000"
      ctx.fillText("长按识别二维码", 15, 400)
      ctx.fillRect(270, 370, 40, 40)
      ctx.draw(true, () => {
        wx.canvasToTempFilePath({
          canvasId: 'cav',
          success: (res) => {
            console.log(res.tempFilePath)
            this.setData({
              tempFilePath: res.tempFilePath
            })
          }
        })
      })
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
  },
  onSaveImage(e) {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath
    }).then(res => {
      console.log(res)
    })
  }
})