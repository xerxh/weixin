// pages/listDetail/listDetail.js
var content = require("../../utils/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData : {
      title:'如何考入伦敦大学学院学建筑设计',
      videoSrc : ""
    },
    richText: '<h1>Hello world!</h1>',
    commentData: [
      {
        userAvator: '../../asset/images/user1.png',
        userNanme: '湛蓝',
        scoreSum: new Array(4),
        scoreImg: '../../asset/images/score.png',
        date: '2018-5-2',
        content: 'Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes,Proin sodales pulvinar sic tempor. Sociis natoque magnis dis parturient montes'
      },
      {
        userAvator: '../../asset/images/user2.png',
        userNanme: '嗷呜喵',
        scoreSum: new Array(3),
        scoreImg: '../../asset/images/score.png',
        date: '2018-5-2',
        content: 'Nam fermentum, nulla luctus pharetra vulputate'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(content)
    this.setData({
      richText:content.content
    })
    console.log(options)
    let id = options.id;
    // 先看是否有详情页缓存
    let data = wx.getStorageSync('0_detail');
    if(data){
      // 如果有缓存读取缓存 渲染页面
    }else{
      // 发送请求 并存入缓存中
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
  
  }
})