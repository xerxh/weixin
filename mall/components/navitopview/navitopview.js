// components/navitopview/navitopview.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['bg'],
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    url: {
      type: String,
      value: '',
      observer:function(newVal) {
        console.log(newVal)
      }
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
    goBack() {
      console.log('返回');
      console.log(this.data.url)
      if (this.data.url){
        wx.setStorageSync('myIndex', 3)
      }
      wx.navigateBack();
    },
  }
})
