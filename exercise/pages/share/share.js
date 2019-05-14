// pages/share/share.js
const app = getApp()
let util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据手机宽高比动态计算屏幕的高度
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc, clientWidth)
        console.log(clientHeight)
        that.setData({
          windowHeight: calc
        });
      }
    });
    // 开启分享携带  转发信息
    wx.showShareMenu({
      withShareTicket: true
    });
    console.log(options)
    this.setData({
      // 获取小程序url中的source，记录此小程序是谁分享的；也可能不存在source
      source: options.source
    });
    var _this = this
    // 给全局添加回调函数，当用户没有已授权的状态，需要点击·授权·按钮后，此时执行回调函数
    app.getInfoCb = function () {
      if (options.source) {
        // 第二次上报，如果有options.source，则记录谁分享的
        // console.log(app.globalData.)
        console.log('从分享窗口进入')
        wx.showModal({
          title: '砍价',
          content: '50元',
        })
        _this.share_event_req(null, '2', options.source)
        // 第三次上报，如果有options.source，则记录谁分享的
        setTimeout(() => {
          console.log('分享进入 停留了3s')
          // _this.share_event_req(null, '3', options.source)
        }, 30 * 1000)
      }
    };
    app.getInfoCb()
    // 如果用户已授权登录状态，未删除小程序，直接执行
    if (wx.getStorageSync('token')) {
      console.log('进入')
      app.getInfoCb()
    }

  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var _this = this
    var source = '从我开始'
    return {
      title: this.data.detailTitle,
      // 分享路径，房间名+用户uid来源
      path: `pages/share/share?source=${source}`,
      imageUrl: '../../asset/images/advisory.png',
      // 转发成功的回调函数
      success: function (res) {
        // 分享给个人：{errMsg: "shareAppMessage:ok"}
        // 分享给群：{errMsg: "shareAppMessage:ok", shareTickets: Array(1)}
        /* shareTicket 数组
         * 每一项是一个 shareTicket(是获取转发目标群信息的票据) ,对应一个转发对象
         */
        console.log(res)
        var shareTicket = (res.shareTickets && res.shareTickets[0]) || ''
        /* 官网的Tip: 由于策略变动，小程序群相关能力进行调整，
         * 开发者可先使用wx.getShareInfo接口中的群ID进行功能开发。
         */
        console.log(shareTicket)
        wx.getShareInfo({
          // 把票据带上
          shareTicket: shareTicket,
          success: function (res) {
            console.log('分享票据')
            console.log(res)
            // 如果从小程序分享没有source，如果从别人分享的再二次分享带有source
            // 后续会讲_this.data.source的来源
            let source = _this.data.source ? _this.data.source : '';
            // 上报给后台，把群信息带给后台，后台会去解密得到需要的信息
            util.upload_share_Result(res, '1', source)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    }
  },
  // 后续分享上报
  share_event_req(res, type, uid) {
    let _this = this;
    // 如果全局存在shareTicket票据的话，重新执行getShareInfo获取票据中带有的群信息
    // 并且上报给后台，让后台去解析群信息
    // 官网：当用户将小程序转发到任一群聊之后，可以获取到此次转发的 shareTicket，此转发卡片在群聊中被其他用户打开时，可以在 App.onLaunch() 或 App.onShow 获取到另一个 shareTicket。这两步获取到的 shareTicket 均可通过 wx.getShareInfo() 接口可以获取到【相同】的转发信息。
    // 也就是说，A转发到某群，只有B从此群中打开才能算是A的二次上报；但是B再次转发到此群，C从此群打开上报，则不算B上报成功了。这样防止用户群中互相刷。
    if (app.globalData.shareTicket) {
      console.log('从群里进入')
      console.log(app.globalData.shareTicket)
      wx.getShareInfo({
        shareTicket: app.globalData.shareTicket,
        success: function (res) {
          // _this.upload_share_Result(res, type, uid);
        }
      })
    } else {
      // 如果全局不存在shareTicket的话，直接调用upload_share_Result上报
      util.upload_share_Result(null, type, uid)
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

  }
})