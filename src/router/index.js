import Vue from 'vue'
import Router from 'vue-router'

import asyncRouter from './asyncRouter'
	
import emptyPage from '@/layouts/empty'
import layout from '@/layouts/layout'

import index from '@/views/main'
import article from '@/views/article/publish'
import articleList from '@/views/article/list'
import login from '@/views/login'
Vue.use(Router)

// {
// 	path: '/article',
// 	name: 'article',
// 	redirect: '/article/publish',
// 	component: layout,
// 	children: [
// 		{
// 			path: 'publish',
// 			name: '发布文章',
// 			component: article,
// 		},
// 		{
// 			path: 'list',
// 			name: '文章列表',
// 			component: articleList,
// 		},
// 	]
// }


var routes = [{
	path: '/',
	name: 'index',
	redirect: '/article/publish',
	component: index
},{
	path: '/login',
	name: 'login',
	component: login,
}]

routes.push(...asyncRouter)

console.log(routes)

export default new Router({
	linkActiveClass: 'active',
    routes: routes
})
