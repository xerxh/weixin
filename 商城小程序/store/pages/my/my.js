// pages/my/my.js
import { reloadLogin, random } from "../../utils/util"
import { My } from "../../models/my"
const my = new My()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {name: '历史浏览'},
      {name: '购买记录'},
      // {name: '我的余额'}
    ],
    // 是否可以显示用户信息
    isShowUser: false,
    switchIndex: -1,
    userInfo: {},
    // 加载更多
    more: 1,
    isRefresh: true
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    my.getUserInfo()
      .then(res => {
        console.log(res, '获取用户信息')
        if (res.data.code == 1003) { // 当用户过期时重新登陆
          // 调用登陆
          wx.showLoading({
            title: '同步用户数据中',
            mask: true
          })
          console.log('调用重新登陆')
          reloadLogin()
            .then(response => {
              console.log('重新登陆完成', response)
              this.setUserData(response)
              wx.hideLoading()
            })
        } else {
          this.setUserData(res.data)
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // my.getUserInfo()
    //   .then(res => {
    //     console.log(res, '获取用户信息')
    //     if(res.data.code == 1003) { // 当用户过期时重新登陆
    //       // 调用登陆
    //       wx.showLoading({
    //         title: '同步用户数据中',
    //         mask: true
    //       })
    //       console.log('调用重新登陆')
    //       reloadLogin()
    //       .then(response => {
    //         console.log('重新登陆完成', response)
    //         this.data.setUserData(response)
    //         wx.hideLoading()
    //       })
    //     }else{
    //      this.setUserData(res)
    //     }
    //   })
  },
  // 判断是否分销进行赋值操作
  setUserData(res) {
    let navData = [
      {name: '历史浏览'},
      {name: '购买记录'}
    ]
    this.setData({
      isRefresh: false
    })
    console.log(res)
    // 账户是否具备分销权限
    if(res.data.isDistribution) {
      // if(res.data.isPastDue !== 3) {
        navData = [...navData, {name: '我的余额'}]
      // }
    }
    this.setData({
      userInfo: res.data,
      navData: navData,
      switchIndex: wx.getStorageSync('myIndex') || 0,
      isShowUser: true,
      isRefresh: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log('random', '加载更多')
    this.setData({
      more: random(8)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchPage(e) {
    console.log('切换数据')
    if(e.detail == this.data.switchIndex) {
      console.log('属于同一页')
      return
    }
    this.setData({
      switchIndex: e.detail,
      more: 1
    })
    wx.setStorageSync('myIndex', e.detail)
    wx.pageScrollTo({ 
      scrollTop: 0, //回到顶部
      duration: 0
    })
  }
})