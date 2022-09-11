import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: 'toutiao',
            storage: window.sessionStorage,
            reducer({ tokenObj }) {
                // const { tokenObj } = state
                return { tokenObj }
            }
        })
    ],
    state: {
        tokenObj: {},
        a: 1
        // tokenObj: JSON.parse(window.localStorage.getItem('toutiao')) || {}
    },
    mutations: {
        SET_TOKE(state, token) {
            state.tokenObj = token
            // console.log(state, token, state.tokenObj)
            // window.localStorage.setItem('toutiao', JSON.stringify(token))
        }
    },
    getters: {
        isLogin({ tokenObj }) {
            return !!tokenObj.token
        }
    }
})

// export default new Vuex.Store({
//     // state用来存放数据  使用的时候this.$store.state.count
//     // 查看数据的时候为this.$store
//     // state: {counnt:0},
//     state: {
//         count: 0
//     },
//     // 相当于计算属性
//     getters: {
//         setbun(state) {
//             return state.count * 100
//         }
//     },
//     // 相当于方法
//     mutations: {
//         setcount(state, payload) {
//             state.count += payload
//             console.log(state.count)
//         }
//     }
// })
