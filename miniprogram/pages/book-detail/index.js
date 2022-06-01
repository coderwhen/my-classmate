// pages/book-detail/index.js
const {
  getClassMateList
} = require('../../api/index')

Page({
  data: {
    option1: [
      { text: '筛选', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '时间升序', value: 'b' },
      { text: '时间降序', value: 'c' },
    ],
    keyword: '',
    value1: 0,
    value2: 'a',
    bookList: [],
    query: {
      page: 0,
      pageSize: 2
    },
    sLoading: true,
    loading: true,
    nohave: false,
    lower: true,
    dialog: {
      show: false,
      title: '',
      message: ''
    }
  },
  onLoad(options) {
    console.log(options)
    this._getClassMateList()
  },
  _getClassMateList() {
    const { bookId } = this.options
    const { query } = this.data
    getClassMateList({
      bookId,
      query
    }).then(res => {
      console.log(res)
      const data = res.result.data
      this.setData({
        bookList: [...this.data.bookList, ...res.result.data],
        ['query.page']: this.data.query.page + 1,
        lower: false,
        nohave: data.length === 0,
        loading: false
      })
    }).catch(err => {
      console.log(err)
    }).finally(_ => {
      this.setData({
        loading: false,
        sLoading: false
      })
    })
  },
  handleChange(e) {
    console.log(e)
  },
  handleDownPage(e) {
    this._getClassMateList()
  },
  handleToLower(e) {
    // 碰到底正在请求数据
    if (this.data.lower) return
    // 没有更多了
    if (this.data.nohave) return
    this.setData({
      loading: true
    })
    this._getClassMateList()
  },
  handleToShare(e) {
    wx.navigateTo({
      url: '/pages/invitation/index?scene='.concat(this.options.bookId),
    })
  },
  handleShowMoreMessage(e) {
    console.log(e)
    const { msg, title } = e.target.dataset
    this.setData({
      dialog: {
        show: true,
        title,
        message: msg
      }
    })
  },
  handleHideDialog(e) {
    this.setData({
      ['dialog.show']: false
    })
  }
})