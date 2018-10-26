//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList:[
      {
        imagePath:"../../images/a.jpg",
        title:"图片一"
      },
      {
        imagePath: "../../images/b.jpg",
        title: "图片二"
      },
      {
        imagePath: "../../images/c.jpg",
        title: "图片三"
      },
      {
        imagePath: "../../images/d.jpg",
        title: "图片四"
      },
    ],
    interval: 3000,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

   
    // wx.request({
    //   url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+"wxd33f8c3dcc3d58a4"+"&secret="+"ea62189dac43021c432d07979e73188e",
    //   data:{

    //   },
    //   method:'GET',
    //   success : res => {
    //     console.log(res)
    //   }
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
