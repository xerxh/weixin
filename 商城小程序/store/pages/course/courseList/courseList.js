// pages/course/courseList/courseList.js
import {paginationBev} from "../../../behaviors/pagination"
import { AllCourse } from '../../../models/course.js'
let allCourse = new AllCourse()
Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: { // 加载更多
      type: String,
      observer: function(newVal, old) {
        if(newVal != old){
          console.log('lallas')
          this.getdata()
        }
      },
      value: 1
    },
    search: {
      type: String,
      value: '',
      observer: function(newVal, old) {
        this.initPagination()
        if(this.data.url !== 'undefined') {
          this.getRecommend()
        }else{
          this.getdata()
        }
      }
    },
    categoryid: {
      type: String
    },
    url: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    paramsObj: {isHidden: true}
  },
  // 节点树完成，可以用setData渲染节点，但无法操作节点
  attached () {
    console.log('初始化')
    // 第一次数据初始化
    console.log(this.data.url)
    if(this.data.url !== 'undefined') {
      this.getRecommend()
    }else{
      this.getdata()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取列表数据
    getdata: function (){
      if(!this.hasMore()){
        return
      }
      const pageindex = this.data.start
      const pagecount = this.data.count
      const search = this.data.search
      const id = this.data.categoryid
      return allCourse.getGoodsList(id, search, pageindex, pagecount)
      .then(res => {
        let { data : {data: arr} } = res
        this.setMoreData(arr)
      })
    },
    // 获取首页推荐数据
    getRecommend() {
      console.log('获取数据')
      if (!this.hasMore()) {
        return
      }
      const pageindex = this.data.start
      const pagecount = this.data.count
      const search = this.data.search
      allCourse.getCategorData(this.data.url, pageindex, pagecount, search)
      .then(res => {
        let { data : {data: arr} } = res
        console.log(arr)
        this.setMoreData(arr)
      })
    },
    // 进入详情页面
    goDetail:function(e){
      console.log(e.detail.goodsID,'lesson')
      var id = e.detail.goodsID
      // 跳转到音乐列表
      wx.navigateTo({
        url: `/pages/musicList/musiclist?id=${id}`,
      })
    }
  }
})
