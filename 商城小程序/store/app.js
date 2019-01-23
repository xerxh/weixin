//app.js
import { LoginModel} from 'models/login.js'
let loginModel = new LoginModel()
let util = require('utils/util.js')

App({
  globalData: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    token: null,
    name: '',
    userid: '',
    userItro: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    encryptedData: null,
    iv: null,
    user: null,
    // 搜索默认值
    pleacholder: '',
  },
  onLaunch: function (options) {
    console.log(options,'app的onLaunch')
    this.globalData.shareTicket = options.shareTicket
    util.loginAction().then(res => {
      console.log(res)
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     loginModel.Weixinlogin(res.code,"applet","1.0").then(res=>{
    //       let result = res.data
    //       if (result.code == 0) {
    //         wx.setStorageSync("uid", result.data.userId || "")
    //         wx.setStorageSync("token", result.data.token || "")
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res,'用户信息')
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync("userInfo", res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        }
        else {
          var url = options.path //当前页面url
          let urlID = options.query
          var IDs = ""

          for (let i in urlID) {
            IDs += i + "=" + urlID[i] + "&"
          }
          console.log(IDs);
          wx.reLaunch({
            url: '../../pages/login/login?navback=' + url + "&" + IDs,     
            })
        }
      },
      fail: (res) => {
      }
    })
    }
})