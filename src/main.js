/** 
 * Created by xuhao on 2017/11/10.
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as api from './api/api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import formRule from '@/utils/form_rule';

Vue.use(ElementUI);
Vue.use(formRule);    //表单字段验证

Vue.config.productionTip = false;
Vue.prototype.$Api= api



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
