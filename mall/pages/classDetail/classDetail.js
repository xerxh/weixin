// pages/classDetail/classDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AudioCoverInfo: {

    },
    AudioList: [
      // { videoName: '历史的进程', duration: 1008, videoStatus: 1 },
      // { videoName: '历史的进程', duration: 1008, videoStatus: 1 },
      // { videoName: '历史的进程', duration: 1008, videoStatus: 1 },
      // { videoName: '历史的进程', duration: 1008, videoStatus: 1 },
      {
        videoName: '上一曲',
        duration: 1008, 
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081101/201348b217a4e1b5bdc80a7cf87be940/G129/M0B/17/00/wQ0DAFyLmzGAJplAACx_MX-VX7Q381.mp3'
      },
      {
        videoName: '啦啦啦',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081057/7910ffad3da38137f6d33a640ffaac3b/G126/M00/05/09/HocBAFxLAoeAT3BzAD1nWyW7V5M814.mp3'
      },
      {
        videoName: '下一曲',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081100/578caa2acb8ed04d3aade6e359637520/G119/M01/05/0D/F4cBAFxlweSAT9BlAEHWDL3dgeI800.mp3'
      },
      {
        videoName: '上一曲',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081101/201348b217a4e1b5bdc80a7cf87be940/G129/M0B/17/00/wQ0DAFyLmzGAJplAACx_MX-VX7Q381.mp3'
      },
      {
        videoName: '啦啦啦',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081057/7910ffad3da38137f6d33a640ffaac3b/G126/M00/05/09/HocBAFxLAoeAT3BzAD1nWyW7V5M814.mp3'
      },
      {
        videoName: '下一曲',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081100/578caa2acb8ed04d3aade6e359637520/G119/M01/05/0D/F4cBAFxlweSAT9BlAEHWDL3dgeI800.mp3'
      },
      {
        videoName: '上一曲',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081101/201348b217a4e1b5bdc80a7cf87be940/G129/M0B/17/00/wQ0DAFyLmzGAJplAACx_MX-VX7Q381.mp3'
      },
      {
        videoName: '啦啦啦',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081057/7910ffad3da38137f6d33a640ffaac3b/G126/M00/05/09/HocBAFxLAoeAT3BzAD1nWyW7V5M814.mp3'
      },
      {
        videoName: '下一曲',
        duration: 1008,
        videoStatus: 1,
        src: 'http://fs.w.kugou.com/201905081100/578caa2acb8ed04d3aade6e359637520/G119/M01/05/0D/F4cBAFxlweSAT9BlAEHWDL3dgeI800.mp3'
      }
    ],
    navList: [
      {name: '课程'},
      {name: '目录'}
    ],
    nowIndex: 0,
    // 判断什么时候出现目录
    isFiexed: false,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  switchPage: function(e) {
    console.log(e.detail)
    this.setData({
      nowIndex: e.detail
    })
  },
  // 切换到目录列表
  jumpList() {
    this.setData({
      nowIndex: 1
    })   
  },
  // 通过对滚动位置的判断 进行显示目录的位置
  onPageScroll: function (e) {
    console.log(e.scrollTop) //这个就是滚动到的位置,可以用这个位置来写判断
    if(e.scrollTop >= 856) {
      if(!this.data.isFiexed){
        this.setData({
          isFiexed: true
        })
      }
    }else{
      if(this.data.isFiexed){
        this.setData({
          isFiexed: false
        })
      }
    }
    if (e.scrollTop > 669) {
      if (!this.data.isShow){
        this.setData({
          isShow: true
        })
      }
    } else {
      if (this.data.isShow){
        this.setData({
          isShow: false
        })
      }
    }
  }
})