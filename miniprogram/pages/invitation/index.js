// pages/invitation/index.js
const {
  getClassMateInvitation,
  getClassMateCode
} = require('../../api/index')

Page({
  data: {
    bookId: '',
    userInfo: {},
    loading: true,
    code: ''
  },
  onLoad(e) {
    if (e.scene) {
      this.setData({
        type: 0,
        bookId: e.scene
      })
    }
    getClassMateInvitation({
      _id: e.scene
    }).then(res => {
      console.log(res)
      const {result} = res
      const {users: [userInfo]} = result.list[0]
      this.setData({
        userInfo
      })
    })
    .finally(_ => {
      this.setData({
        loading: false
      })
    })
    .catch(err => {
      console.log(err)
    })
    getClassMateCode({
      scene: e.scene
    }).then(res => {
      const { buffer } = res.result
      console.log(buffer)
      const base64 = wx.arrayBufferToBase64(buffer)
      this.setData({
        code: base64
      })
      console.log(base64)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
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
      path: '/pages/invitation/index?scene=' + this.data.bookId
    }
  },
  onShareTimeline() {
    return {
      title: '同学帮我写个同学录吧！',
      path: '/pages/invitation/index?scene=' + this.data.bookId
    }
  },
  onSaveImage(e) {
    
  }
})