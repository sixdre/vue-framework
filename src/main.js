/** 
 * Created by xuhao on 2017/11/10.
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);


Vue.config.productionTip = false;
Vue.prototype.$Api= api



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
