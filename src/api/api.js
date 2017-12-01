import $http from '@/services/http'

export default {
   /**
     * 登录
     */
    login(username,password) {
        return $http.post('/api/login',{username:username,password:password});
    },
    getPermission(roleId) {
        return $http.get('/permission/'+roleId);
    },
    createPermission(data) {
        return $http.post('/permission', data);
    },
    getNavList() {

        return $http.get('/permission/menus');

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