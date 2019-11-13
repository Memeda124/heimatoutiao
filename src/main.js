import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false // 引入样式

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
