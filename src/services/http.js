import axios from 'axios'
import $config from '@/config/env'
import store from '@/store'
import router from '@/router'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = $config.baseUrl;

// http request 拦截器
axios.interceptors.request.use(
	config => {
		return config
	},
	err => {
		return Promise.reject(err)
	}
)
axios.interceptors.response.use(
	response => {
		
		return response
	},
	error => {
		if (error.response) {
			// store.dispatch('user/logout').then(() => {
            //     router.replace({
            //         path: '/login'
            //     })
            // })
			//    switch (error.response.status) {
			//      case 401:
			//        // 401 清除token信息并跳转到登录页面
			//        Auth.logout()
			//
			//        router.replace({
			//          path: 'login',
			//          query: {
			//            redirect: router.currentRoute.fullPath
			//          }
			//        })
			//    }
		}
		console.log(error)
		return Promise.reject(error)
	}
)
export default axios