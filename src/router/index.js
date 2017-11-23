import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import asyncRouter from './asyncRouter'

import emptyPage from '@/layouts/empty'
import layout from '@/layouts/layout'

import index from '@/views/main'
import article from '@/views/article/publish'
import articleList from '@/views/article/list'
import login from '@/views/login'
import permission from '@/views/permission/permission'

Vue.use(Router)

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter) {
	//console.log(permission)
	return new Promise((resolve) => {
		const routers = asyncRouter[0]
		// 创建路由
		function createRouter(permission) {
			permission.forEach((item) => {
				//console.log(item)
				if (item.child && item.child.length) {
					// 递归
					createRouter(item.child)
				}
				let path = item.path
				// 循环异步路由，将符合权限列表的路由加入到routers中
				asyncRouter.find(function (s) {
					if (s.path == path) {
						s.meta.permission = item.permission
						routers.children.push(s)
						return
					}
				})
			})
		}

		createRouter(permission)
		resolve([routers])
	})
}


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
	component: layout
},{
	path: '/login',
	name: 'login',
	component: login
}]




const router = new Router({
	linkActiveClass: 'active',
	routes: routes
})

	
router.beforeEach((to, from, next) => {
	if (store.state.permission.list.length === 0) {
		store.dispatch('permission/getPermission').then(res => {
			// 匹配并生成需要添加的路由对象
			routerMatch(res, asyncRouter).then(data => {
				router.addRoutes(data)
			})
		}).catch(() => {
			// console.log('登录错误')
			// store.dispatch('user/logout').then(() => {
			// 	router.replace('/login')
			// })
		})

	} else {
		
	}
    next() 
})




export default router







