import { config } from '../config.js'

// http请求
class HTTP {
  constructor() {
    // 基础url
    this.baseRestUrl = config.api_blink_url
  }

  request({url, data = {}, method = "GET"}) {
    return this._request(url, data, method)
  }

  //http 请求类
  _request(url, data, method) {
   const _this = this  
   return new Promise((resolve, reject) => {
      // api接口地址
      var url = this.baseRestUrl + url;
      // wx提供的ajax请求接口
      wx.request({
        url: url,
        data: data,
        method: method,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // 判断以2（2xx)开头的状态码为正确
          // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
          var code = res.statusCode.toString();
          var startChar = code.charAt(0);
          // 如果请求返回状态为2开头
          if (startChar == '2') {
            // 成功处理方法
            resolve(res)
          } else {
            // 错误码处理方法
            _this.showError(code)
            reject()
          }
        },
        fail: function (err) {
          // 錯誤处理
          _this.showError()
          reject()
        }
      });
   })
  }

  showError(code) {
    console.log(config.error_code[code] || config.error_code[0])
    wx.showToast({
      title: config.error_code[code] || config.error_code[0],
      icon: 'none'
    })
  }
};

export { HTTP };