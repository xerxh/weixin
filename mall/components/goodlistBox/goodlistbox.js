// components/goodlistBox/goodlistbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    paramsObj: {
      type: Object,
      value: {}
    },
    isShowLine: {
      type: Boolean,
      value: false
    }
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
    getMore: function(e) {
      // const paramsObj = this.data.paramsObj
      let paramsObj = {
        url: '/pages/index/index',
        title: '查看全部',
        categoryId: 2
      }
      console.log(paramsObj)
      wx.navigateTo({
        url: `/pages/course/course?url=${paramsObj.url}&title=${paramsObj.title}&id=${paramsObj.categoryId}`
      })
    }
  }
})
