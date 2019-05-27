// components/classItem/classItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classContent: {
      type: Object,
      value: ''
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
    jumpDetail() {
      wx.navigateTo({
        url: '/pages/classDetail/classDetail',
      })
    }
  }
})
