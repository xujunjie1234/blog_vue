<template>
	<div class="sub-comment-list">
		<div class="avatar">
			<el-avatar size="small"></el-avatar>
		</div>
		<div class="content">
			<div>
				<span class="username">{{ comment.author}}</span>
				回复
				<span class="username">{{ comment.to}}</span> ：
				<span @click="deleteClick"
						style="float:right;margin-right:10px;cursor:pointer;color:red;"
						v-if="$store.state.islogin">
					<i class="el-icon-delete"></i>
				</span>
			</div>
			<p class="body">{{ comment.body}}</p>
			<div class="bottom">
				<div class="date">{{ comment.timestamp | date_diff }}</div>
				<!-- <i class="el-icon-thumb like" >  2</i> -->
				<div class="like" @click="likeClick()">
						<img src="~assets/like2.png" alt="" style="width:16px;height:15px;position:relative;top:2px">
						{{comment.like}}
				</div>
				<i class="el-icon-chat-square reply" @click="show_reply_box">
					<span v-if="!show">  回复</span>
					<span v-else>  取消回复</span>
				</i>
			</div>
			<div  class="reply-box"  >
					<reply-box v-if="show" :size="'small'" :to="'回复' + comment.author" @submited="submited"
					:commentForm="{'author':'游客','to':comment.author,'replied_id':comment.replied_id,
												'post_id':comment.post_id, 'show':false,'like':0,'email':'',
												'timestamp':0, 'body':''}">
					</reply-box>
			</div>

		</div>
	</div>
</template>

<script>
import ReplyBox from "components/ReplyBox"
import {dateDiff} from "common/dateDiff"
import {CommentAddLike, deleteComments} from "network/admin"

export default {
	name: 'SubCommentList',
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
			show: false
		}
	},
	components: {
		ReplyBox
	},
	methods: {
		deleteClick(){
			deleteComments({'comments':[this.comment]}).then(res => {
				// console.log(res)
				// this.comment = ''
				this.$emit('deleteItem',this.comment.id)
			})
		},
		show_reply_box(){
			this.show = !this.show
		},
		submited(commentForm){
			this.show = false
			this.$emit('submited2',commentForm)
		},
		likeClick(){
			CommentAddLike(this.comment.id).then(res => {
				this.comment.like += 1
			})
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
.sub-comment-list{
	display: flex;
	width: 100%;
	background-color: rgb(248, 246, 246);
	margin: 0;
	padding: 10px 0 0px;
	border-bottom:2px solid #fff;
}

.avatar{
	/* flex: 1; */
	margin: 0 10px 0 10px;
	width: 6%;
}

.content{
	width: 100%;
	font-size: 14px;
	line-height: 100%;
	padding: 0;
}

.username{
	margin:0;
	color: deepskyblue;
}

.body{
	word-wrap: break-word;
	word-break: break-all;
	padding-right: 10px;
	letter-spacing:1px;
	line-height: 20px;
}

.bottom{
	display: flex;
	align-items: center;
	margin: 0 0 10px 0;
	font-size: 12px;
	padding: 0px;
}

.reply-box{
	margin: 20px 0 0 0;
	font-size: 12px;
}

.like {
	width: 10%;
	text-align: center;
	cursor: pointer;
	position: relative;
	bottom: 2px;
}

.like:hover{
	color: deepskyblue;
}

.date {
	flex:1;
}

.reply{
	text-align: center;
	width: 20%;
	cursor: pointer;
}

.reply:hover{
	color: deepskyblue;
}

</style>
