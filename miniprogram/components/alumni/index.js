// components/alumni/index.js
Component({
    properties: {
      classMate: {
        type: Object,
        value: {}
      }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
      handleShareClick(e) {
        wx.navigateTo({
          url: '/pages/invitation/index?scene='.concat(this.data.classMate._id),
        })
      },
      handleToDetail(e) {
        wx.navigateTo({
          url: '/pages/book-detail/index?bookId='.concat(this.data.classMate._id),
        })
      },
      handleCoverError(e) {
        console.log(e)
        this.setData({
          [`classMate.cover`]: 'cloud://wwxp-2krlz.7777-wwxp-2krlz-1301102203/cover/0ab5303b626a970a00abd9b65e749f14.png'
        })
      }
    }
})
