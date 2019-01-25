import { HTTP } from '../utils/http.js'
class lessonIndex extends HTTP {
  constructor() {
    super()
  }


  // 获取列表数据
  getGoodsList($categoryId) {
    let params = {
      url: '/curriculum/getParentCategoryCurriculum',
      data: {
        categoryId: $categoryId
      }
    }
    return this.request(params)
  }

  // 获取列别详情
  getCategoryInfo(categoryId) {
    let params = {
      url: '/curriculum/getCategoryInfo',
      data: {
        categoryId
      }
    }
    return this.request(params)
  }
}

export { lessonIndex }