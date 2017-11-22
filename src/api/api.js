import $http from '@/services/http'

export default {
    /**
     * 获取文章列表
     */
    getArticleList(page = 1, limit = 5) {
        return $http.get('/api/articles', { params: { currentPage: page, limit: limit } });
    },
    /**
     * 获取文章详情
     */
    getArticle(id) {
        return $http.get('/api/articles/' + id);
    },
    /**
     * 获取分类列表
     */
    getCategories(skip = 0, limit = 7) {
        return $http.get('/api/categories', { params: { skip: skip, limit: limit } });
    },
    getComments(id) {
        return $http.get('/api/comments/article/' + id );
    },
    getNavList() {

        return $http.get('/api/perpath');

        // return new Promise((resolve) => {
        //      var data = [
        //         {
        //             name: '文章',
        //             path: '/article',
        //             child: [
        //                 {
        //                     path: '/article/publish',
        //                     name: '文章发布',
        //                     //hidden:true,
        //                     permission: ['edit']
        //                 },
        //                 {
        //                     path: '/article/list',
        //                     name: '文章列表'
        //                 }
        //             ]
        //         }, {
        //             name: '文章2',
        //             path: '/article',
        //         }
        //     ]
        //     resolve(data)
        // })
    }
}