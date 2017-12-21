import Api from '@/api/api'
import Auth from '@/services/auth'
// import { Message } from 'element-ui';

const state = {
    // 完整权限列表（菜单列表）
    list: []
}

const getters = {}

const mutations = {
    setList: (state, data) => {
        state.list = data
    }
}

const actions = {
  
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}