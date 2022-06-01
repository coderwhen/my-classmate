// pages/book-save/index.js
const {
  addClassMate,
  getClassMateSave
} = require('../../api/index')
const {
  getGuid
} = require('../../utils/uuid')
Page({
  data: {
    loading: true,
    error: false,
    cover: {
      url: '',
      status: ''
    },
    title: '',
    description: '',
    musicList: [],
    show: false
  },
  onLoad(e) {
    console.log(e)
    // this.isUpload = false
    const { bookId } = e
    if (bookId) {
      this._getClassMateSave()

    } else {
      this.setData({
        loading: false
      })
    }
    wx.setNavigationBarTitle({
      title: bookId ? '修改同学录': '创建同学录',
    })
  },
  _getClassMateSave() {
    getClassMateSave({
      bookId: this.options.bookId
    }).then(res => {
      if (res.result.code === 200) {
        const { data } = res.result
        this.setData({
          title: data.title,
          description: data.description,
          musicList: data.musicList,
          cover: data.cover,
          error: false
        })
      }
    }).catch(err => {
      this.setData({
        error: true
      })
      // console.log(err)
    }).finally(_ => {
      // console.log(_)
      this.setData({
        loading: false
      })
    })
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
          cover: {
            url: res.tempFilePaths[0],
            status: 'upload'
          }
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
  handleShowMusic(e) {
    this.setData({
      show: true
    })
  },
  handleHideMusic(e) {
    this.setData({
      show: false
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

    const classmate = {
      title: this.data.title,
      description: this.data.description,
      musicList: this.data.musicList,
    }


    try {
      const { bookId } = this.options
      if (bookId) {
        classmate.bookId = bookId
      }
      wx.showLoading({
        title: bookId ? '修改同学录' : '创建同学录',
        mask: true
      })

      if (this.data.cover.status === 'upload') {
        wx.showLoading({
          title: '上传封面中',
          mask: true
        })

        const upload = await wx.cloud.uploadFile({
          cloudPath: 'cover/' + getGuid() + '.png',
          filePath: this.data.cover.url
        })

        console.log(upload)

        classmate.cover = {
          ...this.data.cover,
          url: upload.fileID,
          status: 'done'
        }
      }


      const { result } = await addClassMate(classmate)
      const { msg, code } = result

      wx.showToast({
        title: msg,
        icon: 'none',
        mask: true,
        duration: 2000
      })

      setTimeout(() => {
        wx.hideLoading()
        if(code === 200) {
          wx.redirectTo({
            url: '/pages/invitation/index?scene='.concat(result.data.bookId),
          })
        } else {
          wx.navigateBack()
        }
      }, 1000)

    } catch (e) {
      console.log(e)
      wx.hideLoading()
      wx.showToast({
        title: '发生错误了',
      })
    }


    this.isUpload = false
  }
})