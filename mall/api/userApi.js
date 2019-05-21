// 用户api

// 查询用户购买课程
const userHasPayUrl = '/hart/curriculum/selectPayCurriculaById'
// 用户收藏取消收藏
const collectionUrl = '/hart/collect/changeCollectStatus'
// 用户收藏列表
const collectionClassListUrl = '/hart/collect/selectCollectListById'
// 用户登陆
const loginUrl = '/hart/weixin/login'
export {
  userHasPayUrl,
  collectionUrl,
  collectionClassListUrl,
  loginUrl
}