// pages/mine/mine.js
let util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    customList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      console.log(1)
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true,
        // intro: app.globalData.userItro || ''
        intro: wx.getStorageSync('intro')

      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          intro: app.globalData.userItro || ''
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
            hasUserInfo: true,
            intro: app.globalData.userItro || ''
          })
        }
      })
    }
  },

  // 我的订单
  orderClicked:function(e){

    var token = wx.getStorageSync('token');
    if(token){
      // var id = e.detail.itemid;
      wx: wx.navigateTo({
        url: `../myOrder/index`,
      })
    }else{
      wx.showModal({
        title: '登录失败',
        content: '请重新登录',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '登录中',
            })
            util.loginAction().then(res => {
              console.log(res)
              wx.hideLoading()
              wx: wx.navigateTo({
                url: `../myOrder/index`,
              })
            })
          }
        }
      })

    }
  },

  // 跳转到我的订单
  orderBtnClicked:function(e){
    var btnId = e.currentTarget.dataset.id
    var token = wx.getStorageSync('token');
    if (token) {
      wx: wx.navigateTo({
        url: `../myOrder/index?btnId=${btnId}`,
      })
    } else {
      wx.showModal({
        title: '登录失败',
        content: '请重新登录',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '登录中',
            })
            util.loginAction().then(res => {
              console.log(res)
              wx.hideLoading()
              wx: wx.navigateTo({
                url: `../myOrder/index?btnId=${btnId}`,
              })
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  editTestimonials() {
    
  },
  // 我的收藏
  jumoToEnshrine() {
    let token = wx.getStorageSync('token')
    if(token){
      wx.navigateTo({
        url: '../myEnshrine/myEnshrine',
      })
    }else{
      wx.showModal({
        title: '登录失败',
        content: '请重新登录',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '登录中',
            })
            util.loginAction().then(res => {
              console.log(res)
              wx.hideLoading()
              wx.navigateTo({
                url: '../myEnshrine/myEnshrine',
              })
            })
          }
        }
      })
    }
  },
  // 意见反馈
  commentFeedback(){
    wx.navigateTo({
      url: '../feedback/index',
    })
  },
  goToAboutUs() {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  }
})