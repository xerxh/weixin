import { HTTP } from '../utils/http.js'
class Collection extends HTTP {
  constructor() {
    super()
  }


  // 获取列表数据
  getMyCollection(criteria,pageindex, pagecount) {
    let params = {
      url: '/collect/getMyCollectList',
      data: {
        criteria,
        pageindex,
        pagecount,
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }
    return this.request(params)
  }
}

export { Collection }