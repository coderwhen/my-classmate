// pages/choose-music/index.js
const {
  throttle
} = require('../../utils/index')
const {
  getMusicSearchSuggest,
  getMusicSearch,
  getMusicUrl
} = require('../../api/index')

Page({
    data: {
        keywords: '',
        suggests: [],
        searchSongs: [],
        searchLoading: false,
        musicList: [],
        currentMusic: 0,
        current: 0
    },
    onReady() {
        this.musicAud = wx.createAudioContext('audio')
    },
    _getMusicSearchSuggest: throttle(function (keywords){
      getMusicSearchSuggest({
        keywords
      }).then(res => {
        console.log(res)
        this.setData({
            suggests: res.result.body.result.allMatch
        })
      }).catch(err => {
          console.log(err)
      })
    }),
    keywordInput(e) {
        const keywords = e.detail.value
        this.setData({
            keywords,
            current: keywords.length > 0 ? 1 : 0
        })
        this._getMusicSearchSuggest(e.detail.value)
    },
    handleConfirm() {
        
    },
    handleTipsClick(e) {
        const keywords = e.currentTarget.dataset.tip.keyword
        this.setData({
          current: 2,
          searchLoading: true,
          keywords
        })
        getMusicSearch({
          keywords
        }).then(res => {
          console.log(res)
          this.setData({
              searchSongs: res.result.body.result.songs,
          })
        }).finally(() => {
          this.setData({
            searchLoading: false
          })
        }).catch(err => {
            console.log(err)
        })
    },
    handleMusicClick(e) {
        const id = e.currentTarget.dataset.id
        getMusicUrl({
          id
        }).then(res => {
          console.log(res)
          this.setData({
            musicList: this.data.musicList.concat(res.result.body.data)
          }, () => {
              this.musicAud.play()
          })
        }).catch(err => {
          console.log(err)
        })
    },
    handleMusicEnd(e) {
        this.setData({
            currentMusic: (this.data.currentMusic + 1) % this.data.musicList.length
        }, () => {
            this.musicAud.play()
        })
    }
})