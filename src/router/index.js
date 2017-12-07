import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Auth from '@/services/auth'
import asyncRouter from './asyncRouter'

Vue.use(Router)

//路由白名单（用于不需要验证的路由）
const whiteList = [
    '/login',
    '/register'
]

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
                if (item.child && item.child.length) {
                    // 递归
                    createRouter(item.child)
                }
                let path = item.path
                    // 循环异步路由，将符合权限列表的路由加入到routers中
                asyncRouter.find(function(s) {
                    if (s.path == path) {
                        s.meta.permission = item.permission
                        routers.children.push(s)
                        return;
                    }
                })
            })
        }
        if (!permission || !permission.length) {
            resolve([]);
            return;
        }
        createRouter(permission)
        resolve([routers])
    })
}


//初始化的路由
var routes = [{
    path: '/',
    name: 'index',
    component: r => require.ensure([], () => r(require('@/layouts/layout')))
}, {
    path: '/login',
    name: 'login',
    component: r => require.ensure([], () => r(require('@/views/login')))
}, {
    path: '/404',
    name: 'notFound',
    component: r => require.ensure([], () => r(require('@/views/auth/404')))
}]



const router = new Router({
    linkActiveClass: 'active',
    routes: routes
})




router.beforeEach((to, from, next) => {
    if (Auth.getToken() && Auth.getRole()) {
        if (to.path === '/login') {     //已登录不可以再次回到登录页面，再次登录需要先退出系统
            router.replace('/')
        } else {
            if (store.state.permission.list.length === 0) { //页面刷新需要重新请求
                store.dispatch('permission/getPermission').then(res => {
                    // 匹配并生成需要添加的路由对象
                    routerMatch(res, asyncRouter).then(data => {
                        if (!data || !data.length) {
                            next()
                        } else {
                            router.addRoutes(data)
                            next({ ...to}) 
                        }
                    })
                }).catch(() => {
                    // console.log('登录错误')
                    // store.dispatch('user/logout').then(() => {
                    // 	router.replace('/login')
                    // })
                })
            } else {
                if (to.matched.length) {
                    // if(whiteList.indexOf(to.path) < 0){
                    // 	// store.dispatch('user/actionlog', to)
                    // }
                    next()
                } else {
                    router.replace('/404')
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) >= 0) {
            next()
        } else {
            router.replace('/login')
        }
    }

})




export default router