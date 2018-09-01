const Util = require('../../utils/util.js')
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log('登录')
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '../index/index',
              })
            }
          });
        }
      }
    })
  },
  loading(){
    wx.showLoading({
      title: '正在授权中',
    })
  },
  bindGetUserInfo: function (e) {
    wx.hideLoading();
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log('授权')
      let _this = this;
      //插入登录的用户的相关信息到数据库
     
      //授权成功后，跳转进入小程序首页
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      //用户按了拒绝按钮
      console.log('拒绝授权')
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,部分功能可能受到限制',
        showCancel: true,
        cancelText:'继续访问',
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }else{
            console.log('用户点击了继续访问')
            // wx.switchTab({
            //   url: '../index/index',
            // })
            wx.redirectTo({
              url: '../index/index',
            })
          }
        },
        fail(){
          // 函数调用错误时调用
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    // 发送请求获取用户数据

  },

})