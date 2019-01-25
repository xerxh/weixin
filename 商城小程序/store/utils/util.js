
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

// 登陆调用
const login = (paramsObj, resolve, reject) => {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code
        console.log(code, 'code')
        loginModel.Weixinlogin({code, ...paramsObj})
        .then(res => {
          let result = res.data
          // "code": 0：正常，  1001：系统错误，1002：内部错误，1003：登陆过期
          switch(result.code) {
            case 0:
              wx.setStorageSync("uid", result.data.userId || "");
              wx.setStorageSync("token", result.data.token || "");
              resolve(res.data)
              break;
            case 1003: // 登陆过期需要重新登陆
              login(paramsObj, resolve, reject)
            default:
              reject('发生了网络异常')
              break;
          }
        })
        .catch((error) => {
          reject(error)
        })
      },
      fail: error => {
        // 如果失败进行重新调用登陆
        login(paramsObj, resolve, reject)
      }
    })
}

// 重新登陆调用
const reloadLogin = () => {
  return new Promise((resolve, reject)=>{
    wx.getUserInfo({
      success: function(res){
        let paramsObj = res.userInfo;
        login(paramsObj, resolve, reject)
      },
      fail: function() {
        // fail
        reloadLogin()
      }
    })
  })
}

// 登录逻辑
const loginAction = (paramsObj)=>{
  return new Promise((resolve, reject)=>{
    login(paramsObj, resolve, reject)
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

// 生成一个不同位数的完全随机数
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

module.exports = {
  formatTime,
  upload_share_Result,
  loginAction,
  login,
  reloadLogin,
  share,
  random,
  formatMusicTime
}