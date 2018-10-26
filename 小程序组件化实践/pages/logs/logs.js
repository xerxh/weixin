//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    app.userInfoReadyCallback = () => {
      console.log('————回调')
    }
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
