import request from '@/utils/request'

/**
 * @param {string| Number} id 频道的id
 * @param { Number} timestamp 请求的推荐数据传当前的时间戳，请求数据
 * @returns
 */

//  获取新闻推荐列表
export const getarticles = (id, timestamp) => {
    return request({
        url: '/v1_0/articles',
        params: {
            channel_id: id,
            timestamp
        }
    })
}

/**
 * @param {string| Number} id 频道的id
 * @returns
 */

//  获取新闻详情
export const getarticlesID = (id) => {
    return request({
        url: `/v1_0/articles/${id}`
    })
}
