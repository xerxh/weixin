import { OrderModel } from '../models/order.js'
let orderModel = new OrderModel()
import { PurchaseModel } from '../models/purchase.js'
let purchaseModel = new PurchaseModel()
let flag = true;

const actions = ()=>{
  // 取消订单
  const canleOrder = (orderId, curriculumId, success)=>{
    console.log('取消订单' + orderId)
    var token = wx.getStorageSync('token')
    orderModel.canleOrderDetail(token, orderId).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '订单取消成功',
        })
        // this.getDatafromNet()
        success()
      }
    })
  }
  // 删除订单
  const deleteOrder = (orderId, curriculumId, success) => {
    console.log('删除订单' + orderId)
    var token = wx.getStorageSync('token')
    orderModel.deleteOrderDetail(token, orderId).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '订单删除成功',
        })
        success()
      }
    })

  }
  // 评论订单
  const commentOrder = (orderId, curriculumId, success) => {
    console.log('评论订单')
    wx.navigateTo({
      url: `../feedback/index?orderId=${orderId}&curriculumId=${curriculumId}`,
      })
    success()
  }
  // 购买订单
  const purchaseOrder = (orderId, curriculumId, success) => {
    console.log('购买订单' + orderId)
    if(flag) {
      flag = false;
      purchaseModel.purchase(orderId, wx.getStorageSync('token')).then(res => {
        // console.log(res)
        let info = JSON.parse(res.data.data);
        console.log(info)
        // 调用微信支付
        wx.requestPayment(
          {
            'timeStamp': info.info.timeStamp,
            'nonceStr': info.info.nonceStr,
            'package': info.info.package,
            'signType': 'MD5',
            'paySign': info.info.sign,
            'success': function (res) {
              console.log('----AAAAA------')
              console.log(res)
              wx.showLoading({
                title: '支付中....',
              })
              purchaseModel.purchaseSuccess(info.orderNo).then(res => {
                console.log(res)
                wx.hideLoading()
                success()
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
              })
            },
            'complete': function (res) {
              flag = true;
              // success()
            }
          })
      })
    }
  }
  return new Map([
    [0, canleOrder],
    [1, purchaseOrder],
    [2, commentOrder],
    [3, deleteOrder],
  ])
}
// 按钮点击事件
const onButton = (btnId, orderId, curriculumId,success)=>{
  let action = [...actions()].filter(([key,value])=>(key===btnId))
  action.forEach(([key, value]) => (value(orderId, curriculumId, success)))
}
module.exports = {
  onButton
}