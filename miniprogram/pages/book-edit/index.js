// pages/book-edit/index.js
Page({
  data: {
    fileList: []
  },
  onLoad(options) {
    console.log(options)
  },
  afterRead(e) {
    console.log(e)
    const {detail} = e
    this.setData({
      fileList: [...this.data.fileList, detail.file]
    })
  }
})