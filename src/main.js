import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import axios from 'axios'
// import vueAxiox from 'vue-axios'

Vue.config.productionTip = false

import FastClick from 'fastclick'

FastClick.attach(document.body)

new Vue({
  // router,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
