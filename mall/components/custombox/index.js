// components/custombox/index.js
Component({

// 外部样式类
  externalClasses: ['my-text-class','my-image-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
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

    itemBtn:function(e){

      console.log(e.currentTarget.dataset.id)
      var id = e.currentTarget.dataset.id
      var name = e.currentTarget.dataset.title
      this.triggerEvent('itemSkip', { itemid: id, title:name })

    }

  }
})
