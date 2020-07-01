<template>
	<div class="comment-list">
		<div class="avatar">
			<el-avatar size="medium"></el-avatar>
		</div>
		<div class="content">
			<el-row type="flex" justify="space-between">
				<el-col :span="12" class="username">{{ comment.author}}</el-col>
				<el-col :span="4" align="right" v-if="$store.state.islogin">
					<el-button type="danger" icon="el-icon-delete" size="mini" plain @click="deleteItem"></el-button>
					<!-- <i class="el-icon-delete delete"></i> -->
				</el-col>
			</el-row>
			<div class="body">{{ comment.body}}</div>
			<div class="bottom">
				<div class="date">{{ comment.timestamp | date_diff }}</div>
				<div class="date-right">
					<!-- <i class="el-icon-thumb like" >  2</i> -->
					<div class="like" @click="likeClick()">
						<img src="~assets/like2.png" alt="" style="width:16px;height:15px;position:relative;top:2px">
						{{comment.like}}
					</div>
					<i class="el-icon-chat-square reply" @click="show_reply_box">
						<span v-if="!show">  回复</span>
						<span v-else>  取消回复</span>
					</i>
					<i class="el-icon-chat-dot-square show-sub-comment" @click="show_comment_box">
						<span v-if="comment.sub_comments.length === 0">暂无回复</span>
						<span v-else-if="!showCommentBox ">  查看{{comment.sub_comments.length}}条回复</span>
						<span v-else>  收起回复</span>
					</i>
				</div>
			</div>
			<div class="reply-box">
					<reply-box v-if="show" :size="'small'" 
					:to="'回复' + comment.author" @submited="submited"
					:commentForm="{'author':'游客','to':comment.author,'replied_id':comment.id,
												'post_id':comment.post_id, 'show':false,'like':0,'email':'',
												'timestamp':0, 'body':''}">
					</reply-box>
			</div>
			<div class="sub-comment-box" v-if="showCommentBox && comment.sub_comments.length > 0">
				<el-row type="flex" class="sort-comment" justify="end">
					<el-col :span="2" :class="{activeClass:index === currentIndex}"
						@click.native="sortClick(index)"
						v-for="(item,index) in ['最热','最新','最早']" :key="index">
						{{item}}<i class="el-icon-top"></i>
					</el-col>
				</el-row>
				<sub-comment-list :comment="sub_comment" @submited2="submited" @deleteItem="delComment"
					v-for="(sub_comment,index) in comment.sub_comments.slice((currentPage-1)*pageSize, currentPage*pageSize)" 
					:key="index+comment.author">
				</sub-comment-list>
				<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
					:current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[5]"
					layout="total,sizes, prev, pager, next, jumper" :total="comment.sub_comments.length" 
					v-if="comment.sub_comments.length > pageSize"
					class="pagination">
				</el-pagination>
			</div>
			<!-- <el-divider></el-divider> -->
		</div>
	</div>
</template>

<script>
import ReplyBox from "components/ReplyBox"
import SubCommentList from "components/SubCommentList"
import {dateDiff} from "common/dateDiff"

import {CommentAddLike,deleteComments} from "network/admin"

export default {
	name: 'CommentList',
	props:{
		comment:{
			type: Object,
			default(){
				return {}
			}
		}
	},
	data(){
		return {
			sub_comment: '',
			show: false,
			showCommentBox:true,
			currentPage: 1,
			pageSize: 5,
			currentIndex:0
		}
	},
	components: {
		ReplyBox,
		SubCommentList
	},
	methods: {
		likeClick(){
			CommentAddLike(this.comment.id).then(res => {
				this.comment.like += 1
			})
		},
		show_reply_box(){
			this.show = !this.show
			
		},
		submited(commentForm){
			this.comment.sub_comments.push(commentForm)
			this.show = false
			this.showCommentBox = true
		},
		show_comment_box(){
			this.showCommentBox = !this.showCommentBox
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
		deleteItem(){
			deleteComments({'comments':[this.comment]}).then(res => {
				this.$emit('deleteComment',this.comment.id)
			})
		},
		delComment(id){
			this.comment.sub_comments = this.comment.sub_comments.filter(x => x.id != id)
		},
		handleSizeChange(size){
			this.pageSize = size
		},
		handlePageChange(page){
			this.currentPage = page
		},
		sortClick(index){
			this.currentIndex = index
			switch (index){
				case 0:
					this.comment.sub_comments.sort((x,y) => y.like - x.like)
					break
				case 1:
					this.comment.sub_comments.sort((x,y) => y.timestamp - x.timestamp)
					break
				case 2:
					this.comment.sub_comments.sort((x,y) => x.timestamp - y.timestamp)
					break
			}
		}
	},
	filters:{
		date_diff(timestamp){
			return dateDiff(timestamp)
		}
	}
}
</script>
<style scoped>
.comment-list{
	display: flex;
	width: 87%;
	margin: 0 0 10px 20px;
}

.avatar{
	margin: 0 0px 0 40px;
	width: 8%;
}

.content{
	width: 100%;
	padding-bottom: 1px;
	border-bottom: 1px solid rgb(226, 226, 238);
}

.username{
	margin:0;
	color: deepskyblue;
}

.delete{
	cursor: pointer;
	color: #da5c2f;
}

.body{
	padding: 0px;
	margin: 10px 0;
	width: 100%;
	word-wrap: break-word;
	word-break: break-all;
	/* overflow: hidden; */
}

.bottom{
	display: flex;
	width: 100%;
	align-items: center;
	font-size: 14px;
}

.reply-box{
	margin: 0px 0 0 0;
	font-size: 14px;
}

.sort-comment{
	font-size: 12px;
	text-align: center;
	margin: 5px 30px 0;
	padding-top: 5px;
	cursor: pointer;
}

.date {
	flex: 1;
}

.date-right{
	width: 300px;
	display:flex;
	margin: 0;
	/* padding: 5px 0; */
	text-align: center;
}

.like {
	cursor: pointer;
	flex: 1;
	
}

.like:hover{
	color: deepskyblue;
}

.reply{
	flex:1;
	cursor: pointer;
	padding: 5px 0;
}

.reply:hover{
	color: deepskyblue;
}

.show-sub-comment{
	width: 140px;
	cursor: pointer;
	padding: 5px 0;
}

.show-sub-comment:hover{
	color: deepskyblue;
}

.pagination {
		/* margin-bottom: 10px; */
		height: 30px;
		display: flex;
		justify-content: center;
		background-color: #fff;
}

/* 二级评论 */
.sub-comment-box{
		background-color: rgb(248, 246, 246);
}

.activeClass{
	color:deepskyblue;
}

</style>
