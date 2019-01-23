
import { LoginModel } from '../models/login.js'
let loginModel = new LoginModel()

  const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const share =()=>{
  return {
    imageUrl: '../../images/share.png',
    success: (res) => {
      console.log(res)
    }
  }
}
// 第一次分享追踪上报 函数
const upload_share_Result = (res, type, uid) => {
  return new Promise((resolve, reject) => {
    // let share_event = apiUrl.share_event    // 获取接口
    let token = wx.getStorageSync('token')    // 获取登录用户token
    let params = {
      token,  // 登录用户的token
      //转发群事件 ：type=1； 进入直播间事件 ：type=2； 进入直播间30s事件 ：type=3
      type,
      uid,    // 记录来源，如果在小程序打开，来源为空；如果从别人分享的打开，来源别人的uid
      encryptedData: res ? res.encryptedData : '',    // 分享到群的群消息
      iv: res ? res.iv : ''       // 分享到群的群消息
    }

    // 发送上报请求
    console.log('上报后台')
    resolve()
  })
  // Request(share_event, params, 'post').then((res) => {
  //   //...
  // }).catch((res) => {
  //   //...
  // })
}

// 登录逻辑
const loginAction = ()=>{

  return new Promise((resolve, reject)=>{
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        loginModel.Weixinlogin(res.code, "applet", "1.0").then(res => {
          let result = res.data
          if (result.code == 0) {
            wx.setStorageSync("uid", result.data.userId || "")
            wx.setStorageSync("token", result.data.token || "")
          }
          resolve('登录成功')
        })
      }
    })
  })

}
const formatMusicTime = (time) => {
  // 获取当前时间 hh-mm  distanceMin 距离现在的分钟数
  var today = new Date()
  // 总毫秒数
  var distanceTime = time*1000
  today.setTime(parseInt(distanceTime))
  var oHours = Math.floor(distanceTime/1000/3600)
  var oMintes = (today.getMinutes()).toString();
  var oSeconds = today.getSeconds()
  oMintes = oMintes.toString()
  oHours = oHours.toString()
  if(oHours){
    if(oMintes <= 9) {
      oMintes = '0' + oMintes
    }
    return [oHours, oMintes, oSeconds].join(":")
  }else{
    return [oMintes,oSeconds].join(":")
  }
}
module.exports = {
  formatTime,
  upload_share_Result,
  loginAction,
  share,
  formatMusicTime
}