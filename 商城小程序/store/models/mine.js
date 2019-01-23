import { HTTP } from '../utils/http.js'
class MineModel extends HTTP {
  constructor() {
    super()
  }

  // 意见反馈接口
  addFeedback($token, $content) {
    let params = {
      url: 'hart/api/my/addFeedback',
      data: {
        token: $token,
        content: $content
      },
      method: 'POST'
    }
    return this.request(params)
  }

  // 公司介绍
  getHartDetail() {
    let params = {
      url: 'hart/api/my/getHartDetail'
    }
    return this.request(params)
  }
  // 我的收藏
  getMyEnshrine($token, $criteria, $pageindex, $pagecount){
    let params = {
      url: 'hart/api/collect/getMyCollectList',
      data: {
        token: $token,
        criteria: $criteria,
        pageindex: $pageindex,
        pagecount: $pagecount
      },
      method:'POST'
    }
    return this.request(params)
  }
}
export { MineModel }