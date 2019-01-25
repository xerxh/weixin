// components/goodsitem/goodsitem.js
Component({
  /**
   * 组件的属性列表
   */

  externalClasses: ['lessongoods-img', 'external-width', 'items_fa', 'items_img', 'items_innner', 'item_text'], 
  // 启用插槽
  options: {
    multipleSlots: true
  },
  properties: {
    goodsId:{
      type:String,
      value:''
    },
    isvideo: {
      type: String,
      value: ''
    },
    artcleTiltle: {
      type: String,
      value:''
    },
    sum: {
      type: Number,
      value: ''
    },
    goodsName:{
      type: String,
      value: ''
    },
    imagePath: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: ''
    },
    btnName:{
      type: String,
      value: ''
    },
    isHidden: {
        type:Boolean,
        value:false
    },
    total: {
      type: Number,
      value: 1
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    typeArr:[]

  },

  /**
   * 组件的方法列表
   */
  methods: {

    goodsClicked:function(e){
      var goodsID = e.currentTarget.dataset.id
      var isvideo = e.currentTarget.dataset.isvideo

      this.triggerEvent('goDetail', { goodsID: goodsID, isvideo: isvideo, })

    }

  }
})
