import { HTTP } from '../utils/http.js'

class My extends HTTP {
    constructor() {
        super()
    }

    // 获取用户信息
    getUserInfo() {
        return this.request({
            url: '/user/getUserInfo',
            data: {
              token: wx.getStorageSync('token')
            }
        })
    }

    // 获取我的课程
    getMyCourse(pageindex, pagecount) {
        return this.request({
            url: '/curriculum/getMyCurriculumList',
            data: {
                token: wx.getStorageSync('token'),
                pageindex,
                pagecount
            },
            method: 'post'
        })
    }

    // 获取我的订单列表
    getMyOrdersList(pageindex, pagecount) {
        return this.request({
            url: '/orders/getMyOrdersList',
            data: {
                token: wx.getStorageSync('token'),
                pageindex,
                pagecount
            },
            method: 'post'
        })
    }

    // 获取我的账户
    getMyAccount() {
        return this.request({
            url: '/user/getMyAccount',
            data: {
                token: wx.getStorageSync('token')
            }
        })
    }

    // 我的提现记录
    getMyExtract(type) {
        let params = {
            url : '/user/getMyAccountDetail',
            data: {
                token: wx.getStorageSync('token'),
                type
            }
        }
        return this.request(params)
    }

    // 可以购买会员列表
    getMemerDetail() {
        let params = {
            url: '/member/getMemberRuleList',
            data: {
                token: wx.getStorageSync('token')
            }
        }
        return this.request(params)
    }
    // 开通会员
    /**
     * @ memberRuleId 会员规则id
     * @ referrerNo 推荐人id
     * 
     */
    buyMember(memberRuleId, referrerNo) {
        let params = {
            url: '/orders/payweixin',
            data: {
                token: wx.getStorageSync('token'),
                memberRuleId,
                referrerNo
            },
            method: 'post'
        }
        return this.request(params)
    }

    // 购买之后的接口证实
    purchaseSuccess(orderNo) {
        let params = {
            url: '/orders/payVerify',
            data: {
                orderNo
            }
        }
        return this.request(params)
    }

    // 我的分销订单
    getShareOrder() {
        let params = {
            url: '/user/getUserDistributionDetail',
            data: {
                token: wx.getStorageSync('token')
            }
        }
        return this.request(params)
    }

    // 我的提现
    myGetMoney(money) {
        let params = {
            url : '/user/drawings',
            data: {
                money,
                token: wx.getStorageSync('token')
            }
        }
        return this.request(params)
    }
}

export { My }