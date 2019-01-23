import { HTTP } from '../utils/http.js'
class teacherModel extends HTTP {
  constructor() {
    super()
  }
  // 获取老师详情
  getTeacherDetail($teacherID) {
    let params = {
      url: 'hart/api/curriculum/getTeacherDetail',
      data: {
        teacherId: $teacherID
      }
    }
    return this.request(params)
  }
}

export { StoreModel }