// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储
const asyncRouter = [
    {
        path: '/asyncRouter',       //这个用作动态路由的父页
        component: r => require.ensure([], () => r(require('@/layouts/layout')), 'layout'),
        children: []
    },
    {
        path: '/article',
        redirect: '/article/publish',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('@/layouts/empty')), 'article'),
    },
    {
        path: '/article/publish',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('@/views/article/publish')), 'article'),
    },
    {
        path: '/article/list',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('@/views/article/list')), 'article'),
    },
    {
		path: '/permission',
        name: 'permission',
        meta:{
            permission:[]
        },
		component: r => require.ensure([], () => r(require('@/views/permission/permission')), 'permission'),
	}
    
]

export default asyncRouter
