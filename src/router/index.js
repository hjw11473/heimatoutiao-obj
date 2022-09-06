import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home/Home.vue'
import videoi from 'views/LookingRoom/videoi.vue'
import RealTimeinfo from 'views/realtimeinfo/realtimeinfo.vue'
import My from 'views/my/my.vue'
import Layout from 'views/Layout/Layout.vue'
import four from 'views/404/404.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/Layout'
    },
    {
        path: '/Layout',
        component: Layout,
        redirect: '/Layout/Home',
        children: [
            {
                path: '/Layout/Home',
                component: Home,
                meta: { title: '首页' }
            },
            {
                path: '/Layout/videoi',
                component: videoi,
                meta: { title: '找房' }
            },
            {
                path: '/Layout/RealTimeinfo',
                component: RealTimeinfo,
                meta: { title: '资讯' }
            },
            {
                path: '/Layout/My',
                component: My,
                meta: { title: '我的' }
            }
        ]
    },
    {
        path: '*',
        component: four
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
