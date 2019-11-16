import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout' // 简写路径
import Login from '../views/login'
import Home from '../views/home'
// import Home from '@/views/home'  @ 是Vuecli中提供的一种特殊的路径规则 表示 Src 目标路径
// 在 VueCli 创建的项目中，无论你在哪里使用 @ 符号，它永远指向 src
import Article from '../views/article'
import Publish from '../views/publish'
// 加载nprogress
import NProgress from 'nprogress'
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
// 路由的拦截器  beforeEach 方法  该方法会接收一个函数作为参数
// 参数1：to  表示去哪里的路由信息
// 参数2：from  表示来自哪里的路由信息
// 参数3：next  它是一个方法，用路由放行
// 我们具体要做的就是：判断用户的登录状态，有就通过，没有就跳转到登录页
router.beforeEach((to, from, next) => {
  // 开始顶部导航进度条特效
  NProgress.start()
  // console.log('啦啦啦')
  //  如果是非登录页面，我们才校验登录状态

  // 如果访问的是登录页面，则直接放行
  if (to.path === '/login') {
    next()

    // 停止代码往后执行
    return
  }

  // 获取用户token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有 token 有就通过
  if (token) {
    next()
  } else {
    // 没有跳转到登录页
    next('/login')

    // 如果在登录页面并且是非登录状态访问非登录页面，这里手动的终止进度条，否则进度条不会停止
    NProgress.done()
  }
})

router.afterEach((to, from) => {
  // 当路由导航结束以后触发的钩子函数
  NProgress.done()
})

export default router
