// pages/book-edit/index.js
const {
  addClassMateList,
  getClassMateDetail
} = require('../../api/index')
const {
  getGuid
} = require('../../utils/uuid')


Page({
  data: {
    loading: true,
    fields: {},
    fileList: [],
    now: new Date().getTime(),
    show: false
  },
  onLoad(options) {
    const { bookId } = options
    getClassMateDetail({
      bookId
    }).then(res => {
      const { result } = res
      if(result.code === 200) {

        const { data: { fields, fileList } } = result
        this.setData({
            fields,
            fileList
        })
      }

    }).catch(err => {
      console.log(err)
    }).finally(_ => {
      this.setData({
        loading: false
      })
    })
  },
  afterRead(e) {
    const fileList = e.detail.file.map(file => {
      return {
        url: file.url,
        status: 'uploading',
        guid: getGuid()
      }
    })

    this.setData({
      fileList: [...this.data.fileList, ...fileList]
    })

    const promiseTask = fileList.map(file => this.uploadFilePromise(file))
    Promise.all(promiseTask).then(files => {
      console.log(files)
      const fileList = this.data.fileList
      files.forEach(file => {
        const fileIndex = fileList.findIndex(f => f.guid === file.guid)
        console.log(fileIndex)
        fileList[fileIndex] = {
          ...file,
          status: 'done'
        }
      })
      this.setData({
        fileList
      })
    })
  },
  onInput(e) {
    const { field } = e.target.dataset
    const { value } = e.detail
    this.setData({
      [`fields.${field}`]: value
    })
  },
  handleDate(e) {
    const { value } = e.detail
    // console.log(value)
    const chooseTime = new Date(value)
    if(this.data.now - chooseTime.getTime() < 0) {
      wx.showToast({
        title: '你还没出生呢',
        icon: 'error'
      })
      this.setData({
        [`fields.bir`]: this.data.fields.bir
      })
      return
    }
    this.setData({
      [`fields.bir`]: value
    })
  },
  handleImageDelete(e) {
    const index = e.detail.index
    const { fileList } = this.data
    this.setData({
      fileList: 
        fileList.filter((f, i) => i != index)
    })
  },
  handleEditSuccess(e) {
    const { fields, fileList } = this.data
    const up = fileList.filter(file => file.status !== 'done')
    if(up.length > 0) {
      return wx.showToast({
        title: '请等待图片上传完成',
        icon: 'error',
        duration: 1000
      })
    }
    if(fields.name.length === 0) {
      return wx.showToast({
        title: '您还没填写姓名',
        icon: 'error',
        duration: 1000
      })
    }
    if(fields.bir.length === 0) {
      return wx.showToast({
        title: '您还没填写生日',
        icon: 'error',
        duration: 1000
      })
    }

    if(fields.phone.length === 0) {
      return wx.showToast({
        title: '您还没填写手机',
        icon: 'error',
        duration: 1000
      })
    }
    
    wx.showLoading({
      title: '留言中',
      mask: true
    })

    const { bookId, bookListId } = this.options
    const payload = {
      bookId,
      bookListId,
      fields,
      fileList
    }
    addClassMateList(payload).then(res => {
      wx.navigateTo({
        url: '/pages/book-success/index',
      })
    }).catch(err => {
      wx.showToast({
        title: '发生错误，稍后再试试吧！',
        icon: 'error'
      })
    }).finally(_ => {
      wx.hideLoading()
    })
  },
  handleUploader(e) {
    const fileList = this.data.fileList.filter(file => file.status)
    if (!fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(file.url, 'classmate/' + getGuid() + '.png'));
      Promise.all(uploadTasks)
      .then(data => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = data.map(item => ({ url: item.fileID }));
        this.setData({ cloudPath: data, fileList: newFileList });
      })
      .catch(e => {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(e);
      });
    }
  },
  uploadFilePromise(file, cloudPath = "classmate") {
    return wx.cloud.uploadFile({
      filePath: file.url,
      cloudPath: cloudPath + '/' + file.guid + '.png'
    }).then(res => {
      file.url = res.fileID
      file.status = 'done'
      return Promise.resolve(file)
    })
  },
  handleMusicClick(e) {
    this.setData({
      show: true
    })
  },
  onClose(e) {
    this.setData({
      show: false
    })
  }
})