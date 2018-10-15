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

// 对字符长度显示进行处理
const omit = function (text, length) {
  // console.log('asfasdfadf')

  if (!text) {
    return ''
  }
  console.log(text.title)
  var short = text.title.substring(0, length)
  console.log(short)
  return short + '...'
}


// 微信http请求用promise封装
/**
 * @ url    ： 接口地址
 * @ method ： 请求方法
 * @ header ： 请求头部信息
 * @ params :  请求参数
 */
function http({ method = 'GET', url = '', params = {}, header = {'content-type': 'application/json'}} = {}) {
  wx.showLoading({
    title: '请求数据中，请耐心等待..'
  });
  return new Promise( (resolve, reject) => {
    wx.request({
      url: url,
      data: params,
      method: method,
      // 设置请求的header
      header:header,
      success: function (res) {
        wx.hideLoading();
        resolve(res);
      },
      fail: function () {
        wx.hideLoading();
        reject(res);
      }
    })
  })
}
// “code”: “0：系统错误 1:正常，2:内部错误, 3:用户过期”
/**
 * @ successCode ： 成功响应状态码
 * @ systemErrorCode :  系统错误状态码
 * @ internalErrorCode : 内部错误状态码
 * @ userExpiredCode : 用户过期状态码
 */
const successCode = 1
const systemErrorCode = 0
const internalErrorCode = 2
const userExpiredCode = 3
// “type”: 1文章类别，2是收藏类别
const articleType = 1
const collectionType = 2
/**
 * @ systemErrorCodeFun :  系统错误处理函数
 * @ internalErrorCodeFun : 内部错误处理函数
 * @ userExpiredCodeFun : 用户过期处理函数
 * @ defaultFun : 默认处理函数
 */
// 由于现在错误处理使用同一处理  所以采用同一函数
let func = (msg) => {
  console.log(msg)
}
const systemErrorCodeFun = func
const internalErrorCodeFun = func
const userExpiredCodeFun = func
const defaultFun = func
// GET请求
const GET = ({url, params = {}, header = {}}) => {
  return http({
    url,
    params,
    header
  })
}
const codeFun = (data, successCodeFun, loginFunc) => {
  console.log(data)
  // 对返回状态进行判断集中处理
  switch (data.code * 1) { // 将数字字符串转化为数字
    // 成功处理
    case successCode:
      successCodeFun(data)
      break
    // 系统错误处理  
    case systemErrorCode:
      systemErrorCodeFun(data.msg)
      break
    // 内部错误处理  
    case internalErrorCode:
      internalErrorCodeFun(data.msg)
      break
    // 用户过期处理  
    case userExpiredCode:
      userExpiredCodeFun(data.msg, loginFunc)
      break
    default:
      defaultFun(data.msg)
  }
}
// post请求
const POST = ({url, params = {}, header = {header:"Content-type: application/json; charset=utf-8"}}) => {
  return http({
    url,
    params,
    method : 'POST',
    header
  })
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


module.exports = {
  formatTime,
  GET,
  POST,
  omit,
  upload_share_Result
}
