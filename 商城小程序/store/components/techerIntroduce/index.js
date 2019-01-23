// components/techerIntroduce/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teacherList:{
       type: Array,
       value: [],
       obsever:function(newVal, oldVal){
          console.log(newVal)
          console.log(oldVal)
       }
    },

    // isHidden:{
    //   type: Boolean,
    //   value: false,

    // }
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

  }
})
