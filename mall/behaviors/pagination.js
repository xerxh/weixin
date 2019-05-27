import {
  HTTP
} from '../utils/http.js'

let http = new HTTP()

let paginationBev = Behavior({
  properties: {

  },
  data: {
    // 起始页面   默认分页为第一页
    start: 0,
    // 当前页面显示数据数量
    count: 20,
    // 当前页列表数据
    dataArray: [
      {
        picListUrl: '../../images/logo.png',
        intro: '时尚的历程',
        curriculumName: '时尚的历程',
        discountPrice: 20
      },
      {
        picListUrl: '../../images/logo.png',
        intro: '时尚的历程',
        curriculumName: '时尚的历程',
        discountPrice: 20
      },
      {
        picListUrl: '../../images/logo.png',
        intro: '时尚的历程',
        curriculumName: '时尚的历程',
        discountPrice: 20
      },
      {
        picListUrl: '../../images/logo.png',
        intro: '时尚的历程',
        curriculumName: '时尚的历程',
        discountPrice: 20
      },
      {
        picListUrl: '../../images/logo.png',
        intro: '时尚的历程',
        curriculumName: '时尚的历程',
        discountPrice: 20
      }
    ],
    // 记录数据是否为空
    empty: false,
    // 是否已经到结尾最后一页
    ending: false
  },

  methods: {
    // 判断返回的数据是否为空
    setMoreData: function (dataArray) {
      console.log(dataArray)
      if (dataArray == false) {
        this.data.ending = true
        if (this.data.dataArray == false) {
          this.setData({
            empty: true
          })
          console.log('没有数据')
        }
        console.log('返回,已经是最后一页了')
      }
      let temp = this.data.dataArray.concat(dataArray)
      this.data.start++
      this.setData({
        dataArray: temp
      })
      return true
    },
    // 判断是否已经到达最后一页
    hasMore: function () {
      return !this.data.ending
    },
    // 现在的当前页
    getCurrentStart: function () {
      return this.data.start
    },
    // 初始化分页数据
    initPagination: function () {
      this.data.ending = false
      this.data.start = 0
      this.data.dataArray = []
      this.setData({
        dataArray: [],
        empty: false
      })
    },
    // 获取页面的数据
    getData: function () {
      //   http.request({
      //       url: '/kss/api/article/getArticleCategoryList',
      //       type: 1
      //     })
      //     .then(res => {
      //       console.log(res)
      //     })
      //     .catch(error => {
      //       console.log(error)
      //     })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('模拟异步')
          resolve('完成')
        }, 2000)
      })
    }
  }
})


export {
  paginationBev
}