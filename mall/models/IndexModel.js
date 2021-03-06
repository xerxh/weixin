import { HTTP } from '../utils/http.js'
import {
  bannerUrl,
  indexClassTypesUrl,
  newClassListUrl,
  hotClassListUrl,
  recommendClassListUrl
} from '../api/indexApi.js'

class IndexModel extends HTTP {
  constructor() {
    super()
  }
  // 获取搜索关键字
  getSearchKeywords(type) {
    var params = {
      url: '/home/getSearchlist',
      data: {
        type
      }
    }
    return this.request(params)

  }
  // 轮播图
  getBannerList() {
    var params = {
      url: bannerUrl,
    }
    return this.request(params)
  }
  // 获取课程类别
  getType($categoryId) {
    let params = {
      url: indexClassTypesUrl,
      data: {
        parentId: $categoryId
      }
    }
    return this.request(params)
  }
  // 获取汉艺推荐
  getHyRecomend(pageindex, pagecount, criteria = '') {
    return this.request({
      url: recommendClassListUrl,
      data: {
        pageindex,
        pagecount,
        criteria
      }
    })
  }
  // 获取热门推荐
  getHotList(pageindex, pagecount, criteria = '') {
    let params = {
      url: hotClassListUrl,
      data: {
        pageindex,
        pagecount,
        criteria
      }
    }
    return this.request(params)
  }
  // 获取最新课程
  getRecentGoods(pageindex, pagecount, criteria = '') {
    let params = {
      url: newClassListUrl,
      data: {
        pageindex,
        pagecount,
        criteria
      }
    }
    return this.request(params)
  }
  // 跳转出口
  jumpOut(guid) {
    return this.request({
      url: '/universal/getHartDetail',
      data: {
        guid
      }
    })
  }
}

export { IndexModel }