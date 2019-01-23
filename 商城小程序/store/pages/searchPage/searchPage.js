// pages/searchPage/index.js
let util = require('../../utils/util.js');
import { StoreModel } from '../../models/storeIndex.js'
let storeModel = new StoreModel()
import { config } from '../../config.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTitle: '汉艺国际',
    searchTitle: '热门搜索',
    searchHotLabel: [],
    pleacholders: '',
    inputValue: '',
    //历史记录
    historyListData: [],
    //热门搜索
    hotListData: [],
    courseListData: [],
    isHidden: true,
    //是否显示历史记录
    isShowHistory: true,
    // 是否显示热门搜索
    isShowHot: true,
    //是否显示课程详情
    isShowCourse: false,
    // 当前页显示的数据条数
    pageSize: 5,
    // 当前分页数
    pageindex: 0,
    nowIndex: 0,
    // 搜索条件
    criteria: '',
    searchStr: '',
    // 当前网络状况
    networkType: 'wifi'
  },
  onchange() {
    console.log('搜索')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    // //设置placeholder为首页placeholder
    // let arr = options.pleacholder.split(' ')
    // that.setData({
    //   // hotListData: arr,
    //   pleacholders: arr[0]
    // })

    this.getSearchKeywords()
    
    //获取缓存历史记录，如果有，赋值给historyListData
    // wx.getStorage({
    //   key: 'storageHistory',
    //   success: function(res) {
    //     that.setData({
    //       historyListData: res.data
    //     })
    //     console.log(res)
    //   }
    // })
  },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 上拉刷新 初始化数据
    this.initData()
    this.getData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.criteria){
      return;
    }
    this.getData()
  },
  search (e) {
    console.log(e, '搜索')
    let that = this;
    if(e.detail.criteria){
      // 获取搜索条件
      var arr = this.data.historyListData;
      //如果缓存中没有用户所有内容，则加入缓存
      if (arr.indexOf(e.detail.criteria) === -1) {
        //历史记录最多3项
        // if (arr.length >= 3) {
        //   arr.shift();
        // }
        // arr.push(e.detail.criteria);
        // wx.setStorage({ 
        //   key: 'storageHistory',
        //   data: arr,
        // })
      }
      //隐藏历史和热搜框，显示搜索结果
      this.setData({
        historyListData: arr,
        searchStr: e.detail.criteria,
        pageindex: 0
      })
    }else{
      //如果用户没有输入，则用placeholder为搜索条件发送请求
      this.setData({
        searchStr: this.data.pleacholders,
        pageindex: 0           
      })
    }
    //隐藏历史和热搜框，显示搜索结果
    this.setData({
      isShowHot: false,
      isShowHistory: false,
      isShowCourse: true,
      pageindex: 0
    })
    console.log(this.data.searchStr)
    //发送请求
    wx.request({
      url: config.api_blink_url + '/hart/api/curriculum/getCurriculumList',
      data: {
        criteria: that.data.searchStr,
        pageindex: that.data.pageindex,
        pagecount: 10
      },
      method: 'post',
      success: function(res) {
        console.log(res) 
        if(res.data.code === 0) {
          if(res.data.data.length <= 0) {
            wx.showToast({
              title: '暂无内容',
              icon: 'none'
            })
          }else {
            var i = that.data.pageindex;
            i++;
            that.setData({
              courseListData: res.data.data,
              pageindex: i
            })
          }
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }else if(res.data.code === 1003) {
          wx.showToast({
            title: '登录过期，请重新登录',
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  searchBtn () {
    this.initData()
    this.getData()
  },
  initData () {
    this.setData({
      pageindex: 0,
      criteria: '',
      historyListData: []
    })
  },
  // 获取数据
  /**
   * criteria 搜索条件
   */
  getData () {
    // 数据请求
    
  },
   // 重新连接网络
  reconnectNetwork(){
    
  },
  // 获取热门搜索列表
  getHotList () {
    let url = app.globalData.baseUrl + '/kss/api/article/getSearchCriteria'
    let params = JSON.stringify({
      type0: 2,
      type1: 2
    })
    util.POST({url, params})
        .then( res => {
          let data = res.data
          if(data.code == 1){
            this.setData({
              searchHotLabel: data.criterialist
            })
          }
        })
  },
  navigatoDetail (e) {
    // 跳转详情页 并将文章id作为参数传递
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../listDetail/listDetail?id=' + id
    })
  },
  // 热门搜索触发
  hotSearch (e){
    let title = e.currentTarget.dataset.title
    title && this.setData({
      inputVal: title
    })
    this.initialSearch(title)
  },
  initialSearch(e) {
    console.log(e,'执行不到吗？')
    this.initData()
    // 获取搜索条件
    if (e) {
      this.setData({
        criteria: e,
        isShowHot: true
      })
      this.getData()
    } else {
      this.setData({
        isShowHot: false
      })
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
    let that = this;
    wx.request({
      url: config.api_blink_url + '/hart/api/curriculum/getCurriculumList',
      method: 'post',
      data: {
        criteria: that.data.searchStr,
        pageindex: that.data.pageindex,
        pagecount: 10
      },
      success: function(res) {
        console.log(res, '上拉加载更多')
        if (res.data.code === 0) {
          var arr = that.data.courseListData;
          if (res.data.data.length <= 0) {
            wx.showToast({
              title: '已无更多内容',
              icon: 'none'
            })
            return;
          }
          arr = arr.concat(res.data.data);
          var i = that.data.pageindex;
          i++;
          that.setData({
            courseListData: arr,
            pageindex: i
          })
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        } else if (res.data.code === 1003) {
          wx.showToast({
            title: '登录过期，请重新登录',
            icon: 'none'
          })
        }
      },
      fail: function(data) {

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  ,
  //历史记录和热门搜索每一项的点击事件
  searchItem : function(e) {
    // this.triggerEvent('search', {
    //   detail: {
    //     criteria: e._relatedInfo.anchorTargetText
    //   }
    // })
    this.search({
      detail: {
        criteria: e._relatedInfo.anchorTargetText
      }
    });
      this.setData({
        inputValue: e._relatedInfo.anchorTargetText
      })
    console.log(this.data.pleacholders, e._relatedInfo.anchorTargetText, this.data.inputvalue)
  },

  //清空历史
  clearHitory : function() {
    let that = this;
    wx.removeStorage({
      key: 'storageHistory',
      success: function(res) {
        that.setData({
          historyListData: [],
          isShowHistory: false
        })
      },
    })
  },

  // 获取搜索关键字
  getSearchKeywords: function () {
    storeModel.getSearchKeywords().then(res => {
      this.setData({
        hotListData: res.data.data
      })
    })
  },
  //点击搜索项，跳转到详情
  jumpItemDetails: function(e) {
    console.log(e,'点击搜索结果')
    wx.navigateTo({
      url: '../lessonDetail/lessonDetail?curriculumId=' + e.currentTarget.dataset.id,
    })
  },

  //
  clear: function(e) {
    console.log(e)
    this.setData({
      isShowHot: true,
      isShowCourse: false,
      courseListData: []
    })
  }
})