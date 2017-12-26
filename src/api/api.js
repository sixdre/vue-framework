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
    //更新权限
    updatePermission(data) {
        return $http.post('/api/permission/updatePermission', data);
    },
    //创建菜单
    createMenu(data) {
        return $http.post('/api/permission/createMenu', data);
    },
    //删除菜单
    removeMenu(id) {
        return $http.delete('/api/permission/menus/'+id);
    },
    //更新菜单
    updateMenu(data) {
        return $http.post('/api/permission/updateMenu',data);
    },
    //获取权限列表
    getPermissionList({page=1,limit=5,group=0}) {
        return $http.get('/api/permission/getPermission',{params:{page,limit,group}});
    },
    //保存角色权限
    saveRolePermission( roleId, menus,resource) {
         return $http.post('/api/permission/saveRolePermission', { roleId, menus,resource});
    },
    //获取角色的权限
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
    //获取角色列表
    getRoles() {
        return $http.get('/api/permission/roles');
    },
    //获取用户列表
    getUsers({ page = 1, limit = 5 }) {
        return $http.get('/api/users',{params:{page,limit}});
    },
    //创建用户
    createUser(data) {
        return $http.post('/api/users', data);
    },
    //删除用户
    removeUser(id) {
        return $http.delete('/api/users/'+id);
    },
    //更新或分配用户的角色
    updateUserRole(userId, roleId) {
        return $http.post('/api/users/role', { userId, roleId });
    },

}