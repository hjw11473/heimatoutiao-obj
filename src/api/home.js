import request from '@/utils/request'

/**
 * @returns promise
 */

//  获取用户的频道列表
export const getuserchannel = () => {
    return request({
        url: '/v1_0/user/channels'
    })
}

/**
 * @returns promise
 */

//  获取所有的频道列表
export const getALLchannleAPT = () => {
    return request({
        url: '/v1_0/channels'
    })
}

/**
 * @param {Number | string} id 频道的id
 * @returns promise
 */

//  删除指定用户频道
export const getdelchannelAPT = (id) => {
    return request({
        url: `/v1_0/user/channels/${id}`,
        method: 'DELETE'
    })
}

/**
 *  新增频道
 * @param {Number | string} id 新增频道的id
 * @param {Number } seq 新增频道添加的索引值
 * @returns promise
 */

//  设置用户的频道（部分覆盖）
export const getaddchannelAPT = (id, seq) => {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data: {
            channels: [{ id, seq }]
        }
    })
}
