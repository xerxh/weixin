// components/goodsitem/goodsitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    imagePath: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '名称'
    },
    price: {
      type: String,
      value: '人民币:10000'
    },
    btnName:{
      type: String,
      value: '打我啊'
    },
    isHidden: {
        type:Boolean,
        value:false
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    typeArr:["你打我啊","打你啊"]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
