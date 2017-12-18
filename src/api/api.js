import $http from '@/services/http'

export default {
    /**
     * 登录
     */
    login(username, password) {
        return $http.post('/api/login', { username: username, password: password });
    },
    //获取登录用户信息
    getUserInfo() {
        return $http.get('/api/users/info');
    },
    //创建权限
    createPermission(data) {
        return $http.post('/api/permission/createPermission', data);
    },
    //获取权限列表
    getPermissionList({page=1,limit=5}) {
        return $http.get('/api/permission/getPermission',{params:{page,limit}});
    },
    //根据前端菜单获取权限分类
    getMenusPermission() {
         return $http.get('/api/permission/getMenusPermission');
    },
    saveRolePermission( roleId, menus,resource) {
         return $http.post('/api/permission/saveRolePermission', { roleId, menus,resource});
    },
    getRolePermission(roleId) {
         return $http.get('/api/permission/getPermissionByRoleId',{params:{roleId}});
    },
    //获取tree类型菜单
    getMenuList() {
        return $http.get('/api/permission/menus');
    },
    //创建角色
    createRole(name) {
        return $http.post('/api/permission/createRole', { name });
    },
    //获取角色
    getRoles() {
        return $http.get('/api/permission/roles');
    },
    //获取用户
    getUsers() {
        return $http.get('/api/users');
    },
     //创建用户
    createUser(data) {
        return $http.post('/api/users', data);
    },
    //更新或分配用户的角色
    updateUserRole(userId, roleId) {
        return $http.post('/api/users/role', { userId, roleId });
    },

}