import  {viewDiff}  from '@com/utils/index.js'

const state = {
    visitedViews: [],

}

const mutations = {
    ADD_VISITED_VIEW: (state, view) => {

        var query = new Object()
        Object.keys(view.query).map(i => {
            query[i] = view.query[i]
            return i
        })
        var a=viewDiff(state,view)

        if (a) return
        var newView = {
            path: view.path,
            fullPath: view.fullPath,
            query: view.query,
            name: view.name
            // querys: null,
            // title: null,
            // titleNameRouter: null,
            // id:null,
            // type: null,
        }
        state.visitedViews.push(
            Object.assign({}, newView, {
                title: view.meta.title || 'no-name',
                titleNameRouter: view.query.titleNameRouter || null,
                id:view.query.id||null,
                type: view.meta.type,
                querys: JSON.stringify(query) //路由query 被侦察了无法使用
            })
        )


    },

    DEL_VISITED_VIEW: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if(!v.titleNameRouter){
                if (v.path === view.path) {
                    state.visitedViews.splice(i, 1)
                    break
                }
            }else {
                if(JSON.parse(v.querys).typeView){
                    if (v.path === view.path&&v.id===view.id&&JSON.parse(v.querys).typeView==view.query.typeView) {
                        state.visitedViews.splice(i, 1)
                        break
                    }
                }else {
                    if (v.path === view.path&&v.id===view.id&&!view.query.typeView) {
                        state.visitedViews.splice(i, 1)
                        break
                    }
                }

            }
        }
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
        state.visitedViews = state.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path
        })
    },

    DEL_ALL_VISITED_VIEWS: state => {
        // keep affix tags
        const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
        state.visitedViews = affixTags
    },

    UPDATE_VISITED_VIEW: (state, view) => {
        for (let v of state.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view)
                break
            }
        }
    },
}

const actions = {
    addView({dispatch}, view) {
        dispatch('addVisitedView', view)
    },
    addVisitedView({commit}, view) {
        commit('ADD_VISITED_VIEW', view)
    },

    delView({dispatch, state}, view) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view)
            resolve({
                visitedViews: [...state.visitedViews],
            })
        })
    },
    delVisitedView({commit, state}, view) {
        return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view)
            resolve([...state.visitedViews])
        })
    },


    delOthersViews({dispatch, state}, view) {
        return new Promise(resolve => {
            dispatch('delOthersVisitedViews', view)
            resolve({
                visitedViews: [...state.visitedViews],
            })
        })
    },
    delOthersVisitedViews({commit, state}, view) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve([...state.visitedViews])
        })
    },

    delAllViews({dispatch, state}, view) {
        return new Promise(resolve => {
            dispatch('delAllVisitedViews', view)
            resolve({
                visitedViews: [...state.visitedViews],
            })
        })
    },
    delAllVisitedViews({commit, state}) {
        return new Promise(resolve => {
            commit('DEL_ALL_VISITED_VIEWS')
            resolve([...state.visitedViews])
        })
    },

    updateVisitedView({commit}, view) {
        commit('UPDATE_VISITED_VIEW', view)
    }
}




export default {
    namespaced: true,
    state,
    mutations,
    actions,
}