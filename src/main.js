import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.use(ElementUI)
Vue.config.productionTip = false // 引入样式

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
