import $http from '@/services/http'

export default {
    /**
     * 登录
     */
    login(username, password) {
        return $http.post('/api/login', { username: username, password: password });
    },
    getPermission(roleId) {
        return $http.post('/permission/getPermission', { roleId: roleId });
    },
    getPermissionForUpdate(roleId) {
        return $http.post('/permission/getPermissionForUpdate', { roleId: roleId });
    },
    createPermission(roleId, data) {
        return $http.post('/permission', { roleId, data });
    },
    createNewPermission(data) {
        return $http.post('/permission/v2/createPermission', data);
    },
    getNewPermission() {
        return $http.get('/permission/v2/getPermission');
    },
    getMenusPermission() {
         return $http.get('/permission/v2/getMenusPermission');
    },
    saveRolePermission( roleId, menus,resource) {
         return $http.post('/permission/v2/saveRolePermission', { roleId, menus,resource});
    },
    //获取角色
    getRoles() {
        return $http.get('/permission/roles');
    },
    //获取用户
    getUsers() {
        return $http.get('/users');
    },
    //更新或分配用户的角色
    updateUserRole(userId, roleId) {
        return $http.post('/users/role', { userId, roleId });
    },
    //创建角色
    createRole(name) {
        return $http.post('/permission/role', { name });
    },
    getMenuList() {

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