// components/tab/index.js
Component({
    properties: {
        tabs: {
            type: Array,
            value: []
        },
        currentIndex: {
            type: Number,
            value: 0
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
        handleTabItemClick(e) {
            const {index} = e.currentTarget.dataset
            if(this.data.currentIndex != index) {
                this.setData({
                    currentIndex: index
                })
                this.triggerEvent('change', {index}, {})
            }
        }
    }
})
