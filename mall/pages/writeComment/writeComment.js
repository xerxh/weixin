// pages/writeComment/writeComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTip: false,
    text: "",
    // 是否公开
    isShowName: false
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

  jumpBack() {
    wx.navigateBack()
  },
  switchStatus() {
    console.log('222')
    this.setData({
      isShowName: !this.data.isShowName
    })
  },
  // 获取评论内容
  getText(e) {
    this.setData({
      text: e.detail.value
    })
  },
  // 提交表单
  bindFormSubmit(e) {
    console.log(this.data.text)
    this.setData({
      isShowTip: true
    })
  }
})