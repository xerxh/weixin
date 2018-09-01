//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    userInfo:{},
    hasUserInfo:false,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    // this.setData({
    //   nowIndex: options.nowIndex
    // });
    console.log('我的')
  },
  onShow(){
    console.log(app.globalData.userInfo)
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      console.log(1)
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log(3)
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
    console.log('我的')
  },
  toLogin(){
    console.log('登录')
    wx.redirectTo({
      url: '../login/login',
    })
  }
})
