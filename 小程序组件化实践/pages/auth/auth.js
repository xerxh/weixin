const app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: ''
  },
  onLoad: function (options) {
    console.log('进入登陆界面' + new Date().toLocaleString())

    if (options.url) {
      // 获取完成后要返回的页面
      this.setData({
        url: options.url
      })
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      let _this = this;


      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo', e.detail.userInfo);

        }
        
      })

    } else {
      //用户按了拒绝按钮
      let _this = this
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,部分功能可能受到限制',
        showCancel: true,
        cancelText: '继续访问',
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          } else {
            console.log('用户点击了继续访问')
            wx.switchTab({
              url: _this.data.url
            })
          }
        },
        fail() {
          // 函数调用错误时调用
        }
      })
    }
  }
})