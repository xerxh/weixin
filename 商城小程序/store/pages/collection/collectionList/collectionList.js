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
    more: { // 加载更多
      type: String,
      observer: function(newVal, old) {
        if(newVal != old){
          this.getdata()
        }
      },
      value: 1
    },
    search: {
      type: String,
      value: '',
      observer: function(newVal, old) {
        console.log('搜索', this.data.firstRender)
        console.log(this.data.dataArray)
        this.initPagination()
        this.getdata()
      }
    },
    // 是否第一次渲染
    firstRender: {
      type: Boolean,
      value: false,
      observer: function() {
        // 防止重复渲染
        if(this.data.search) return
        console.log("第一次渲染")
        this.getdata()
      }
    }
  },
  // 节点树完成，可以用setData渲染节点，但无法操作节点
  attached () {
    console.log('初始化')
    // 第一次数据初始化
    // this.getdata()
  },
  /**
   * 组件的初始数据
   */
  data: {
    paramsObj: {isHidden: true},
    isDetail: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取列表数据
    getdata: function (){
      if(!this.hasMore()){
        return
      }
      const pageindex = this.data.start
      const pagecount = this.data.count
      const search = this.data.search
      return collection.getMyCollection(search, pageindex, pagecount)
        .then(res => {
          let { data : {data: arr} } = res
          console.log(arr)
          this.setMoreData(arr)
        })
    },
    // 进入详情页面
    goDetail:function(e){
      console.log(e.detail.goodsID,'lesson')
      var id = e.detail.goodsID
      this.data.isDetail = true
      // 跳转到音乐列表
      wx.navigateTo({
        url: `/pages/musicList/musiclist?id=${id}`,
      })
    }
  }
})
