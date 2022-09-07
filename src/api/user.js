import request from '@/utils/request'

/**
 *
 * @param {String} mobile
 * @param {Number} code
 * @returns
 */

export const login = (mobile, code) => {
    return request({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: {
            mobile,
            code
        }
    })
}

/**
 *
 * @param {String} mobile 手机号
 * @returns
 */

// 发送短信验证码接口
export const Getcodes = (mobile) => {
    return request({
        url: `/v1_0/sms/codes/${mobile}`
    })
}
