import Vue from 'vue'
import Router from 'vue-router'

import emptyPage from '@/layouts/empty'
import layout from '@/layouts/layout'

import index from '@/views/main'
import article from '@/views/article/publish'
import articleList from '@/views/article/list'
import login from '@/views/login'
Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
    routes: [{
      	path: '/',
      	name: 'index',
      	redirect: '/article/publish',
      	component: index
	},{
      	path: '/article',
      	name: 'article',
      	redirect: '/article/publish',
      	component: layout,
      	children: [
	        {
		        path: 'publish',
		        name: '发布文章',
		        component: article,
	        },
	        {
		        path: 'list',
		        name: '文章列表',
		        component: articleList,
	        },
      	]
    },{
      	path: '/login',
      	name: 'login',
      	component: login,
    }]
})
