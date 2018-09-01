// components/navigator-table/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tList:{
    type: Array,
      value: []
    }, //标题列表
    nowIndex:{
      type:Number,
      value:0
    },
    activeClass:{
      type:String,
      value:'activeDefault'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  created(){
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(event){
      var nowIndex = event.currentTarget.dataset.index;
      this.setData({
        nowIndex:nowIndex
      })
      // 触发事件 并传参
      this.triggerEvent('switchPage',nowIndex);
    }
  }
})
