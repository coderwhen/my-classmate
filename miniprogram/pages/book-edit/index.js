// pages/book-edit/index.js
Page({
  data: {
    fileList: []
  },
  onLoad(options) {

  },
  onReady() {

  },
  afterRead(e) {
    console.log(e)
    const {detail} = e
    this.setData({
      fileList: [...this.data.fileList, detail.file]
    })
  }
})