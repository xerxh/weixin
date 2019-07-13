// pages/notification/notification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowSelect: false,
    isShowDel: false,
    btnName: ['删除', '全部已读'],
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    // 记录所有被选中的消息
    selectedArr: [],
    // 记录全选的状态
    allSelect: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (var i = 0; i < 3; i++) {
      let isSee = true
      if(i == 2) {
        isSee = false
      }
      this.data.items.push({

        content: "这里是消息，这里是消息，这里是消息，这里是消息这里是消息，这里是消息，这里是消息，这里是消息这里是消息，这里是消息，这里是消息，这里是消息这里是消息，这里是消息，这里是消息，这里是消息这里是消息，这里是消息，这里是消息，这里是消息这里是消息，这里是消息，这里是消息，这里是消息这里是消息，这里是消息，这里是消息，这里是消息",

        isTouchMove: false, //默认隐藏删除
        isSelected: false,
        id: i,
        isSee
      })

    }

    this.setData({

      items: this.data.items

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 // 长按显示删除
  touchLong() {
    console.log('长按')
    this.setData({
      isShowSelect: !this.data.isShowSelect
    })
  },

  // 切换选择
  selectSwitch(e) {
    console.log(e, '切换')
    //当前索引  当前选中的id
    let {index, id} = e.currentTarget.dataset
    let items = this.data.items
    let data = items[index]
    data.isSelected = !data.isSelected
    items[index] = data
    this.setData({
      items
    })
    // 如果选中放入
    if(data.isSelected){
      this.data.selectedArr = [...this.data.selectedArr, id]
      console.log(this.data.selectedArr)
    }else{ // 否则取消
      this.data.selectedArr = this.data.selectedArr.map((item) => {
        if(item != id){
          return item
        }
      })
    }
  },

  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.items.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })
    console.log(e)
    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      items: this.data.items

    })

  },

  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

      that.data.items.forEach(function (v, i) {

        v.isTouchMove = false

        //滑动超过30度角 return

        if (Math.abs(angle) > 30) return;

        if (i == index) {

          if (touchMoveX > startX) //右滑

            v.isTouchMove = false

          else //左滑

            v.isTouchMove = true

        }

      })

      //更新数据

      that.setData({

        items: that.data.items

      })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },
  
  // 删除消息
  delInfo(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let items = this.data.items
    items.splice(index, 1)
    this.setData({
      items
    })
    console.log('发送删除数据', id)
  },

  // 全选
  allSelect() {
    console.log('全选',)
    if (this.data.allSelect) {
      // 循环将选择全部变成false并将 id放入选择数组中
      let { items, arr } = this.upSelect(!this.data.allSelect)
      this.setData({
        items,
        allSelect: false
      })
      this.data.selectedArr = arr
    }else{
      let { items } = this.upSelect(!this.data.allSelect)
      this.setData({
        items,
        allSelect: true
      })
      this.data.selectedArr = []
    }
    
  },
  // 循环修改所有数据的 isSelected
  // codition 判断条件
  upSelect(condition) {
    let arr = []
    let items = this.data.items.map((item) => {
      arr.push(item.id)
      if (item == condition) {
        return item
      } else {
        item.isSelected = condition
        return item
      }
    })
    return {
      arr,
      items
    }
  },

  // 全部删除
  allDel() {
    console.log('发送全部删除数据')
    // 完成删除后将数据重置
    this.setData({
      items: [],
      allSelect: false,
      isShowSelect: false
    })
  }
})