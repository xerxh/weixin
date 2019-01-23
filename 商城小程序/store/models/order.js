import { HTTP } from '../utils/http.js'

class OrderModel extends HTTP {
  constructor() {
    super()
  }
  // 获取用户订单
  getOrderInfo($token, $orderStatus,$pageIndex,$pageCount) {
    let params = {
      url: 'hart/api/orders/getMyOrdersList',
      data: {
        token: $token,
        orderStatus: $orderStatus,
        pageindex: $pageIndex,
        pagecount: $pageCount,

      },
      method: 'POST'
    }
    return this.request(params)
  }
  // 获取订单详情
  getOrderDetail($token, $orderId){
  let params = {
    url: 'hart/api/orders/getOrdersDetail',
    data: {
      token: $token,
      orderId: $orderId,
    },
    method: 'POST'
  }
  return this.request(params)
  }

  // 删除订单
  deleteOrderDetail($token, $orderId) {
    let params = {
      url: 'hart/api/orders/delOrders',
      data: {
        token: $token,
        orderId: $orderId,
      },
      method: 'POST'
    }
    return this.request(params)
  }

  // 取消订单
  canleOrderDetail($token, $orderId) {
    let params = {
      url: 'hart/api/orders/cancelOrders',
      data: {
        token: $token,
        orderId: $orderId,
      },
      method: 'POST'
    }
    return this.request(params)
  }

  // 评价订单
  commentOrder($token, $orderId, $curriculumId, $content, $userName, $picurl) {
    let params = {
      url: 'hart/api/comment/addComment',
      data: {
        token: $token,
        orderId: $orderId,
        curriculumId: $curriculumId,
        content: $content,
        userName: $userName,
        picurl: $picurl
      },
      method: 'POST'
    }
    return this.request(params)
  }

}
export { OrderModel }