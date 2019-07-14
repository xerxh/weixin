// pages/payMember/payMember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPlay: false,
    nowIndex: 0,
    vipBtnList: ['白金VIP', '黄金VIP'],
    qL: [
      {
        src: '../../images/my/freeClass.svg', 
        name: '免费课程'
      },
      {
        src: '../../images/my/discount.svg',
        name: '免费课程'
      },
      {
        src: '../../images/my/jf.svg',
        name: '免费课程'
      },
      {
        src: '../../images/my/youhui.svg',
        name: '免费课程'
      }
    ]
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
  // 切换显示
  switchStatus() {
    this.setData({
      isShowPlay: !this.data.isShowPlay
    })
    console.log(this.data.isShowPlay)
  },
  // 切换会员级别
  switchBtnClick(e) {
    console.log(e)
    this.setData({
      nowIndex: e.currentTarget.dataset.index
    })
  }
})