// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储
import layout from '@/layouts/layout'

import index from '@/views/main'
import article from '@/views/article/publish'
import articleList from '@/views/article/list'

const asyncRouter = [
    {
        path: '/asyncRouter',
        component: r => require.ensure([], () => r(require('@/layouts/layout')), 'layout'),
        children: []
    },
    {
        path: '/article',
     
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('@/layouts/layout')), 'article'),
    },
    {
        path: '/article/publish',
        component: r => require.ensure([], () => r(require('@/views/article/publish')), 'article'),
    },
    {
        path: '/article/list',
        component: r => require.ensure([], () => r(require('@/views/article/list')), 'article'),
    },
    
]

export default asyncRouter
