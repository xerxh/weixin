// pages/login/index.js
const Util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: '',
    option: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options = {}) {
    this.setData({
      option: options
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindGetUserInfo: function (e) {
    let urlset = this.data.option;
    console.log(urlset)
    let detail = e.detail;
    let flag = detail.errMsg.split(":")[1]
    console.log(e.detail)
    var ser = "";
    for (var i in urlset) {
      if (i !== "navback") {
        ser += i + "=" + urlset[i] + "&";
      }
    }
    // 设置一个跳转默认地址
    urlset.url || (urlset.url = '/pages/index/index')
    console.log(urlset)
    if (flag === "ok") {
      // 点击Button弹窗授权，如果授权了
      // 此时就可以获取到了
      // 成功后，返回
      wx.setStorageSync("userInfo", detail);
      wx.showLoading();
      // 登陆
      // Util.loginAction({ parentId: wx.getStorageSync('parentId'), ...detail.userInfo })
      //   .then(result => {
      //     console.log(result, '结果')

          wx.hideLoading()
          // 跳转到主页面
          wx.reLaunch({
            url: urlset.url
          })
        //})
        // .catch(error => {
        //   wx.hideLoading()
        //   wx.showToast({
        //     title: error,
        //     icon: 'none',
        //     duration: 1500
        //   })
        //   console.log('登陆异常', error);
        // })

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
              url: `${urlset.url}`
            })
          }
        }
      })
    }
  }
})