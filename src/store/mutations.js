export default {
    addPosts(state,posts){
        state.posts = posts
    },
    addComment(state,comment){
        state.comments.push(comment)
    },
    addCategories(state,categories){
        state.categories = categories
    },
    logining(state){
        state.islogin = true
    },
    logouting(state){
        state.islogin = false
    },
    changeType(state,type){
        state.type = type
    }
}