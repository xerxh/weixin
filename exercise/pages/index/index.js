//index.js

// 引入对HTML内容解析的处理类
var WxParse = require('../../utils/wxParse/wxParse.js');
// 引入内置HTML对象文件
var company = require('../../utils/data.js')
//获取应用实例
const app = getApp()
import tabbarApi from '../../utils/tabbar.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    banners : [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbarConfig: app.globalData.tabbarConfig,
    isHideTabbar: app.globalData.isHideTabbar
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var that = this;

    //使用内置HTML展现
    var data = {content: company.content };
    this.setData({
      item: data
    });
    console.log('index')
    console.log(company)
    WxParse.wxParse('content', 'html', data.content, that, 25);

    // 调用hideTabBar方法
    wx.hideTabBar({
      success: () => {
        // 如果成功就将全局的状态修改，此处主要是防止调用失败后出现两个导航栏
        wx.hideTabBar({
          success: () => {
            // 如果成功就将全局的状态修改，此处主要是防止调用失败后出现两个导航栏
            app.globalData.isHideTabbar = true
            this.setData({
              isHideTabbar: app.globalData.isHideTabbar
            })
          }
        });
        // 获取当前页面路由
        let path = this.route
        this.setData({
          tabbarConfig: setRouterConfig(app.globalData.tabbarConfig, path)
        })
        if (app.globalData.userInfo) {
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else if (this.data.canIUse){
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          console.log(222)
          app.userInfoReadyCallback = res => {
            console.log(res)
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
        // this.getBanners();
      }
    })
    this.getBanners();
  },
  toLoadPage(){
    console.log(222)
    wx.switchTab({
      url: '../loadPage/index'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    // 获取dialog组件
    this.dialog = this.selectComponent('#dialog')
    console.log(this.selectComponent('#phoneNumber'))
    console.log(this.dialog)
    // canvas 动画
    const ctx = wx.createCanvasContext('ripple');
    ctx.arc(106, 106, 50, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill();
    ctx.draw();
  },
  
  showDialog () {
    this.dialog.showDialog();
  },
  // 取消事件
  _cancelEvent () {
    console.log('取消');
    this.dialog.hideDialog();
  },
  // 确认事件
  _confirmEvent () {
    console.log('确认');
    console.log(this.dialog)
    this.dialog.hideDialog();
  },
  getPhoneNumber (e) {
    console.log(e)
  },
  //获取轮播图片
  getBanners() {
    console.log(222)
    var self = this;
    var data = 'https://cdn.it120.cc/apifactory/2017/11/17/4eed2ccae3178578326f3adcd60a7b06.jpg';
    this.setData({
      banners: [data,data,data]
    })
    // wx.request({
    //   url: app.globalData.baseUrl + '/banner/list',
    //   data: {
    //     type: 0
    //   },
    //   success(res) {
    //     if (res.data.code == 0) {
    //       console.log(res)
    //       var res = ['https://cdn.it120.cc/apifactory/2017/11/17/4eed2ccae3178578326f3adcd60a7b06.jpg',
    //       ];
    //       self.setData({
    //         banners: res
    //       })
    //     }
    //   }
    // })
  }
})
