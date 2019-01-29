// pages/musicList/musiclist.js
import { musicModel } from "../../models/musicListModel"
const MusicMode = new musicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 音频封面数据
    AudioCoverInfo: {},
    // 音频列表
    AudioList: [],
    id: '',
    isCollectImgList: {
      actived: '../../images/enshrined.png',
      url: '../../images/nonEnshrine.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 开启分享携带  转发信息
    wx.showShareMenu({
      withShareTicket: true
    });

    // 开启分享列表

    console.log(options, '音乐列表')
    this.setData({
      id: options.id
    })
    if (options.parentId) {
      wx.setStorageSync('parentId', options.parentId)
    }
    // 获取封面信息
    MusicMode.getAudioCoverInfo(options.id)
      .then(res => {
        console.log(res)
        const { data: { data: AudioCoverInfo } } = res
        this.setData({
          AudioCoverInfo
        })
        console.log(this.data.AudioCoverInfo, '封面详情')
      })
      this.getAudioList()
  },
  // 收藏课程
  collection() {
    let AudioCoverInfo = this.data.AudioCoverInfo
    MusicMode.collectionCourse(this.data.id, !AudioCoverInfo.isCollect)
      .then(res => {
        AudioCoverInfo.isCollect = !AudioCoverInfo.isCollect
        this.setData({
          AudioCoverInfo
        })
        console.log(this.data.AudioCoverInfo)
      })
  },
  getAudioList() {
    // 获取列表信息
    MusicMode.getAudioList(this.data.id)
    .then(res => {
      console.log(res)
      const { data: { data: AudioList } } = res
      // 将数据进行处理
      AudioList.map(item => {
        item.src = item.videourl
      })
      this.setData({
        AudioList
      })
      console.log(this.data.AudioList, '列表')
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

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
    console.log('下拉')
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
    var _this = this
    // var parentId = t
    console.log()
    return {
      title: this.data.detailTitle,
      // 分享路径，房间名+用户uid来源
      path: `pages/musicList/musiclist?parentId=${wx.getStorageSync('uid')}&id=${this.data.id}`,
      // 转发成功的回调函数
      success: function (res) {

        console.log(res, '发生成功')
      },
      fail: function (res) {
        console.log(res)
      }
    }
  }
})