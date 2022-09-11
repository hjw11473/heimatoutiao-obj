import request from '@/utils/request'

/**
 * @returns promise
 */

//  获取所有频道列表
export const getchannel = () => {
    return request({
        url: '/v1_0/channels'
    })
}
