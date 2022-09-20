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

// 获取用户自己的信息
export const GetUsermsg = () => {
    return request({
        url: '/v1_0/user'
        // headers: {
        //     Authorization: `Bearer ${store.state.tokenObj.token}`
        // }
    })
}

/**
 *上传图片
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */
// 发送
export const Uploadphoto = (file) => {
    // 生成一个新的表单对象
    const fm = new FormData()
    fm.append('photo', file)

    return request({
        url: '/v1_0/user/photo',
        method: 'PATCH',
        data: fm
    })
}

/**
 *获取用户登录后的信息
 * @returns
 */
//
export const Getuserprofile = () => {
    return request({
        url: '/v1_0/user/profile'
    })
}

/**
 *修改用户登录后的用户资料
 * @returns
 */
//
export const Modifyuser = (data) => {
    return request({
        url: '/v1_0/user/profile',
        method: 'PATCH',
        data
    })
}
