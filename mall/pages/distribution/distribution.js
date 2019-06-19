// pages/distribution/distribution.js
import { MyModel } from '../../models/MyModel.js'
const My_Model = new MyModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchBtnList: ['我的团队', '我的好友'],
    nowIndex: 0
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

  // 切换按钮
  btnClick(e) {
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == this.data.nowIndex){
      return
    }
    this.setData({
      nowIndex: e.currentTarget.dataset.index
    })
  },
  // 获取我的团队列表
  getMyTeam() {
    // My_Model.addDistribution()
    //   .then(res => {
    //     // 处理数据
    //   })
    console.log('获取数据')
  }
})