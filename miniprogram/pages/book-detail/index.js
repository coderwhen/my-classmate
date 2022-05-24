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
      pageSize: 5
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
      this.setData({
        bookList: [...this.data.bookList, ...res.result.data],
        ['query.page']: this.data.query.page + 1
      })
    }).catch(err => {
      console.log(err)
    })
  },
  handleChange(e) {
    console.log(e)
  },
  handleDownPage(e) {
    this._getClassMateList()
  }
})