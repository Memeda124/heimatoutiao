import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import JSONbig from 'json-bigint'
import 'nprogress/nprogress.css' // 加载 nprogress 中的指定样式文件
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }
}]
// axios 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的 config 是本次请求相关的配置对象
  // config 就是最后要发给后端的那个配置对象
  // 我们可以在拦截器中对 config 进行统一配置定制
  console.log('请求拦截器', config)

  const token = window.localStorage.getItem('user-token')

  // 统一添加 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // return config 是通行的规则
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios 响应拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('响应拦截器')
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.use(Element) // 注册整个的所有的elementUL组件 Vue.use调用了elementUI里面的一个方法 install

Vue.config.productionTip = false // 引入样式

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
