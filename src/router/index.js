import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/Layout'),
        redirect: '/ ',
        children: [
            {
                path: '/ ',
                component: () =>
                    import(/* webpackChunkName:"base" */ '@/views/Home')
            },
            {
                path: '/videoi',
                component: () =>
                    import(/* webpackChunkName:"base" */ '@/views/videoi')
            },
            {
                path: '/QA',
                component: () =>
                    import(/* webpackChunkName:"base" */ '@/views/QA')
            },
            {
                path: '/my',
                component: () =>
                    import(/* webpackChunkName:"base" */ '@/views/my')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/search',
        component: () =>
            import(/* webpackChunkName:"search" */ '@/views/search')
    }
]

const router = new VueRouter({
    // mode: 'hash',
    routes
})

export default router
