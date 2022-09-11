import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

// axios.create()  克隆axios
const requests = axios.create({
    timeout: 5000,
    baseURL: 'http://toutiao.itheima.net'
})
// const request2 = axios.create({
//     timeout: 5000,
//     baseURL: 'http://toutiao.itheima.net'
// })

// 请求拦截：请求做些事情
// config是每一次的请求的配置对象
// 必须每次都返回config
requests.interceptors.request.use(
    function (config) {
        // console.log(config)
        const {
            getters: { isLogin },
            state: { tokenObj }
        } = store
        if (isLogin) {
            config.headers.Authorization = `Bearer ${tokenObj.token}`
        }
        return config // 必须返回config
    },
    function (err) {
        console.log(err)
    }
)

export default requests
