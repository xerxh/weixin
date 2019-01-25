// pages/lesson/index.js
import { reloadLogin, random, share } from "../../utils/util"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 头部标题
    headerTitle:'我的收藏',
    categoryId: '',
    url: '',
    paramsObj: {},
    pageindex: 0,
    pagecount: 4,
    // 商品列表数组
    dataList: [],
    search: '',
    // 加载更多
    more: 1,
    // 搜索
    searchMark: 1,
    // 是否重新渲染列表组件
    isShow: false,
    // 是否第一次渲染
    firstRender: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('收藏界面')
      // this.getdata()
    console.log('显示')  
    // this.setData({
    //   firstRender: true
    // })
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
    this.setData({
      isShow: true,
      firstRender: true
    })
  },
  onHide() {
    console.log('隐藏')
    this.setData({
      isShow: false,
      firstRender: false
    })
  },
  // 获取列表数据
  getdata: function (search){

    return collection.getMyCollection(search, this.data.pageindex, this.data.pagecount)
    .then(res => {
      let { data : {data: arr} } = res
      console.log(arr)
      this.setData({
        dataList: arr,
        paramsObj: {isHidden: true}
      })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      more: random(8)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return share()
  }
})