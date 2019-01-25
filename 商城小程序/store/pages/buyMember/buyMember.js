// pages/buyMember/buyMember.js
import { My } from "../../models/my"
const my = new My()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnList: [
      {isSelected: false, name: '用户协议', url: '/pages/plusCanGetMoney/plusCanGetMoney', guid: 4},
      {isSelected: false, name: '隐私协议', url: '/pages/extractMoney/extractMoney', guid: 5},
    ],
    memerList: [],
    isActive: {},
    index: -1,
    isPlus: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let userInfo = JSON.parse(options.userInfo)
    my.getMemerDetail()
      .then(res => {
        console.log(res)
        this.setData({
          memerList: res.data.data,
          userInfo
        })
      })
  },

  changeActive(e) {
    const index = e.currentTarget.dataset.index
    console.log(e)
    if(this.data.memerList[index].isApplyFor){
      this.setData({
        isActive: {
          [index]: true
        },
        isPlus: true,
        index
      })
      return
    }else{
      this.setData({
        isActive: {
          [index]: true
        },
        isPlus: false,
        index
      })
      console.log(this.data.index)
    }
  },

  // 开通会员
  /**
   * @ memberRuleId 会员规则id
   * @ referrerNo 推荐人id
   * 
  */
  buyMember() {
    if(this.data.isPlus) {
      console.log('进行申请')
      if(this.data.memerList[this.data.index].applyForStatus == 0) {
        wx.showToast({
          title: '请不要重复申请',
          icon: 'none',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: '申请提交成功',
          icon: 'none',
          duration: 1000
        })
      }
      return
    }
    console.log(app.globalData.referrerNo)
    const isSelected = this.data.btnList[0].isSelected && this.data.btnList[1].isSelected
    if(this.data.index === -1){
      wx.showToast({
        title: '请选择您需要的会员',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if(!isSelected){
      wx.showToast({
        title: '请阅读同意相关协议',
        icon: 'none',
        duration: 1000
      })
      return
    }
    // 获取推荐人id
    const referrerNo = app.globalData.referrerNo
    const memberRuleId = this.data.memerList[this.data.index].memberRuleId
    my.buyMember(memberRuleId, referrerNo)
      .then(res => {
        console.log(res)
        let info = JSON.parse(res.data.data);
        var that = this
        wx.requestPayment(          
          {
            'timeStamp': info.info.timeStamp,
            'nonceStr': info.info.nonceStr,
            'package': info.info.package,
            'signType': 'MD5',
            'paySign': info.info.sign,
            'success': function (res) {
              console.log('----AAAAA------')
              console.log(res)
              wx.showLoading({
                title: '支付中....',
              })
              my.purchaseSuccess(info.orderNo)
              .then(res => {
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '购买成功',
                })
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
              })
            },
            'complete': function (res) {

            }
          }
        )
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

  },
  switchChange(e) {
    const selectIndex = e.currentTarget.dataset.index
    console.log(`${e.currentTarget.dataset.index} 发生 change 事件，携带值为`, e.detail.value)
    let btnList = this.data.btnList
    btnList[selectIndex].isSelected = !btnList[selectIndex].isSelected
    console.log(btnList)
    this.setData({
      btnList
    })
  },
  jump(e) {
    let index = e.currentTarget.dataset.index
    console.log('我要起飞了', index)
    wx.navigateTo({
      url: `/pages/musicDetail/musicDetail?guid=${this.data.btnList[index].guid}`
    })
  }
})