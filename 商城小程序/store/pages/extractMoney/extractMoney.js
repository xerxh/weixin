// pages/extractMoney/extractMoney.js
import { My } from "../../models/my"
const my = new My()
const base_img_url = '../../images/extractMoney'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnList: [
      {src: `${base_img_url}/canExtractMoney.png`, name: '可提现', url: '/pages/extractMoney/extractMoney'},
      {src: `${base_img_url}/extractedMoney.png`, name: '已提现', url: '/pages/extractMoney/extractMoney'},
    ],
    myAccount: {},
    moneyNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let btnList = this.data.btnList
    my.getMyAccount()
      .then(res => {
        console.log(res)
        let myAccount = res.data.data
        btnList[0].money = myAccount.surplusMoney
        btnList[1].money = myAccount.nosurplusMoney
        console.log(myAccount)
        this.setData({
          myAccount,
          btnList,
          moneyNumber: myAccount.surplusMoney
        })
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
  // 提现余额
  getMoney() {
    my.myGetMoney(this.data.moneyNumber)
      .then(res => {
        console.log(res)
      })
  },
  getInput(e) {
    console.log(e)
    this.setData({
      moneyNumber: e.detail.value
    })
  },
  // 跳转提现明细页面
  jump(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    if(index){
      wx.navigateTo({
        url: '/pages/extractMoneyDetail/extractMoneyDetail',
      })
    }
  }
})