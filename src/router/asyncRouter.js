// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储
const asyncRouter = [
    {
        path: '/article',
        name:'article',
        meta: {
            title:'文章',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('@/layouts/empty')), 'article'),
    },
    {
        path: '/article/list',
        name:'articleList',
        meta: {
            title:'文章列表',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('@/views/article/list')), 'article'),
    },
    
]

export default asyncRouter
