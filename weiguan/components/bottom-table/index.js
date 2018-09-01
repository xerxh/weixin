// components/navigator-table/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tList: {
      type: Array,
      value: [], //标题列表
    },
    nowIndex: {
      type: Number,
      value: 0
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
    switchTab(event) {
      let nowIndex = event.currentTarget.dataset.index;
      if (nowIndex !== this.properties.nowIndex){
        this.setData({
          nowIndex : nowIndex
        });
        let url = this.properties.tList[nowIndex].url;
        console.log(url+"?nowIndex="+nowIndex)
        wx.navigateTo({
          url: url+"?nowIndex="+nowIndex
        })
      }
    }
  }
})
