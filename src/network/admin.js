import axios from "axios"
import {request, baseURL} from "./request"

export function getAbout(){
    return request({
        url: '/get_about'
    })
}

export function editAbout(aboutForm){
    return axios.post( baseURL + '/edit_about',aboutForm)
}


export function addComment(commentForm){
    // console.log('success')
    return axios.post(baseURL + '/api/add_comment',commentForm)
}

export function getComments(){
    return request({
        url: "/get_comments"
    })
}

export function deleteComments(comments){
    return axios.post(baseURL + '/api/delete_comments',comments)
}


export function deleteCategories(categories){
    return axios.post(baseURL + '/api/delete_categories',categories)
}


export function deletePosts(posts){
    return axios.post(baseURL + '/api/delete_posts',posts)
}

export function PostCanOrNot(post_id){
    return axios.post(baseURL + '' + "/api/post/" + post_id + '/can_comment',{'post_id':post_id})
    // return request({
    //     url: "/api/post/" + post_id + '/can_comment'
    // })
}

export function addCategory(category){
    return axios.post(baseURL + '/api/add_category',category)
}

export function PostAddLike(post_id){
    return axios.post(baseURL + '/post/'+ post_id + '/add_like',{'post_id':post_id})
}

export function CommentAddLike(comment_id){
    return axios.post(baseURL + '/comment/'+ comment_id + '/add_like',{'comment_id':comment_id})
}

export function renameCategory(category){
    return axios.post(baseURL + '/category/'+ category.id + '/rename',category)
}

export function getNews(){
    return request({
        url: '/get_news'
    })
}

export function addNews(news){
    return axios.post(baseURL + '/api/add_news',news)
}

export function addPost(post){
    return axios.post(baseURL + '/add_post',post)
}

export function editPost(post){
    return axios.post(baseURL + '/edit_post/' + post.id,post)
}

export function readNews(ids){
    return axios.post(baseURL + '/api/read_news',{'id':ids})
}

export function deleteNews(ids){
    return axios.post(baseURL + '/api/delete_news',{'id':ids})
}

export function uploadImage(formdata){
    return axios({
        url: baseURL + '/upload_image',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}