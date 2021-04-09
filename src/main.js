import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(Vuesax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

