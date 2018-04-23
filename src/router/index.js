import Vue from 'vue'
import Router from 'vue-router'
import asyncRouter from './asyncRouter'	
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import $config from '@/config/env'
import Auth from '@/services/auth'

NProgress.configure({ showSpinner: true });
Vue.use(Router)

//路由白名单（用于不需要验证的路由）
const whiteList = [
    '/login',
    '/403'
]

var routes = [{
	path: '/',
    name: 'index',
    children: [{
        path: '/',
        name: 'index',
        meta: {
            title:'首页',
        },
        component: r => require.ensure([], () => r(require('@/views/main'))),
    }],
	component: r => require.ensure([], () => r(require('@/layouts/layout'))),
},{
	path: '/login',
    name: 'login',
    component: r => require.ensure([], () => r(require('@/views/login')))
},{
    path: '/404',
    name: 'notFound',
    component: r => require.ensure([], () => r(require('@/views/auth/404')))
}, {
    path: '/403',
    name: 'forbidden',
    component: r => require.ensure([], () => r(require('@/views/auth/403')))
}]

var baseAsyncRouter = {
    path: '/asyncRouter',
    redirect: '/404',
    component: r => require.ensure([], () => r(require('@/layouts/layout'))),
    children: []
}

baseAsyncRouter.children = [...asyncRouter]
routes.push(baseAsyncRouter)

const router = new Router({
	linkActiveClass: 'active',
    routes: routes,
    mode: $config.routerMode,
})


router.beforeEach((to, from, next) => {
    NProgress.start();
    if (Auth.authenticated()) {
        if (to.path === '/login') { //已登录不可以再次回到登录页面，再次登录需要先退出系统
            router.replace('/')
        } else {
            if (to.matched.length) {
                next()
            } else {
                router.replace('/404')
            }
        }
    } else {
        if (whiteList.indexOf(to.path) >= 0) {
            next()
        } else {
            router.replace('/login')
            NProgress.done()
        }
    }
    next()

})

router.afterEach(() => {
    NProgress.done();
})

export default router