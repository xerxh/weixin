//app.js
App({
  // 小程序的全局变量
  // 用他来管理全局的路由
  globalData: {
    // tabbarConfig 里面的内容可以copy app.json中tabbar的配置
    tabbarConfig: [
      {
        "active": true, // active是这里独有的，通过它可以判断哪个页面是当前的tab页
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "/icon/home_nor.png",
        "selectedIconPath": "/icon/home_pre.png"
      },
      {
        "active": false,
        "pagePath": "pages/center/index",
        "text": "发现",
        "iconPath": "/icon/center_nor.png",
        "selectedIconPath": "/icon/center_pre.png"
      },
      {
        "active": false,
        "pagePath": "pages/mine/index",
        "text": "我的",
        "iconPath": "/icon/mine_nor.png",
        "selectedIconPath": "/icon/mine_pre.png"
      }
    ],
    isHideTabbar: false
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
      const vm = this
      
      // let totalTopHeightSet = {
      //   'iPhone': 64,
      //   'iPhone X': 88,
      //   'android': 68
      // }
      wx.getSystemInfo({
        success: function (res) {
          let totalTopHeight = 68
          if (res.model.indexOf('iPhone X') !== -1) {
            totalTopHeight = 88
          } else if (res.model.indexOf('iPhone') !== -1) {
            totalTopHeight = 64
          }
          vm.globalData.statusBarHeight = res.statusBarHeight
          vm.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
        },
        failure() {
          vm.globalData.statusBarHeight = 0
          vm.globalData.titleBarHeight = 0
        }
      }),
    // wx.getUserInfo({
    //   success: res=>{

    //   }
    // }),
    // wx.authorize({
    //   success: res=>{
    //     console.log(res)
    //   }
    // })
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log(222)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: 'https://api.it120.cc/jy02149522'
  }
})
