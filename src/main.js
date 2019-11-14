import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.use(Element) // 注册整个的所有的elementUL组件 Vue.use调用了elementUI里面的一个方法 install

Vue.config.productionTip = false // 引入样式

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
