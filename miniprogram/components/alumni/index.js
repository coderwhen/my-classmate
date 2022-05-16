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
      }
    }
})
