//index.js
//获取应用实例
const app = getApp()
import { StoreModel } from '../../models/storeIndex.js'
let storeModel = new StoreModel()
import { config } from '../../config.js'
var util = require('../../utils/util.js')

Page({
  data: {
    searchKeyWords: [],
    bannerList: [],
    goodsTypeList: [],
    //热门推荐
    hotList: [],
    hotParamsObj: {},
    pleacholder: '',
    //最新上线
    recently: [],
    // recentParamsObj
    recentParamsObj: {},
    interval: 3000,
    duration:'400',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //获取数据
    this.getSearchKeywords();
    this.getBannerList();
    this.getGoodsType();
    this.getGoodsHotList();
    this.getRecentGoods();

  },
  //分享
  onShareAppMessage(res) {
    return util.share()
  },
  // 跳转商品列表界面
  itemSkip: function (e) {
    var categoryId = e.detail.itemid;
    var title = e.detail.title;
    console.log(e.detail.title)
    if (e.detail.title == '砍价商品') {
      wx.navigateTo({
        url: '../bargain/bargain',
      })
    } else if (e.detail.title == '分享专用') {
      console.log('分享')
      wx.navigateTo({
        url: `../myShare/index?id=${categoryId}&title=${title}`
      })
    } else if (e.detail.title == '拼团商品') {
      console.log('拼团')
      wx.navigateTo({
        url: `../tourDiy/index?id=${categoryId}&title=${title}`
      })
    } else if (e.detail.title == '确认订单') {
      console.log('确认订单')
      wx.navigateTo({
        url: `../affirmOrder/affirmOrder?id=${categoryId}&title=${title}`
      })
    } else if (e.detail.title == '开发票') {
      console.log('开发票')
      wx.navigateTo({
        url: `../invoice/invoice?id=${categoryId}&title=${title}`
      })
    }else {
      wx.navigateTo({
        url: `../lesson/index?id=${categoryId}&title=${title}`
      })
    }
    
  },
  // 获取搜索关键字
  getSearchKeywords: function () {
    return new Promise((resolve, reject) => {
      storeModel.getSearchKeywords().then(res => {
        this.setData({
          searchKeyWords: res.data.data,
          pleacholder: res.data.data[0]
        })
        resolve()
      })
     })
  },
  //  获取轮播图
  getBannerList: function () {
    return new Promise((resolve, reject)=>{
      storeModel.getBannerList().then(res => {
        console.log(res);
        this.setData({
          bannerList: res.data.data
        })
        resolve()
      })
    })
  },
  // 获取商品类别
  getGoodsType: function () {
    return new Promise((resolve, reject)=>{
      storeModel.getType(-1).then(res => {
        console.log(res.data.data, '这是课程大类');
        this.setData({
          goodsTypeList: res.data.data
        })
        resolve()

      })
    })
  },
  // 获取热门商品
  getGoodsHotList: function () {
    return new Promise((resolve, reject)=>{
      
      var hotListData = wx.getStorageSync('HotListData')
      if(hotListData){
        this.setData({
          hotList: hotListData.slice(0, 2),
          hotParamsObj: {
            title: '今日更新', 
            isSeeMore: true
          }
        })
        resolve()
      }else{
        storeModel.getHotList().then(res => {
          console.log(res, '这是热门商品')
          wx.setStorageSync('HotListData', res.data.data)
          this.setData({
            hotList: res.data.data.slice(0, 2),
            hotParamsObj: {
              title: '今日更新', 
              isSeeMore: true
            }
          })
          resolve()
        })
      }
    })
  },
  // 获取数据
  getRecentGoods: function () {
    return new Promise((resolve, reject)=>{
      var recentListData = wx.getStorageSync('recentlyListData')
      if (recentListData) {
        this.setData({
          recently: recentListData.slice(0, 2),
          recentParamsObj: {
            title: '汉艺推荐', 
            isSeeMore: true
          }
        })
        resolve()
      } else {
        storeModel.getRecentGoods().then(res => {
          wx.setStorageSync('recentlyListData', res.data.data)
          this.setData({
            recently: res.data.data.slice(0, 2),
            recentParamsObj: {
              title: '汉艺推荐', 
              isSeeMore: true
            }
          })
          resolve()
        })
      }
    })
  },
  // 跳转课程详情页
  goDetail: function (e) {
    console.log("-----", e)
    var id = e.detail.goodsID
    wx: wx.navigateTo({
      url: '../lessonDetail/lessonDetail?curriculumId=' + id,
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 跳转到搜索页面
  jump: function (e) {
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },
  
  //跳转到课程详情
  jumpCourseDetail: function (e) {
    console.log(e);
    let url = '';
    if (e.target.dataset.id.indexOf('.') == -1) {
        console.log('跳转到详情页')
        url = '../lessonDetail/lessonDetail?curriculumId=' + e.target.dataset.id
    }else {
        console.log('跳转到web-view')    
      url = '../web-view/web-view?content=' + e.target.dataset.id
    }
    wx.navigateTo({
      url: url,
    })
  },
  getMore: function(e) {
    wx.navigateTo({
      url: `../lesson/index?id=''`
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      searchKeyWords: [],
      bannerList: [],
      goodsTypeList: [],
      //热门推荐
      hotList: [],
      pleacholder: '',
      //最新上线
      recently: [],
    })
    // 清空缓存
    wx.removeStorageSync('HotListData')
    wx.removeStorageSync('recentlyListData')
        //获取数据
    Promise.all([this.getSearchKeywords(), this.getBannerList(), this.getGoodsType(), this.getGoodsHotList(), this.getRecentGoods()]).then(res => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新

    })
  }

})
