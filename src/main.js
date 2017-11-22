/** 
 * Created by xuhao on 2017/11/10.
 */

import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);


Vue.config.productionTip = false;
Vue.prototype.$Api= api

const hasPermission = {
    // eslint-disable-next-line
    install (Vue, options){
        Vue.mixin({
            methods:{
                hasPermission(data){
                    let permissionList = this.$route.meta.permission
                    if(permissionList && permissionList.length && permissionList.includes(data)){
                        return true
                    }
                    return false
                }
            }
        })
    }
}


Vue.use(hasPermission)





new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
