// pages/my/myCourse/myCourse.js
import {paginationBev} from "../../../behaviors/pagination"
import { My } from "../../../models/my"
const my = new My()

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
          this.getMyCourse()
        }
      },
      value: 1
    }
  },
  // 节点树完成，可以用setData渲染节点，但无法操作节点
  attached () {
    console.log('初始化')
    // 第一次数据初始化
    this.getMyCourse()
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMyCourse() {
      if(!this.hasMore()){
        return
      }
      const pageindex = this.data.start
      const pagecount = this.data.count
      my.getMyCourse(pageindex, pagecount)
        .then(res => {
          console.log(res)
          this.setMoreData(res.data.data)
        })
    },
    // 跳转课程列表
    jumpCourseList(e) {
      console.log(e)
      wx.navigateTo({
        url: `/pages/musicList/musiclist?id=${e.currentTarget.dataset.id}`
      })
    }
  }
})
