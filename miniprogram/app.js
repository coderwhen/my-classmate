// app.js
App({
  globalData: {
    isLogin: false,
    userInfo: null,
    _tabPage: {
      book: 0,
      message: 0
    }
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
        env: wx.cloud.DYNAMIC_CURRENT_ENV
      })
    }

    const userInfo = wx.getStorageSync('_userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLogin = true
    }
    this.onCheckUpdate()
  },
  onCheckUpdate(e) {
    if(!wx.canIUse('getUpdateManager')) {
      return
    }
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  // 保存图片到手机
  onSaveToPhone(image) {
    let that = this
    return new Promise((resolve, reject) => {
      that.getSetting().then((res) => {
        // 判断用户是否授权了保存到本地的权限
        if (!res.authSetting['scope.writePhotosAlbum']) {
          that.authorize().then(() => {
            that.saveImageToPhotosAlbum(image).then(() => {
              resolve()
            })
          }).catch(() => {
            that.showModal(image).then(() => {
              resolve()
            })
          })
        } else {
          that.saveImageToPhotosAlbum(image).then(() => {
            resolve()
          })
        }
      })
    })
  },
  //打开设置，引导用户授权
  onOpenSetting(image) {
    var that = this
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success: (res) => {
          if (res.authSetting['scope.writePhotosAlbum']) {
            that.onSaveToPhone(image).then(() => {// 接受授权后保存图片
              resolve()
            })
          }
        }
      })
    })
  },
  // 获取用户已经授予了哪些权限
  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          resolve(res)
        }
      })
    })
  },
  // 发起首次授权请求
  authorize() {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success: () => {
          resolve()
        },
        fail: res => { //这里是用户拒绝授权后的回调
          reject()
        }
      })
    })
  },
  // 保存图片到系统相册
  saveImageToPhotosAlbum(saveUrl) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: saveUrl,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            duration: 1000,
          })
          resolve()
        }
      })
    })
  },
  // 弹出模态框提示用户是否要去设置页授权
  showModal(image) {
    var that = this
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '检测到您没有打开保存到相册的权限，是否前往设置打开？',
        success: (res) => {
          if (res.confirm) {
            that.onOpenSetting(image).then(() => {// 打开设置页面
              resolve()
            })
          }
        }
      })
    })
  }
})

