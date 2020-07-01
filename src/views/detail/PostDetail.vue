<template>
			<el-container class="content">
				<el-header>
					<el-row type="flex" justify="space-between">
						<el-col :span="18" class="title">{{post.title}}</el-col>
						<el-col :span="4" align="center"  class="edit" v-if="$store.state.islogin">
							<el-button type="primary" size="mini" @click="editClick">编辑</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="20" class="time">
						<el-col :span="6">{{ post.time}}</el-col >
						<el-col :span="4"> <i class="el-icon-view"></i> {{ post.view }}</el-col >
						<el-col :span="6">
							<img src="~assets/like2.png" alt="" style="width:16px;height:15px;position:relative;top:3px;">
							  {{ post.like }}
						</el-col >
					</el-row>
				</el-header>
				<div class="markdown-body body" v-html="post.html || post.body"></div>
				<div class="body-bottom">
					<el-divider >
						<div class="like" @click="likeClick()">
							<span class="like-img">
								<img src="~assets/like2.png" alt=""  style="width:25px;height:25px;position:relative;top:10px;">
							</span>
							<span class="like-count">{{post.like}}</span>
						</div>
					</el-divider>
					<el-row :gutter="20" type="flex" justify="space-between">
						<el-col :span="10">
							共{{post.comments && post.comments.length}}条评论
							<i class="el-icon-edit"></i>
						</el-col>
						<el-col :span="4" style="text-align:right">
							<el-dropdown class="dropdown">
								<span class="el-dropdown-link">
									排序<i class="el-icon-sort"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="sortComment('hot')">最热</el-dropdown-item>
									<el-dropdown-item @click.native="sortComment('new')">最新</el-dropdown-item>
									<el-dropdown-item @click.native="sortComment('old')">最早</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-col>
					</el-row>
				</div>
				<div v-if="post.can_comment">
					<div style="width:96%;margin:0 auto;">
						<reply-box size="medium" :minrows="2" @submited="submited"
							:commentForm="{'author':'游客','to':null,'replied_id':null,'email':'',
														'post_id':post_id, 'show':true,'like':0,
														'timestamp':0, 'body':'','sub_comments':[]}"
									>
						</reply-box>
					</div>
					<el-container>
						<el-main>
							<comment-list :comment="item" @deleteComment="delComment"
								v-for="(item,index) in comments.slice((currentPage-1)*pageSize, currentPage*pageSize)" 
								:key="index+item.author"></comment-list>
							<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
								:current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[5,10]"
								layout="total, sizes, prev, pager, next, jumper" :total="comments.length"
								class="pagination">
							</el-pagination>
						</el-main>
						<!-- <el-footer></el-footer> -->
					</el-container>
				</div>
				<div v-else>
					<el-divider class="close">评论功能已关闭</el-divider>
				</div>
			</el-container>
			
</template>

<script>
import CommentList from "components/CommentList"
import ReplyBox from "components/ReplyBox"

import {getPost, getCommentsData} from "network/home"
import {PostAddLike} from "network/admin"

// import marked from "marked"

export default {
	name: 'PostDetail',
	data(){
		return {
			post:{},
			comments:[],
			currentPage: 1,
			pageSize: 5,
			post_id: null,
			body:'',
			ip:'',
		}
	},
	components: {
		CommentList,
		ReplyBox
	},
	created(){
		this.post_id = this.$route.params.id
		this._get_post(this.$route.params.id)
	},
	mounted(){
		this.ip = sessionStorage.getItem('ip')
		console.log(this.ip)
	},
	computed:{
	},
	methods: {
		_get_post(post_id){
			getPost(post_id).then(res => {
				this.post = res.post
				// this.body = marked(this.post.body)
				// console.log(this.post)
				this.comments = this.post.comments.filter(a => a.show)
			})
		},
		sortComment(type){
			switch (type){
				case 'hot':
					this.comments.sort((x,y) => y.like - x.like)
					break
				case 'new':
					this.comments.sort((x,y) => y.timestamp - x.timestamp)
					break
				case 'old':
					this.comments.sort((x,y) => x.timestamp - y.timestamp)
					break
			}
		},
		delComment(id){
			this.comments = this.comments.filter(x => x.id != id)
		},
		
		handleSizeChange(size){
			this.pageSize = size
		},
		handlePageChange(page){
			this.currentPage = page
		},
		submited(commentForm){
			if (!this.post.comments) return
			this.post.comments.push(commentForm)
			this.comments.push(commentForm)
		},
		likeClick(){
			PostAddLike(this.post.id).then(res => {
				this.post.like += 1
			})
		},
		editClick(){
			this.$router.push('/editPost/' + this.post_id)
		},
		

	}
}
</script>
<style scoped>
.content {
	margin-left: 10px;
	margin-top: 0%;
	font-size: 18px;
	background-color: #fff;
}

.time {
	font-size: 12px;
}

.title {
	font-size: 22px;
	margin: 15px 0 ;
}

.edit{
	/* line-height: 100%; */
	margin: auto 0;
}


.body{
	margin: 30px 0 40px 0;
	font-size: 18px;
	padding: 0 20px;
}

.body-bottom{
	width: 96%;
	margin: 10px auto;
}

.dropdown{
	cursor: pointer;
}

.reply-box{
	width: 94%;
	margin: 0 auto;
	/* text-align: center; */
}

.pagination {
		margin-bottom: 10px;
		height: 20px;
		display: flex;
		justify-content: center;
}

.close{
	width: 96%;
	margin: 0 auto 40px;
}

.like{
	cursor:pointer;
	/* font-size:18px; */
	
}

.like-img{
	display:inline-block;
	width:50px;
	height:50px;
	text-align:center;
	border-radius:50%;
	border: 1px solid deepskyblue;
}

.like-count{
	font-size:20px;
	text-align:center;
	margin-left:10px;
	position:relative;
	top:5px;
}

.like:hover{
	color:deepskyblue;
}
</style>
