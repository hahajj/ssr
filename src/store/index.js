import Vuex from 'vuex'
import getters from './getters'

const store = new Vuex.Store({
    state: {
        userName: localStorage.getItem('DataMgr_userName') ? localStorage.getItem('DataMgr_userName') : "",
    },
    mutations: {
        updatePublishedName(state, data) {
            state.publishedName.splice(data,1);
        },
    },
    actions: {
        //拉取主题
        getUser({commit}) {
        },

    },
    // modules,
    // getters
})
export default store
