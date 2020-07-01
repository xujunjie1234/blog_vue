import {request} from "./request"

export function getPostsData() {
    return request({
        url: "/get_posts"
    })
}

export function getCommentsdata(post_id) {
    return request({
        url: "/post/" + post_id + '/comment'
    })
}

export function getPost(post_id){
    return request({
        url: "/post/" + post_id,
        // params:{post_id}
    })
}

export function getInfo(){
    return request({
        url: "/get_info"
    })
}

export function getCategories(){
    return request({
        url: "/get_categories"
    })
}