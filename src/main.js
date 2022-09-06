import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入icon图标
import '@/assets/font_3632555_61u7vdwpq0f/iconfont.css'

// 引入vant2组件
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 引入rem
// eslint-disable-next-line import/first
import 'amfe-flexible'
// eslint-disable-next-line import/first
import 'postcss-pxtorem'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
