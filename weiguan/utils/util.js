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

// 微信http请求用promise封装
/**
 * @url    ： 接口地址
 * @method ： 请求方法
 * @header ： 请求头部信息
 * @params :  请求参数
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
// GET请求
const GET = (url, params = {}, header = {}) => {
  return http({
    url,
    params,
    header
  })
}
// post请求
const POST = (url, params = {}, header = {}) => {
  return http({
    url,
    params,
    method : 'POST',
    header
  })
}
module.exports = {
  formatTime,
  GET,
  POST
}
