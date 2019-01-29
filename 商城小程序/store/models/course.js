import { HTTP } from '../utils/http.js'
class AllCourse extends HTTP {
  constructor() {
    super()
  }


  // 获取列表数据
  getGoodsList(categoryId, criteria, pageindex, pagecount) {
    let params = {
      url: '/curriculum/getCurriculumList',
      data: {
        categoryId,
        pageindex,
        pagecount,
        criteria
      },
      method: 'post'
    }
    return this.request(params)
  }

  // 获取主页数据
  getCategorData(url, pageindex, pagecount, criteria) {
    let params = {
      url: url,
      data: {
        pageindex,
        pagecount,
        criteria
      }
    }
    return this.request(params)
  }
}

export { AllCourse }