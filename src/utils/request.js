import axios from 'axios'
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

export default requests
