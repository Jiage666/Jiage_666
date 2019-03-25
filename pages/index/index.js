Page({
   data: {
    src:'/images/shouye.png',
    currentNavtab: "0",
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  },
  view_nav1:function(){
    //根据24小时的帖子浏览量对帖子进行排序

  },
  view_nav2: function () {
    //根据时间对帖子进行排序由新到旧

  },
  view_nav3: function () {
    //根据帖子最新的回复对帖子进行排序

  },
})