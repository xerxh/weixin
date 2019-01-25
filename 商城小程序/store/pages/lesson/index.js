// pages/lesson/index.js
import { lessonIndex } from '../../models/lessonIndex.js'
let LessonIndex = new lessonIndex()
var util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 头部标题
    headerTitle:'',
    categoryId: '',
    headerObj: {},
    // 商品列表数组
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryId = options.id;
    var headerTitle = decodeURIComponent(options.title);
    // 根据对应的id查找数据
    console.log(options,'获取页面加载时的参数')
    // 获取头部数据
    LessonIndex.getCategoryInfo(categoryId)
      .then(res => {
        let {data: { data: headerObj } } = res
        this.setData({
          headerObj
        })
        console.log(res)
      })
    // 获取列表数据
    this.getdata(categoryId, {
      headerTitle,
      categoryId
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

  // 获取商品列表
  getdata: function (categoryid, setSomeDate = {}){

    return LessonIndex.getGoodsList(categoryid)
    .then(res => {
      let { data : {data: arr} } = res
      arr.map(item => {
        item.paramsObj = {
          title: item.categoryName,
          categoryId: item.categoryId,
          isSeeMore: true
        }
      })
      console.log(arr)
      this.setData({
        dataList: arr,
        ...setSomeDate,
      })
    })
  },
  // 进入详情页面
  goDetail:function(e){
    console.log(e.detail.goodsID,'lesson')
    var id = e.detail.goodsID
    // 跳转到音乐列表
    wx.navigateTo({
      url: `/pages/musicList/musiclist?id=${id}`,
    })
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
    return util.share()
  }
})