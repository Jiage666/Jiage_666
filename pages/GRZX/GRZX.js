// pages/GRZX/GRZX.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onLoad: function(options) {

    if (!app.globalData.isHide) {
      wx.navigateTo({
        url: '/pages/GRZX/login/login',
      })

    }
    //缓存中获取login中的userInfo数据
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        app.globalData.userInfo = res.data
        console.log()
        console.log(app.globalData.userInfo.nickName)
        
        // this.setData({
        //   userInfo: res.data
        // })
        // this.setData({
        //   userInfo: res.userInfo
        // })
      }
    })
    

  },
  onReady: function() {

    console.log(app.globalData.userInfo.nickName)
    this.setData({
      userInfo: app.globalData.userInfo
    })

    console.log(this.data.userInfo.avatarUrl)


  }
})