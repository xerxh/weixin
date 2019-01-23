import { HTTP } from '../utils/http.js'
class StoreModel extends HTTP {
  constructor() {
    super()
  }
// 获取搜索关键字
  getSearchKeywords(){
    var params = {
      url: 'hart/api/home/getSearchlist',
    }
    return this.request(params)

  }
// 轮播图
  getBannerList() {
    var params = {
      url: 'hart/api/home/getBanner',
    }
    return this.request(params)
  }
// 获取商品类别
  getType($categoryId) {
    let params = {
      url: 'hart/api/home/getCCategoryList',
      data:{
        categoryId: $categoryId
      }
    }
    return this.request(params)
  }
  // 获取商品列表
  getGoodsList($categoryId, $criteria, $pageindex, $pagecount) {
    let params = {
      url: 'hart/api/curriculum/getCurriculumList',
      data: {
        categoryId: $categoryId,//可为空
        criteria: $criteria,//可为空
        pageindex: $pageindex,
        pagecount: $pagecount //每页行数，为 - 1时表示不分页
      },
      method: 'POST'
    }
    return this.request(params)
  }
  // 获取热门推荐
  getHotList() {
    let params = {
      url: 'hart/api/home/getRecdCurriculum',
    }
    return this.request(params)
  }
// 获取最近上线的商品
  getRecentGoods() {
    let params = {
      url: 'hart/api/home/getNewCurriculum',
    }
    return this.request(params)
  }
}

export { StoreModel }