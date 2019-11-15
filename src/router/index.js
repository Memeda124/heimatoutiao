import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout' // 简写路径
import Login from '../views/login'
import Home from '../views/home'
// import Home from '@/views/home'  @ 是Vuecli中提供的一种特殊的路径规则 表示 Src 目标路径
// 在 VueCli 创建的项目中，无论你在哪里使用 @ 符号，它永远指向 src
import Article from '../views/article'
import Publish from '../views/publish'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // 一级路由 主页
  {
    path: '/',

    component: Layout,
    children: [
      {
        path: '', // 默认子路由只能有一个
        component: Home
      },
      { // 文章列表
        path: '/article', // 默认子路由
        component: Article
      },
      { // 发布文章
        path: '/publish', // 默认子路由
        component: Publish
      }
    ]
  },
  {
    // 一级路由 登录页
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
