import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>'

}).$mount('#app')
