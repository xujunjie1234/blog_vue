export default {
    isLogin(state){
        return state.islogin
    },
    getPosts(state){
        if (state.type === '全部') return state.posts
        return state.posts.filter(x => x.category === state.type)
    },
    getCategories(state){
        let res = [{'name':'全部','count':0}].concat(state.categories)
        return res
    },
    getType(state){
        return state.type
    }

}