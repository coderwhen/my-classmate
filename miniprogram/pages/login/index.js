// pages/login/index.js
const app = getApp()
Page({
    data: {

    },
    handleUserLogin() {
        wx.getUserProfile({
          desc: 'desc',
        }).then(res => {
            console.log(res)
            wx.cloud.callFunction({
                name: 'classmate',
                data: {
                    type: 'login',
                    userInfo: res.userInfo
                }
            }).then(resalt => {
                // console.log(res)
                app.globalData.userInfo = res.userInfo
                wx.navigateBack()
                wx.setStorageSync('_userInfo', res.userInfo)
                // if(resalt)
            })
        }).catch(err => {})
    }
})