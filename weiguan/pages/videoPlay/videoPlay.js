function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
    console.log(this.videoContext)
  },
  inputValue: '',
  data: {
    src: '',
    navTitle: ['详情', '课程', '相关推荐'],
    navContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.


Proin sodales pulvinar sic tempor.Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.`,
    topTitle : '交换生项目',
    videoTitle : '珠宝讲座 | 超50%中国区录取率，创意材料如何成功征服RCA',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ],
    bottomNav:[
      {name: '咨询'},
      {name: '收藏'}
    ],
    commentData:[
      { 
        userAvator:'../../asset/images/user1.png',
        userNanme: '湛蓝',
        scoreSum:new Array(4),
        scoreImg: '../../asset/images/score.png',
        date: '2018-5-2',
        content: 'Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes,Proin sodales pulvinar sic tempor. Sociis natoque magnis dis parturient montes'
      },
      {
        userAvator: '../../asset/images/user2.png',
        userNanme: '嗷呜喵',
        scoreSum: new Array(3),
        scoreImg: '../../asset/images/score.png',
        date: '2018-5-2',
        content: 'Nam fermentum, nulla luctus pharetra vulputate'
      }
    ],
    videoList: [
      {title: '交换生项目的考核标准有哪些？',techerName: '张老师 ', count: 2660},
      {title: '成功申请“交换生”的三因素',techerName: '张老师 ', count: 2660},
      {title: '艺术交换生”作品集准备周期',techerName: '张老师 ', count: 2660},
    ],
    listData: [
      {
      title:'一个“不正经”的鞋履设计史课程',
      img:"../../asset/images/list.png",
      content: "戏说鞋履发展历程，解锁文化造势的原始密码"
      },
      {
      title:'插画的历程——夜的八章曲',
      img:"../../asset/images/list.png",
      content: "夜的八章曲——畅游在绘画和插画交织的历史梦境中"
      }
    ],
    nowIndex: 0 
  },
  // goBack() {
  //   wx.navigateBack()
  // },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  // 监听视频播放进步
  timeupdate (e) {
    console.log(e.detail)
  },
  // 发送弹幕
  bindSendDanmu: function () {
    console.log(this.inputValue)
    // 发送弹幕
    console.log(this.videoContext)
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    });
    console.log(this.data.danmuList)
  },
  switchPage (e) {
    console.log(this.data.nowInde)
    console.log(e)
    this.setData({
      nowIndex:e.detail
    })
  }
})