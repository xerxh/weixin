// components/collection-advisory/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnName:{
      type: Array,
      value: ['收藏', '推荐']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChangeBg:false,
    // bg:{
    //   type: String,
    //   value: 'bg'
    // }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    saveCollection (e) {
      let isChangeBg = this.data.isChangeBg;
      console.log(e);
      let index = e.currentTarget.dataset.index;
      if(index == 0){
        if (isChangeBg){
          this.setData({
            btnName: ['收藏', '推荐'],
            isChangeBg: !isChangeBg
          })
        }else{
          this.setData({
            btnName: ['已收藏', '推荐'],
            isChangeBg: !isChangeBg
          })
        }
      }else{
        
      }
    }
  }
})
