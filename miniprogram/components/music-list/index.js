// components/music-list/index.js
Component({
  properties: {
    musicList: {
      type: Array,
      value: []
    },
    iconList: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleIconClick(e) {
      console.log(e)
      const {music, event} = e.target.dataset
      if(event && event.length > 0) {
        this.triggerEvent(event, music, {})
      }
    }
  }
})
