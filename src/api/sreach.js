import request from '@/utils/request'

/**
 * @param(*) q 搜索的关键字
 * @returns promise
 */

//  获取联想建议（自动补全）
export const getsuggestion = (q) => {
    return request({
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}

/**
 * @param {Number} page 页数，不传默认为1
 * @param {Number} page 每页数量，不传每页数量由后端决定
 * @param {String} page 搜索的关键字
 * @returns promise
 */

//  获取联想建议（自动补全）
export const getResultAPI = (page, res, q) => {
    return request({
        url: '/v1_0/search',
        params: {
            page,
            per_page: res,
            q
        }
    })
}
