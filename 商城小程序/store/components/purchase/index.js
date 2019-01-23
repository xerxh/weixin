// components/purchase/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCollected:{
      type:Boolean,
      value:false
    },
    isPurchase: {
      type: Boolean,
      value: 1
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
    // 收藏
    collectedClicked:function(e){
      this.triggerEvent('collection')
    },
    // 购买
    purchaseClicked:function(e){
      this.triggerEvent('purchase')
    }
  }
})
