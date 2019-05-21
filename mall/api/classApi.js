// 课程api

// 查询子类别列表
const sonClassTypeListUrl = '/hart/category/selectCategoriesByParentId'
// 根据类别id查询课程列表
const queryClassListUrl = '/hart/curriculum/selectCurriculaByCategoryId'
// 根据课程id获取课程详情
const queryClassDetailUrl = '/hart/curriculum/selectCurriculumDetailById'
// 根据课程id获取章节音频列表
const queryChapterListUrl = '/hart/chapter/selectChapterListByCurriculumId'
// 根据id获取文稿详情
const chapterDetailUrl = '/hart/chapter/selectChapterDetailById'
// 获取章节评论列表
const chapterCommentListUrl = '/hart/chapter/selectCommentListByChapterId'
// 添加章节评论信息
const addCommentUrl = '/hart/chapter/addChapterComment'
// 评论添加点赞信息
const addCommentZanUrl = '/hart/chapter/addCommentLikeInfo'

export {
  sonClassTypeListUrl,
  queryClassListUrl,
  queryClassDetailUrl,
  queryChapterListUrl,
  chapterDetailUrl,
  chapterCommentListUrl,
  addCommentUrl,
  addCommentZanUrl
}