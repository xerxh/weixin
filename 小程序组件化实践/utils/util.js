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
  upload_share_Result
}