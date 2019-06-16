// pages/classLevel/classLevel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn: ['日本', '美国', '英国', '其他', '日本', '美国', '英国', '其他', '日本', '美国', '英国', '其他', '日本', '美国', '英国', '其他', '日本', '美国', '英国', '其他', '日本', '美国', '英国', '其他'],
    isSelectIndex: 0,
    hotList: [{
      picurl: '../../images/index/level.png',
      curriculumName: '缓慢的温度',
      intro: '深度解读海外各学科最重点的专业研究方向',
      discountPrice: '4200'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
    console.log('翻页')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 点击类别按钮
  clickBtn(e) {
    console.log(e.target.dataset.index)
    this.setData({
      isSelectIndex: e.target.dataset.index
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
})