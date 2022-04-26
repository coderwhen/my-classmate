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
    // 搜索关键词
    keywords: '',
    // 联想结果
    suggests: [],
    // 搜索结果
    searchSongs: [],
    // 是否加载中
    searchLoading: false,
    // 音乐列表
    musicList: [],
    // 播放列表
    playList: [],
    // 当前播放
    currentMusic: 0,
    current: 0
  },
  onReady() {
    this.musicAud = wx.createAudioContext('audio')
  },
  _getMusicSearchSuggest: throttle(function (keywords) {
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
    keywords.length > 0 && this._getMusicSearchSuggest(e.detail.value)
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
  handleJoin(e) {
    const music = e.detail
    const musicList = this.data.musicList
    const musicItem = musicList.find(item => item.id === music.id)
    if(musicItem) {
      wx.showToast({
        title: '已存在该歌曲！',
      })
      return
    }
    this.setData({
      musicList: musicList.concat(music)
    })
  },
  handleMusicClick(e) {
    console.log(e)
    const id = e.detail.id
    getMusicUrl({
      id
    }).then(res => {
      console.log(res)
      this.setData({
        playList: this.data.playList.concat(res.result.body.data)
      }, () => {
        this.musicAud.play()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  handleDeleteMusic(e) {
    const music = e.detail
    const musicList = this.data.musicList
    const deleteIndex = musicList.findIndex(item => music.id === item.id)
    if(deleteIndex === -1) return
    musicList.splice(deleteIndex, 1)
    this.setData({
      musicList
    })
  },
  handleMusicEnd(e) {
    this.setData({
      currentMusic: (this.data.currentMusic + 1) % this.data.musicList.length
    }, () => {
      this.musicAud.play()
    })
  },
  handleChooseSuccess(e) {
    const pages = getCurrentPages()
    const prvePage = pages[pages.length - 2]
    prvePage.setData({
      musicList: this.data.musicList
    }, () => {
      wx.navigateBack()
    })
  }
})