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
    // 历史搜索
    historyList: [],
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
    current: 0,
    show: false
  },
  onLoad() {
    const historyList = wx.getStorageSync('_historyList')
    const pages = getCurrentPages()
    const prev = pages[pages.length - 2]
    console.log(prev)
    const musicList = prev.data.musicList
    if (musicList) {
      this.setData({
        musicList
      })
    }
    if (historyList) {
      this.setData({
        historyList
      })
    }
  },
  onReady() {
    this.musicAud = wx.createAudioContext('audio')
  },
  onUnload() {
    wx.setStorageSync('_historyList', this.data.historyList)
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
  /**
   * 用户输入搜索关键词
   * @author coderwhen
   * @date 2022-5-25
   * @param {} e 
   */
  keywordInput(e) {
    const keywords = e.detail
    this.setData({
      keywords,
      current: keywords.length > 0 ? 1 : 0
    })
    console.log(keywords)
    keywords.length > 0 && this._getMusicSearchSuggest(keywords)
  },
  handleConfirm() {
    const keywords = this.data.keywords
    if(keywords.length === 0) {
      return wx.showToast({
        title: '请输入内容搜索内容！',
        icon: 'none',
        duration: 1500
      })
    }
    const { historyList } = this.data
    const history = historyList.findIndex(item => item === keywords)
    if (history === -1) {
      historyList.push(keywords)
    }
    this.setData({
      current: 2,
      searchLoading: true,
      keywords,
      historyList
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
  handleTipsClick(e) {
    const keywords = e.currentTarget.dataset.tip.keyword
    const { historyList } = this.data
    const history = historyList.findIndex(item => item === keywords)
    if (history === -1) {
      historyList.push(keywords)
    }
    this.setData({
      current: 2,
      searchLoading: true,
      keywords,
      historyList
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
    const music = e.target.dataset.song
    const musicList = this.data.musicList
    const musicItem = musicList.find(item => item.id === music.id)
    if (musicItem) {
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
    const { playList } = this.data
    const music = e.target.dataset.song
    const id = music.id
    const musicItem = playList.findIndex(item => item.id === music.id)
    if (musicItem > -1) {
      this.setData({
        currentMusic: musicItem
      }, () => {
        this.musicAud.play()
      })
      return
    }
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
    const music = e.target.dataset.song
    const musicList = this.data.musicList
    const deleteIndex = musicList.findIndex(item => music.id === item.id)
    if (deleteIndex === -1) return
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
    wx.showModal({
      title: '部分歌曲可能是试听版，请先试听一遍！',
      confirmColor: '#0FCEED'
    }).then(res => {
      if(!res.confirm) {return}
      const pages = getCurrentPages()
      const prvePage = pages[pages.length - 2]
      prvePage.setData({
        musicList: this.data.musicList
      }, () => {
        wx.navigateBack()
      })
    })

  },
  onClose(e) {
    this.setData({
      show: false
    })
  },
  handleOpen(e) {
    this.setData({
      show: true
    })
  },
  handleMusicPause(e) {
    this.setData({
      currentMusic: -1
    })
    this.musicAud.pause()
  }
})