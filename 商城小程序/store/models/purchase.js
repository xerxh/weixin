import { HTTP } from '../utils/http.js'
class PurchaseModel extends HTTP {
  constructor() {
    super()
  }

  // 购买
  purchase(orderId, token) {
    let params = {
      url: 'hart/api/purchase/payweixin',
      data: {
        token: token,
        orderId: orderId
      },
      method: 'POST'
    }
    return this.request(params)
  }

  // 支付成功
  purchaseSuccess(orderId) {
    let params = {
      url: 'hart/api/purchase/payVerify',
      data: {
        orderNo: orderId
      }
    }
    return this.request(params)
  }


}

export { PurchaseModel }