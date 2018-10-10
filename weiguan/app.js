//app.js
App({
  globalData: {
    userInfo: null  
  },
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    }),
    this.getUser();
  },
  // 获取用户数据
  getUser(){
    // 如果有缓存
    if(wx.getStorageSync('userInfo')){
      this.globalData.userInfo = wx.getStorageSync('userInfo');
    }else{
      // 获取用户信息
      wx.getSetting({
        success: res => {
          console.log(res.authSetting['scope.userInfo'])
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                
                console.log(res)
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 将用户信息放入缓存
                wx.setStorageSync('userInfo', res.userInfo);
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                console.log(this.userInfoReadyCallback)
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    }
  }
})
