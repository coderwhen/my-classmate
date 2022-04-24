// pages/choose-music/index.js
Page({
    data: {
        keywords: '',
        suggests: [],
        searchSongs: [],
        musicList: [],
        currentMusic: 0
    },
    onReady() {
        this.musicAud = wx.createAudioContext('audio')
    },
    keywordInput(e) {
        // console.log(e)
        this.setData({
            keywords: e.detail.value
        })
        // wx.cloud.callFunction({
        //     name: 'classmate',
        //     data: {
        //         type: 'music-suggest',
        //         keywords: e.detail.value
        //     }
        // }).then(res => {
        //     console.log(res)
        //     this.setData({
        //         suggests: res.result.body.result.allMatch
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
    },
    handleConfirm() {
        wx.cloud.callFunction({
            name: 'classmate',
            data: {
                type: 'music-suggest',
                keywords: this.data.keywords
            }
        }).then(res => {
            console.log(res)
            this.setData({
                suggests: res.result.body.result.allMatch
            })
        }).catch(err => {
            console.log(err)
        })
    },
    handleTipsClick(e) {
        console.log(e)
        const keywords = e.currentTarget.dataset.tip.keyword
        wx.cloud.callFunction({
            name: 'classmate',
            data: {
                type: 'music-result',
                keywords
            }
        }).then(res => {
            console.log(res)
            this.setData({
                searchSongs: res.result.body.result.songs
            })
        }).catch(err => {
            console.log(err)
        })
    },
    handleMusicClick(e) {
        const id = e.currentTarget.dataset.id
        wx.cloud.callFunction({
            name: 'classmate',
            data: {
                type: 'music-url',
                id: id
            }
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