import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/base.scss'
import 'jquery'
import 'jquery-ui'
import Properties from './properties'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Properties)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
