<template>
	<div class="box">
		<div style="padding:10px 10px 0 10px;">
			<el-row type="flex" :gutter="0">
				<el-col :span="10">
					<el-input placeholder="请输入昵称" v-model="username" size="small" maxlength="10" show-word-limit>
						<template slot="prepend">昵称</template>
					</el-input>
				</el-col>
				<el-col :span="10" :offset="1">
					<el-input placeholder="请输入邮箱" v-model="email" size="small"  maxlength="32" show-word-limit>
						<template slot="prepend">邮箱</template>
					</el-input>
				</el-col>
			</el-row>
		</div>
		<div class="reply-box">
			<el-avatar class="avatar" :size="size"></el-avatar>
			<el-input type="textarea" v-model="comment" :placeholder="to" 
				maxlength="500" show-word-limit class="input" :autosize="{ minRows: minrows, maxRows: 3}" clearable>
			</el-input>
			<el-button type="primary" :size="size" class="reply" @click.native="submit">评论</el-button>
		</div>
	</div>
</template>

<script>
import {addComment, addNews} from "network/admin"
import { mapGetters } from 'vuex'

export default {
	name: 'ReplyBox',
	props:{
		size:{
			type:String,
			default(){
				return 'small'
			}
		},
		to:{
			type:String,
			default(){
				return '请输入内容'
			}
		},
		minrows:{
			type:Number,
			default(){
				return 1
			}
		},
		commentForm:{
			type: Object,
			default(){
				return {}
			}
		}
	},
	data(){
		return {
			comment: '',
			username:'',
			email:''
		}
	},
	components: {},
	computed:{
	},
	methods: {
		submit(){
			// console.log(this.email)
			const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,10})+/; //邮箱验证
			if (this.username === '') {
				this.$message.error('昵称不可为空')
				return
			}else if(this.email === '' || !mailReg.test(this.email)){
				this.$message.error('邮箱格式不正确，请重新输入')
				return
			}else if (this.comment === ''){
				this.$message.error('内容不可为空')
				return
			}
			this.commentForm.author = this.username
			this.commentForm.email = this.email
			this.commentForm.body = this.comment
			this.commentForm.timestamp = new Date().getTime()
			let comment = this.commentForm
			addComment(comment).then(res => {
				let news = {
					'author':comment.author,
					'timestamp':comment.timestamp,
					'body': comment.body,
					'post_id':comment.post_id * 1
				}
				addNews(news).then(res => {
					// console.log(res)
				})
			})
			this.comment = ''
			this.email = ''
			this.username = ''
			this.finishedSubmit(this.commentForm)
		},
		finishedSubmit(commentForm){
			this.$emit('submited',commentForm)

		}
	}
}
</script>
<style scoped>

.box{
	background-color:  rgb(248, 246, 246);
	border: 1px solid #fff;
}

.reply-box {
	/* background-color:  rgb(248, 246, 246); */
	display: flex;
	align-items: center;
	padding:10px 10px 10px 10px;
	

}
.avatar{
	margin:0 10px 0 0;
}
.input{
	width: 85%;
}

.reply {
	margin:0 10px;
}

</style>
