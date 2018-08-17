// components/carrousel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      imgUrls:{
        type: Array,
        value : []
      },
      autoplay:{
        type: Boolean,
        value : true
      },
    // 自动切换时间间隔
      intervalTime:{
        type: Number,
        value : 5000
      },
    // 滑动动画时长
      durationTime:{
        type: Number,
        value: 1000
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange (e) {
      console.log(e)
      this.setData({
        swiperIndex : e.detail.current
      })
    }
  }
})
