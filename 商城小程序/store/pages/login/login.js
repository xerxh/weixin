const Util = require('../../utils/util.js')

const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: '',
    option: ""
  },
  onLoad: function (options) {
    this.setData({
      option: options
    })
  },
  bindGetUserInfo: function (e) {
    var urlset = this.data.option;
    let detail = e.detail;
    let flag = detail.errMsg.split(":")[1]
    console.log(e.detail)
    var ser = "";
    for (var i in urlset) {
      if (i !== "navback") {
        ser += i + "=" + urlset[i] + "&";
      }
    }
    console.log(ser)
    if (flag === "ok") {
      // 点击Button弹窗授权，如果授权了
      // 此时就可以获取到了
      // 成功后，返回
      wx.setStorageSync("userInfo", detail);
      wx.showLoading();
      // 登陆
      Util.loginAction({referrerNo: app.globalData.parentId, ...detail.userInfo})
      .then(result => {
        console.log(result, '结果')

        wx.hideLoading()
        // 跳转到主页面
        wx.reLaunch({
          url: "/" + urlset.navback + "?" + ser,
          fail() {
            wx.reLaunch({
              url: "/pages/index/index"
            })
          }
        })
      })
      .catch(error => {
        wx.hideLoading()
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 1500
        })
        console.log('登陆异常', error);
      })
    } else {
      //用户按了拒绝按钮
      let _this = this
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
            wx.switchTab({
              url: `/${urlset.navback}`
            })
          }
        }
      })
    }
  }
})