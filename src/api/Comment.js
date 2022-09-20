import request from '@/utils/request'

/**
 *  新增频道
 * @param {Number | string} data 获取评论的类型
 * @returns promise
 */

//  对文章或者评论进行评论
export const getcomments = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}

/**
 *  新增频道
 * @param {Number | string} data 获取评论
 * @returns promise
 */

//  获取评论或评论回复
export const getcomment = (params) => {
    return request({
        url: '/v1_0/comments',
        params
    })
}

/**
 *  新增频道
 * @param {Number | string} target 关注用户的id
 * @returns promise
 */

//  关注用户
export const addfollowings = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: { target }
    })
}

/**
 *  新增频道
 * @param {Number | string} target 关注用户的id
 * @returns promise
 */

//  取消关注用户
export const delfollowings = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`
    })
}

/**
 * @param {Number | string} target 点赞的文章id
 * @returns promise
 */

//  收藏文章
export const addcollections = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

/**
 * @param {Number | string} target 文章的id
 * @returns promise
 */

//  取消收藏文章
export const delcollections = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
        data: {
            target
        }
    })
}
