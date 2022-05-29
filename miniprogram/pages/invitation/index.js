// pages/invitation/index.js
const {
  getClassMateInvitation,
  getClassMateCode,
  getMusicUrl
} = require('../../api/index')
const app = getApp()
Page({
  data: {
    bookId: '',
    userInfo: {},
    loading: true,
    error: false,
    code: '',
    musicList: [],
    playList: [],
    currentMusic: -1,
    show: false,
    play: false,
    tempFilePath: ''
  },
  onLoad(e) {
    // 创建音乐元素
    const music = this.music = wx.createInnerAudioContext()
    music.onPlay(_ => {
      this.handleMusicPlay()
    })
    music.onPause(_ => {
      this.handleMusicPause()
    })
    music.onError(_ => {
      wx.showToast({
        title: '音乐出现了问题，待会再试试吧！',
        icon: 'none'
      })
    })
    if (e.scene) {
      this.setData({
        type: 0,
        bookId: e.scene
      })
    }
    const classMateTask = getClassMateInvitation({
      _id: e.scene
    })

    const classMateCodeTask = getClassMateCode({
      scene: e.scene
    })
    Promise.all([classMateTask, classMateCodeTask])
      .then(([classmate, qrcode]) => {
        console.log(classmate, qrcode)
        const { result: { userInfo, self, musicList } } = classmate
        const { fileID } = qrcode.result.data
        this.setData({
          userInfo,
          self,
          musicList,
          code: fileID
        }, _ => {
          this._getMusicList()
          this._createImage()
        })
      })
      .catch(err => {
        this.setData({
          error: true
        })
      })
      .finally(_ => {
        this.setData({
          loading: false
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
    if (this.data.tempFilePath.length === 0) {
      this._createImage().then(res => {
        app.onSaveToPhone(this.data.tempFilePath)
      })

      return
    }

    app.onSaveToPhone(this.data.tempFilePath)

    // wx.saveImageToPhotosAlbum({
    //   filePath: this.data.tempFilePath,
    // })
  },
  onUnload(e) {
    this.music.pause()
  },
  _getMusicList(e) {
    const ids = this.data.musicList.map(music => music.id).join(',')
    getMusicUrl({
      id: ids
    }).then(res => {
      const { data: playList = [] } = res.result.body
      console.log(res)
      this.setData({
        playList,
        currentMusic: 0
      }, _ => {
        if(playList.length > 0) {
          this.music.src = playList[0].url
          this.music.play()
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  _createImage(e) {
    const imageTask = [this.data.code, this.data.userInfo.avatarUrl, 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/yq.png'].map(url => wx.getImageInfo({
      src: url,
    }))
    return Promise.all(imageTask).then(([{ path: qrcode }, { path: avatarUrl }, { path: bg }]) => {
      return new Promise((reslove, reject) => {
        const ctx = wx.createCanvasContext('cav', this)
        // 绘制背景
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, 400, 500)
        // 绘制背景图片
        ctx.drawImage(bg, 0, 0, 345, 360)
        ctx.fillStyle = "#fff"
        // ctx.fillRect(15, 15, 50, 50)
        ctx.drawImage(avatarUrl, 15, 15, 50, 50)
        ctx.setFontSize(16)
        ctx.fillText("懒羊羊睡醒了", 15, 90)
        ctx.setFontSize(26)
        ctx.fillText("你那么可爱", 15, 250)
        ctx.fillText("帮我写个同学录吧!", 15, 285)
        ctx.setFontSize(20)
        ctx.fillStyle = "#000"
        ctx.fillText("长按识别二维码", 15, 410)
        // ctx.fillRect(270, 370, 40, 40)
        ctx.drawImage(qrcode, 270, 370, 60, 60)
        ctx.draw(true, () => {
          wx.canvasToTempFilePath({
            canvasId: 'cav',
            success: (res) => {
              setTimeout(() => {
                console.log(res.tempFilePath)
                this.setData({
                  tempFilePath: res.tempFilePath
                }, () => {
                  reslove()
                })
              }, 200)
            }
          })
        })
      })
    })

  },
  handleLookLook(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  handleGiveDo(e) {
    const isLogin = getApp().globalData.isLogin
    if (isLogin) {
      wx.navigateTo({
        url: '/pages/book-edit/index?bookId='.concat(this.data.bookId),
      })
    } else {
      wx.showToast({
        title: '只有登录才能填写Ta的同学录哟！',
        icon: 'none',
        duration: 2000
      })

      setTimeout(_ => {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }, 1500)
    }
  },
  handleFirQ(e) {
    wx.showToast({
      title: '点击右上角三个点，分享到朋友圈。',
      icon: 'none',
      duration: 2000
    })
  },
  onClose(e) {
    this.setData({
      show: false
    })
  },
  onOpen(e) {
    this.setData({
      show: true
    })
  },
  handleMusicClick(e) {
    const music = e.target.dataset.song
    const index = this.data.playList.findIndex(m => m.id === music.id)
    this.setData({
      currentMusic: index
    }, _ => {
      const url = this.data.playList[this.data.currentMusic].url
      if (this.music.src !== url) {
        this.music.src = url
      }
      this.music.play()
    })
  },
  handleMusicPause(e) {
    this.music.pause()
    // this.musicAud.pause()
    this.setData({
      currentMusic: -1,
      play: false
    })
  },
  handleMusicPlay(e) {
    this.setData({
      play: true
    })
  },
  handleTry(e) {
    console.log(e)
    new Promise((reslove, reject) => {
      const query = wx.createSelectorQuery()
      query.select('#cav1')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          const canvas = res[0].node
          canvas.width = 500
          canvas.height = 500
          const ctx = canvas.getContext('2d')
          const task = await wx.getImageInfo({
            src: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/wxapp/yq.png',
          })
          const bg = canvas.createImage()
          bg.src = task.path
          bg.onload = function () {
            ctx.drawImage(bg, 0, 0, 200, 200)
          }
          // wx.canvasToTempFilePath({
          //   canvas: canvas,
          //   success: r => {
          //     console.log(r)
          //     app.onSaveToPhone(r.tempFilePath)
          //   }
          // })
        })

    }).then(res => {

    })


  }
})