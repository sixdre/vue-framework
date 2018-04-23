import * as Api from '@/api/api'
import Auth from '@/services/auth'
import $storage from '@/services/storage'
import { Message } from 'element-ui';


const state = {
    // 用户名
    username: $storage.user.getUserName(),
    // token
    token: $storage.user.getToken(),
    // 头像
    avatar: $storage.user.getAvatar(),
}

const getters = {}

const mutations = {
    setToken: (state, data) => {
        if (data) {
            Auth.login(data)
        } else {
            Auth.logout()
        }
        state.token = data
    },
    setName: (state, data) => {
        $storage.user.setUserName(data);
        state.username = data
    },
    setAvatar: (state, data) => {
        $storage.user.setAvatar(data);
        state.avatar = data
    },
}

const actions = {
    // 登出
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('setToken', '');
            resolve();
        })
    },
    // //获取当前登录用户信息
    // getUserInfo({ commit }) {
    //     return new Promise((resolve, reject) => {
    //         Api.getUserInfo().then((res) => {
    //             if (res.data.code === 'C10000') {
    //                 commit('permission/setList', res.data.data, { root: true });
    //                 resolve(res.data.data)
    //             } else {
    //                 Message.error(res.data.message)
    //                 reject()
    //             }
    //         }).catch(() => {
    //             reject()
    //         })
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}