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
