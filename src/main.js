import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Validate from '@/utils/validate.js'
import formatRules from './rulesConfig/dealRules'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Validate, formatRules)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
