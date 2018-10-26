// components/show_list/show_list.js
import {HTTP} from "../../utils/http.js"
import { paginationBev } from "../behaviors/pagination.js"

let http = new HTTP()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 记录是否完成
    finished: false,
    // 记录是否正在进行中
    loading: false,
    loadingCenter: true,
  },
  // 在组件实例进入页面节点树时执行
  attached() {
    this.getData()
        .then(res => {
          this.setData({
            loadingCenter: false
          })
        })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
