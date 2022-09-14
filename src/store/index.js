import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: 'toutiao',
            storage: window.sessionStorage,
            reducer({ tokenObj, mychannles }) {
                // const { tokenObj } = state
                return { tokenObj, mychannles }
            }
        })
    ],
    state: {
        tokenObj: {},
        mychannles: []
        // tokenObj: JSON.parse(window.localStorage.getItem('toutiao')) || {}
    },
    mutations: {
        SET_TOKE(state, token) {
            state.tokenObj = token
            // console.log(state, token, state.tokenObj)
            // window.localStorage.setItem('toutiao', JSON.stringify(token))
        },

        /***
         *@param {Array} channels 删除或者添加后的最新的channles
         * **/
        SET_MYCHANNLES(state, channels) {
            console.log(111111111)
            state.mychannles = channels
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
