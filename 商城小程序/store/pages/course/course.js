// pages/lesson/index.js
var util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 头部标题
    headerTitle:'',
    categoryId: '',
    url: '',
    search: '',
    more: 1,
    // 是否开始渲染
    canSend: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var categoryId = options.id
    var url = options.url
    // 根据对应的id查找数据
    console.log(options,'获取页面加载时的参数')
    console.log(options.url == 'undefined')
    this.setData({
      categoryId,
      url,
      canSend: true
    })
  },

  
  search(e) {
    console.log(e, '搜索数据')
    this.setData({
      search: e.detail.criteria
    })
    // this.getdata(e.detail.criteria)
  },
  clear(e) {
    console.log(e, '清空输入')
    this.setData({
      search: ''
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.url !== 'undefined') {
      return
    }
    this.setData({
      more: random(8)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return util.share()
  }
})