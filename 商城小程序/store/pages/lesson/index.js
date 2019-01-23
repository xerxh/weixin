// pages/lesson/index.js
import { StoreModel } from '../../models/storeIndex.js'
let storeModel = new StoreModel()
var util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 头部标题
    headerTitle:'',
    nowIndex:0,
    pageindex:0,
    pageSize:10,


    // 商品列表数组
    dataList: [],
    paramsObj: {
      0: {
        title: '基础课',
        isSeeMore: true
      },
      1: {
        title: '理论课',
        isSeeMore: true      
      },
      2: {
        title: '进阶课',
        isSeeMore: true
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryId = options.id;
    var title = decodeURIComponent(options.title);
    categoryId = categoryId === undefined ? '' : categoryId;
    // 根据对应的id查找数据
    console.log(options,'获取页面加载时的参数');
    this.getdata('', {
      headerTitle:options.title
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

    let criteria = this.data.criteria
    let pageindex = this.data.pageindex
    let pagecount = this.data.pageSize
    return storeModel.getGoodsList(categoryid, criteria, pageindex, pagecount)
    .then(res => {
      let arr = this.data.dataList.concat(res.data.data); 
      this.setData({
        dataList: arr,
        ...setSomeDate,
        pageindex: ++this.data.pageindex,
      })
    })
  },
  // 进入详情页面
  goDetail:function(e){
    console.log(e.detail.goodsID,'lesson')
    var goodsId = e.detail.goodsID
    var isvideo = e.detail.isvideo;
    wx.navigateTo({
      url: `../lessonDetail/lessonDetail?curriculumId=${goodsId}&isvideo=${isvideo}`,
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
    let categoryid=''
    // 加载更多
    this.getdata(categoryid)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return util.share()
  }
})