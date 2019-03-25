const app = getApp();
Page({

  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{}
  },

  getUserInfo: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        app.globalData.isHide = true
        app.globalData.userInfo=res.userInfo 
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  var userNick = res.userInfo.nickName; //用户昵称 
                  var avataUrl = res.userInfo.avatarUrl; //用户头像地址 
                  var gender = res.userInfo.gender; //用户性别
                  console.log(avataUrl),
                    this.setData({
                      nick: userNick,
                      avataUrl: avataUrl
                    })
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);

                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    url: 'http://127.0.0.1:8081/center_server/src/main/java/com/mini/server/controller/UserController.java' + res.code + '&grant_type=authorization_code',
                    data: {
                      code: code,
                      nick: userNick,
                      avaurl: avataUrl,
                      sex: gender,
                    },
                    success: res => {
                      // 获取到用户的 openid
                      console.log("用户的openid:" + res.data.openid);
                      console.log(res.data);
                      wx.setStorageSync('nick', res.data.nick); //将获取信息写入本地缓存 
                      wx.setStorageSync('openid', res.data.openid);
                      wx.setStorageSync('imgUrl', res.data.imgUrl);
                      wx.setStorageSync('sex', res.data.sex);

                    }
                  });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          app.globalData.isHide = false
        }
      }
    });
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      this.setData({
        userInfo:e.detail.userInfo
      })


      //将userInfo数据存入缓存
      wx.setStorage({
        key: "userInfo",
        data: this.data.userInfo
      })
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      app.globalData.isHide = true
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }

    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
    }
    wx.hideLoading()
    // 跳转首页
    setTimeout(() => {
      wx.switchTab({
        url: '../GRZX'
      })
    }, 1000)
  },
  // setUserInfoAndNext(res) {
  //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //   // 所以此处加入 callback 以防止这种情况
  //   if (this.userInfoReadyCallback) {
  //     this.userInfoReadyCallback(res)
  //   }
  //   wx.hideLoading()
  //   // 跳转首页
  //   setTimeout(() => {
  //     wx.reLaunch({
  //       url: 'pages/GRZX/GRZX'
  //     })
  //   }, 1000)
  // },
})
