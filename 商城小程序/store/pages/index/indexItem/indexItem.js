// pages/collection/collectionList/collectionList.js
import {paginationBev} from "../../../behaviors/pagination"
import { Collection } from '../../../models/collection'
let collection = new Collection()

Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    paramsObj: {
      type: Object,
      value: {}
    },
    dataArray: {
      type: Array,
      value: []
    }
  },
  // 节点树完成，可以用setData渲染节点，但无法操作节点
  attached () {

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
    // 进入详情页面
    goDetail:function(e){
      console.log(e.detail.goodsID,'lesson')
      var id = e.detail.goodsID
      // 跳转到音乐列表
      wx.navigateTo({
        url: `/pages/musicList/musiclist?id=${id}`,
      })
    }
  }
})
