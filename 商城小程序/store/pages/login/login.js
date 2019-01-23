// const Util = require('../../utils/util.js')
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
    let detail = e.detail,
      flag = detail.errMsg.split(":")[1]
    var ser = "";
    for (var i in urlset) {
      if (i !== "navback") {
        ser += i + "=" + urlset[i] + "&";
      }
    }
    if (flag === "ok") {
      // 点击Button弹窗授权，如果授权了
      // 此时就可以获取到了
      // 成功后，返回
      wx.setStorageSync("userInfo", detail)
      wx.reLaunch({
        url: "/" + urlset.navback + "?" + ser,
        fail() {
          wx.reLaunch({
            url: "pages/index/index"
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      let _this = this
      // wx.showModal({
      //   title: '警告',
      //   content: '您点击了拒绝授权,部分功能可能受到限制',
      //   showCancel: true,
      //   cancelText:'继续访问',
      //   confirmText: '返回授权',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击了“返回授权”')
      //     }else{
      //       console.log('用户点击了继续访问')
      //       wx.switchTab({
      //         url: _this.data.url
      //       })
      //     }
      //   }
      // })
    }
  }
})