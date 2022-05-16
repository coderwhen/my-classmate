// pages/book-save/index.js
const {
  addClassMate,
  updateClassMateCover,
} = require('../../api/index')
const {
  getGuid
} = require('../../utils/uuid')
Page({
  data: {
    coverImageUrl: '',
    title: '',
    description: '',
    musicList: []
  },
  onLoad(e) {
    // this.isUpload = false
  },
  handleChooseMusic(e) {
    wx.navigateTo({
      url: '/pages/choose-music/index'
    }).catch(err => {
      console.log(err)
    })
  },
  handleChooseImage(e) {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res)
        this.setData({
          coverImageUrl: res.tempFilePaths[0]
        })
      },
    })
  },
  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  handleDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  async handleSuccess(e) {
    if (this.isUpload) return
    if (this.data.title.length === 0) {
      wx.showToast({
        title: '请输入同学录标题',
        icon: 'none'
      })
      return
    }
    if (this.data.description.length === 0) {
      wx.showToast({
        title: '请输入同学录备注',
        icon: 'none'
      })
      return
    }
    // wx.cloud.database().serverDate
    const classmate = {
      title: this.data.title,
      description: this.data.description,
      musicList: this.data.musicList
    }

    try {
      wx.showLoading({
        title: '创建同学录中',
        mask: true
      })
      
      const upload = await wx.cloud.uploadFile({
        cloudPath: 'cover/' + getGuid() + '.png',
        filePath: this.data.coverImageUrl
      })


      classmate.cover = upload.fileID

      const res = await addClassMate(classmate)
      
      wx.showLoading({
        title: '上传封面中',
        mask: true
      })
     

      wx.showLoading({
        title: '创建成功',
        mask: true
      })

      setTimeout(() => {
        // wx.hideLoading()
        wx.redirectTo({
          url: '/pages/invitation/index',
        })
      }, 2000)

    } catch(e) {
      console.log(e)
      wx.hideLoading()
      wx.showToast({
        title: '发生错误了',
      })
    } 
   

    this.isUpload = false
  }
})