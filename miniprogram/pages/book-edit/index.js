// pages/book-edit/index.js
const {
  addClassMateList
} = require('../../api/index')
const {
  getGuid
} = require('../../utils/uuid')


Page({
  data: {
    fields: {},
    fileList: []
  },
  onLoad(options) {
    console.log(options)
  },
  afterRead(e) {
    const { detail } = e
    this.setData({
      fileList: [...this.data.fileList, ...detail.file]
    })
  },
  onInput(e) {
    const { field } = e.target.dataset
    const { value } = e.detail
    this.setData({
      [`fields.${field}`]: value
    })
  },
  handleEditSuccess(e) {
    const { id: _id } = this.options
    const { fields, fileList } = this.data
    const payload = {
      _id,
      fields
    }
    addClassMateList(payload).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  uploadFile({filePath, cloudPath = ""}) {
    return wx.cloud.uploadFile({
      filePath: '',
      cloudPath: ''
    })
  }
})