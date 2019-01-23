// components/searcch/inde.js
Component({
  // 外部样式属性
  externalClasses : ['clear-position'],
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: String,
    isShowBtn:{
      type: Boolean,
      value: false
    },
    isDisable:{
      type: Boolean,
      value: false
    },
    inputVal: String,
    // pleacholder:{
    //   type:String,
    //   value:'',
    //   observer: function (newVal, oldVal) {
    //     this.setData({
    //       pleacholder: newVal || oldVal
    //     })
    //   }
    // },
    // inputVal:{
    //   type:String,
    //   value:''
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowClear: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpSearch () {
      this.triggerEvent('jump')
    },
    search () {
      this.triggerEvent('search',{criteria: this.data.inputVal});
      // this.setData({
      //   inputVal: this.data.placeholder
      // })
    },
    getInput (e) {
      console.log(e)
      if(e.detail.value){
        this.setData({
          isShowClear: true,
          inputVal: e.detail.value
        })
      }else{
        // this.setData({
        //   isShowClear: false,
        //   inputVal: ''
        // })
        this.clearInput();
      }
      console.log('获取输入')
    },
    clearInput () {
      console.log('清空输入框')
      this.setData({
        inputVal: '',
        isShowClear: false
      })
      this.triggerEvent('clear')
    },
    searchData () {
      console.log('搜索')
    }
  }
})
