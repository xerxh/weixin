import { HTTP } from '../utils/http.js'
import {
  buyClassUrl,
  buyVipUrl
} from '../api/payApi.js'

class PayModel extends HTTP {
  constructor() {
    super()
  }
  // 购买课程
  buyClass(classId, payType, payNum) {
    var params = {
      url: buyClassUrl,
      data: {
        classId,
        payType,
        payNum,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }
  // 购买会员
  buyVip(vipType) {
    var params = {
      url: buyVipUrl,
      data: {
        vipType,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }

}

export { MyModel }