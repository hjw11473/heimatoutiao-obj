import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from 'views/Home/Home.vue'
// import videoi from 'views/videoi/videoi.vue'
// import wenda from 'views/Q&A/Q&A.vue'
// import My from 'views/my/my.vue'
// import login from 'views/my/login'
// import Layout from 'views/Layout/Layout.vue'
// import four from 'views/404/404.vue'

Vue.use(VueRouter)
// const routes = [
//     {
//         path: '/',
//         redirect: '/Layout'
//     },
//     {
//         path: '/Layout',
//         component: Layout,
//         redirect: '/Layout/Home',
//         children: [
//             {
//                 path: '/Layout/Home',
//                 component: Home
//             },
//             {
//                 path: '/Layout/videoi',
//                 component: videoi
//             },
//             {
//                 path: '/Layout/wenda',
//                 component: wenda
//             },
//             {
//                 path: '/Layout/My',
//                 component: My
//             }
//         ]
//     },
//     {
//         path: '/login',
//         component: login
//     },
//     {
//         path: '*',
//         component: four
//     }
// ]

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login')
    }
]

const router = new VueRouter({
    // mode: 'hash',
    routes
})

export default router
