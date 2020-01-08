//app.js
App({
  onLaunch: function (options) {
    console.log(options)
    this.globalData.shareTicket = options.shareTicket
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if(!wx.getStorageSync('userInfo')){
      // 登录
      
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                // 若没定义，说明其在Page.onLoad 定义userInfoReadCallback 之前运行的，说明app.globalInfo.userInfo已经包含了用户登录的信息了。
                // 若定义了，说明在Page.onLoad比该语句返回的success结果之前已经运行了。此时的app.globalInfo.userInfo的值是空的，所以还需要再重新对其进行赋值。
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }else{
            // wx.navigateTo({
            //   url: '../auth/auth?url=../index/index'
            // })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
