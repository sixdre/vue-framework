import axios from 'axios'
import $config from '@/config/env'
import Auth from './auth'
import router from '@/router'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = $config.baseUrl;

// http request 拦截器
axios.interceptors.request.use(
	config => {
		let token = Auth.getToken()
		if (token) {
			config.headers['x-access-token'] = token
		}
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
			switch (error.response.status) {
				case 401:
					// 401 清除token信息并跳转到登录页面
					Auth.logout()
					router.replace({
						path: 'login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					})
					break;
				case 403:
					alert('抱歉，您没有权限访问,请与系统管理员联系!');
					break;
			}
		}
		console.log(error)
		return Promise.reject(error)
	}
)
export default axios