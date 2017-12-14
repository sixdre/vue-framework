import $Api from '@/api/api'
import Auth from '@/services/auth'
import { Message } from 'element-ui';


const state = {
    // uid
    uid: '',
    // 用户名
    username:Auth.getUserName(),
    // token
    token: '',
    // 角色分组
    role: Auth.getRole()
    // 头像
    // avatar: ''
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
            commit('permission/setList', [], { root: true })    // 调用permission模块的 mutations
            resolve()
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