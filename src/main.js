import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../api/mock'


Vue.use(ElementUI)


import http from 'axios'
Vue.prototype.$http=http


Vue.config.productionTip = false
//js中想调用vuex的数据案例


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

