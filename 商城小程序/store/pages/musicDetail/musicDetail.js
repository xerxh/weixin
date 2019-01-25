// pages/musicDetail/musicDetail.js
import { musicModel } from "../../models/musicListModel"
const MusicMode = new musicModel()

import { StoreModel } from '../../models/storeIndex.js'
let storeModel = new StoreModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 富文本标记
    firstRender: [],
    renderMark: 0,
    // 图文内容
    richText: [],
    title: '详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('音频详情', options)
    if(options.guid){ // 1:公司简介，2：帮助中心，3：会员制度，4：用户协议，5：隐私协议
      storeModel.jumpOut(options.guid)
        .then(res => {
          console.log(res, '详情')
          let guidTitle = {
            1 : '公司简介',
            2 : '帮助中心',
            3 : '会员制度',
            4 : '用户协议',
            5 : '隐私协议'
          }
          this.setData({
            richText: res.data.data.split('_ueditor_page_break_tag_'),
            firstRender: [true],
            renderMark: ++this.data.renderMark,
            showClassInfo:false,
            title: guidTitle[options.guid]
          })
          console.log(this.data.richText)
          this.renderFuc()
        })
    }else{
      MusicMode.getMusicDetail(options.id)
      .then(res => {
        console.log(res)
        let musicInfo = res.data.data.split('_ueditor_page_break_tag_');
        console.log(musicInfo, '富文本数据')
        this.setData({
          richText: musicInfo,
          firstRender: [true],
          renderMark: ++this.data.renderMark,
          showClassInfo:false,
          // isHidden:false
        })
        this.renderFuc()
      })
    }
   
  },
  // 对富文本渲染进行标记
  renderFuc() {
    if (this.data.renderMark < this.data.richText.length) {
      setTimeout(() => {
        var arr = this.data.firstRender
        arr[this.data.renderMark] = true
        var _this = this
        this.setData({
          firstRender: arr,
          renderMark: ++this.data.renderMark
        })
        return this.renderFuc()
      }, 100)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})