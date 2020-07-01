<template>
	<div class="edit-about">
			<el-page-header @back="goBack" content="编辑关于页面" class="header">
			</el-page-header>
			<el-input v-model="title" class="title" placeholder="请输入标题"
				maxlength="30" show-word-limit clearable>
				<template v-slot:prepend>标题</template>
			</el-input>
			<el-button @click="submit" type="primary" size="medium" class="submit">提交</el-button>
			<mavon-editor v-model="body" ref="md" class="editor"
			:tabSize="4" @imgAdd="$imgAdd" @imgDel="$imgDel"
			></mavon-editor>
			
	</div>
</template>

<script>

import {getAbout,uploadImage,editAbout} from 'network/admin'

export default {
	name: 'EditAbout',
	data(){
		return {
			title:'',
			body:'',
		}
	},
	components: {},
	created(){
		this._get_about()
	},
	methods: {
		_get_about(){
			getAbout().then(res => {
				this.body = res.body
				this.title = res.title
			})
		},
		goBack(){
			this.$router.go(-1)
		},
		submit(){
			let form = {
				'title':this.title,
				'body':this.body,
				'html':this.$refs.md.d_render,
				'timestamp':new Date().getTime()
			}
			editAbout(form).then(res => {
				// console.log(res)
				this.$router.push('/about')
			})
		},
		$imgAdd(pos,$file){
			 // 第一步.将图片上传到服务器.
			// console.log(pos,$file)
			let formdata = new FormData();
			formdata.append('image', $file);
			// let $vm = this.$refs.md
			uploadImage(formdata).then((res) => {
					console.log(res)
					if (res.data.type == 'error'){
						this.$message.error('图片格式错误，请输入正确的图片格式')
						// 格式不对则删除对应图片
						this.$refs.md.$refs.toolbar_left.$imgDelByFilename($file)
						return
					}
					// 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
					// console.log(this.$refs.md.d_render)
					this.$refs.md.$img2Url(pos, res.data.url);
			})
		},
		$imgDel(){

		}
	}
}
</script>
<style scoped>
.header{
	height: 50px;
	align-items: center;
	padding: 0 20px;
	margin-bottom: 10px;
	background-color: #fff;
}

.title{
	margin-bottom: 10px;
	width: 50%;
}


.submit{
	margin-left:30px;
}


.editor{
	height: 550px;
	width: 86%;
	position: fixed;
	margin: 0px auto;
}
</style>
