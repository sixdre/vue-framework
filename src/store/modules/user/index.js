import Api from '@/api/api'
import Auth from '@/services/auth'
import { Message } from 'element-ui';


const state = {
    // 用户名
    username:Auth.getUserName(),
    // token
    token: Auth.getToken(),
    // 角色分组
    role: Auth.getRole(),
    // 头像
    avatar: '../../../static/avatar.jpeg'
}

const getters = {}

const mutations = {
    setToken: (state, data) => {
        if(data){
            Auth.login(data)
        } else {
            Auth.logout()
        }
        state.token = data
    },
    setName: (state, data) => {
        Auth.setUserName(data);
        state.username = data
    },
    setRole: (state, data) => {
        Auth.setRole(data);
        state.role = data
    }
}

const actions = {
    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '')
            commit('setRole', '')
            commit('setName', '')
            commit('permission/setResources', [], { root: true });
            commit('permission/setList', [], { root: true })    // 调用permission模块的 mutations
            resolve()
        })
    },
    //获取当前登录用户信息
    getUserInfo({ commit }) {
        return new Promise((resolve, reject) =>{
            Api.getUserInfo().then((res) => {
                // 存储权限列表
                commit('permission/setList', res.data.menuList, { root: true });
                commit('permission/setResources', res.data.permissions, { root: true });
                resolve(res.data.menuList)
            }).catch(() => {
                reject()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}