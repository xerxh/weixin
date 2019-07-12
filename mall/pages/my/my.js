// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 跳转课程详情
  jumpDetail() {
    wx.navigateTo({
      url: '/pages/classDetail/classDetail'
    })
  },
  // 跳转会员购买
  jumpPayMember() {
    wx.navigateTo({
      url: '/pages/payMember/payMember'
    })
  },
  // 跳转分销界面
  jumpDistribution() {
    wx.navigateTo({
      url: '/pages/distribution/distribution'
    })
  },
  // 跳转setting页面
  jumpSetting() {
    wx.navigateTo({
      url: '/pages/setting/setting'
    })
  },
  // 跳转积分页面
  jumpIntegral() {
    wx.navigateTo({
      url: '/pages/integral/integral'
    })
  },
  // 跳转帮助中心
  jumpHelp() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  }
})