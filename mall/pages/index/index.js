//index.js
//获取应用实例
const app = getApp()
import { IndexModel } from '../../models/IndexModel.js'
let storeModel = new IndexModel()
var util = require('../../utils/util.js')

Page({
  data: {
    bannerList: [],
    // 课程大类列表
    classTypeList: [],

    //热门推荐
    hotList: [],
    hotParamsObj: {},

    pleacholder: '',
    //最新上线
    recently: [],
    recentlyParamsObj: {},
    // 汉艺推荐
    recommendList: [],
    recommenedParamsObj: {},

    // 底部数据
    footerData: [],

    dataList: [],
    interval: 3000,
    duration: '400',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 记录是否固定定位
    isFiexed: false,
    pageCount: 2,
    pageIndex: 0
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

  },
  onShow() {
    //获取数据
    this.getSearchKeywords();
    this.getBannerList();
    this.getClassTypeList();
    this.getGoodsHotList();
    this.getRecentGoods();
    this.getHyRecomend();
  },
  //分享
  onShareAppMessage(res) {
    return util.share()
  },
  // 跳转商品列表界面
  itemSkip: function (e) {
    console.log('跳转二级列表')
    var categoryId = e.detail.itemid;
    var title = e.detail.title;
    console.log(title, categoryId)
    wx.navigateTo({
      // url: `/pages/lesson/index?id=${categoryId}&title=${title}`
      url: `/pages/classLevel/classLevel?id=${categoryId}&title=${title}`
    })
  },
  // 跳转信息页面
  jumpInfo:function () {
    wx.navigateTo({
      url: '/pages/notification/notification',
    })
  },
  // 获取搜索关键字
  getSearchKeywords: function () {
    return new Promise((resolve, reject) => {
      // storeModel.getSearchKeywords(1)
      //   .then(res => {
      //     console.log(res.data.data)
      //     this.setData({
      //       pleacholder: res.data.data
      //     })
      //     resolve()
      //   })
      this.setData({
        pleacholder: '商城store'
      })
      resolve()
    })
  },
  //  获取轮播图
  getBannerList: function () {
    return new Promise((resolve, reject) => {
      // storeModel.getBannerList()
      //   .then(res => {
      //     console.log(res);
      //     this.setData({
      //       bannerList: res.data.data
      //     })
      //     resolve()
      //   })

      this.setData({
        bannerList: [
          {
            picurl: 'https://cdn.it120.cc/apifactory/2017/11/17/4eed2ccae3178578326f3adcd60a7b06.jpg'
          },
          {
            picurl: 'https://cdn.it120.cc/apifactory/2017/11/17/4eed2ccae3178578326f3adcd60a7b06.jpg'
          },
          {
            picurl: 'https://cdn.it120.cc/apifactory/2017/11/17/4eed2ccae3178578326f3adcd60a7b06.jpg'
          },
          {
            picurl: 'https://cdn.it120.cc/apifactory/2017/11/17/4eed2ccae3178578326f3adcd60a7b06.jpg'
          }
        ]
      })
    })
  },
  // 获取课程类别
  getClassTypeList: function () {
    return new Promise((resolve, reject) => {
      // storeModel.getType(-1)
      //   .then(res => {
      //     console.log(res.data.data, '这是课程大类');
      //     this.setData({
      //       classTypeList: res.data.data
      //     })
      //     resolve()

      //   })
      this.setData({
        classTypeList: [
          { categoryName: '大师行', categoryIcon: '../../images/types/ds.svg', categoryId: 1 },
          { categoryName: '共同成长课', categoryIcon: '../../images/types/cz.svg', categoryId: 2 },
          { categoryName: '留学解析', categoryIcon: '../../images/types/lx.svg', categoryId: 3 },
          { categoryName: '专业划分', categoryIcon: '../../images/types/zy.svg', categoryId: 4 },
          { categoryName: '读书计划', categoryIcon: '../../images/types/ds.svg', categoryId: 5 }
        ]
      })
      resolve()
    })
  },
  // 获取热门推荐
  getGoodsHotList: function () {
    return new Promise((resolve, reject) => {
      // storeModel.getHotList(this.data.pageIndex, this.data.pageCount).then(res => {
      //   this.setData({
      //     hotList: res.data.data,
      //     hotParamsObj: {
      //       title: '热门推荐',
      //       url: '/home/getHotCurriculum',
      //       isSeeMore: true
      //     }
      //   })
      //   resolve()
      // })
      this.setData({
          hotList: [],
          hotParamsObj: {
            title: '热门推荐',
            url: '/home/getHotCurriculum',
            isSeeMore: true
          }
        })
      resolve()
    })
  },
  // 获取最新课程
  getRecentGoods: function () {
    return new Promise((resolve, reject) => {
      // storeModel.getRecentGoods(this.data.pageIndex, this.data.pageCount).then(res => {
      //   this.setData({
      //     recently: res.data.data,
      //     recentlyParamsObj: {
      //       title: '最新课程',
      //       url: '/home/getNewCurriculum',
      //       isSeeMore: true
      //     }
      //   })
      //   resolve()
      // })
      this.setData({
        recently: [
          { classId: "1", className: '课程名称', classPicture: '../../images/logo.png' }
        ],
        recentlyParamsObj: {
          title: '最新课程',
          url: '/home/getNewCurriculum',
          isSeeMore: true
        }
      })
      resolve()
    })
  },
  // 获取汉艺推荐
  getHyRecomend: function () {
    return new Promise((resolve, reject) => {
      // storeModel.getHyRecomend(this.data.pageIndex, this.data.pageCount).then(res => {
      //   console.log(res)
      //   this.setData({
      //     recommendList: res.data.data,
      //     recommenedParamsObj: {
      //       title: '汉艺推荐',
      //       url: '/home/getHartRecd',
      //       isSeeMore: true
      //     }
      //   })
      //   resolve()
      // })
      this.setData({
        recommendList: [
          { 
            curriculumName: '时尚的历程', 
            intro: '进入时尚的圈子，拥有身披光环的实力',
            picurl: '../../images/logo.png',
            virtualPurchases: '258'
          }
        ],
        recommenedParamsObj: {
          title: '汉艺推荐',
          url: '/home/getHartRecd',
          isSeeMore: true
        }
      })
      resolve()
    })
  },
  // 跳转课程详情页
  goDetail: function (e) {
    console.log("-----", e)
    var id = e.detail.goodsID
    wx.navigateTo({
      url: '/pages/musicList/musiclist?id=' + id,
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
    let { type, id } = e.target.dataset
    switch (type) { // 1: 课程,2 :h5,3:小程序',
      case 1:
        console.log('跳转到详情页')
        url = '/pages/musicList/musiclist?id=' + e.target.dataset.id
        wx.navigateTo({
          url: url,
        })
        break;
      case 2:
        url = '/pages/web-view/web-view?content=' + e.target.dataset.id
        wx.navigateTo({
          url: url,
        })
        break;
      default:
        wx.showToast({
          title: '类型有问题',
          icon: 'none',
          duration: 1000
        })
        break;
    }
  },
  getMore: function (e) {
    wx.navigateTo({
      url: `../lesson/index?id=''`
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示下拉加载菊花图动画
    wx.showNavigationBarLoading()
    // 进行数据初始化
    this.setData({
      bannerList: [],
      classTypeList: [],
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
    Promise.all([
      this.getSearchKeywords(),
      this.getBannerList(),
      this.getClassTypeList(),
      this.getGoodsHotList(),
      this.getRecentGoods()
    ])
      .then(res => {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新、
      })
  },
  // 通过对滚动位置的判断 进行搜索框的位置变化
  onPageScroll: function (e) {
    console.log(e.scrollTop) //这个就是滚动到的位置,可以用这个位置来写判断
    if (e.scrollTop > 57) {
      this.setData({
        isFiexed: true
      })
    } else {
      this.setData({
        isFiexed: false
      })
    }
  }

})
