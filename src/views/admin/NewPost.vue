<template>
	<div class="edit">
			<el-page-header @back="goBack" content="文章编辑页面" class="header">
			</el-page-header>
			<el-input v-model="title" class="title" placeholder="请输入标题"
				maxlength="100" show-word-limit clearable>
				<template v-slot:prepend>标题</template>
			</el-input>
			<el-select v-model="category_id" placeholder="请选择分类" style="margin-left:20px">
				<el-option @click.native="itemClick"
					v-for="item in categories"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-button @click="submit" type="primary" size="medium" class="submit">发表</el-button>
			<mavon-editor v-model="body" ref="md" class="editor"
			:tabSize="4" @imgAdd="$imgAdd" @imgDel="$imgDel"
			></mavon-editor>
			
	</div>
</template>

<script>

import {addPost, uploadImage} from "network/admin"
import {getCategories} from "network/home"

export default {
	name: 'NewPost',
	data(){
		return {
			body: '',
			title: '',
			category_id:null,
			categories:[],
			// category:''
			post: {}
		}
	},
	components: {
	},
	created(){
		this._get_categories()
	},
	methods: {
		_get_categories(){
			getCategories().then(res => {
				this.categories = res.categories
			})
		},
		goBack(){
			this.$router.go(-1)
		},
		submit(){
			if (this.body === '' || this.title === '' || this.category_id === null){
				this.$message.error('格式错误')
				return
			}
			let postForm = {
				'title':this.title,
				'body':this.body,
				// 'body':this.$refs.md.d_value,
				'html':this.$refs.md.d_render,
				'timestamp': new Date().getTime(),
				'category_id':this.category_id
			}
			addPost(postForm).then(res => {
				// console.log(res)
				this.title = ''
				this.category_id = null
				this.body = ''
				this.$router.push('/post/' + res.data.post_id)
			})
			console.log(postForm)
		},
		itemClick(){
			// console.log(this.category_id)
		},
		$imgAdd(pos,$file){
			 // 第一步.将图片上传到服务器.
			// console.log(pos,$file)
			let formdata = new FormData();
			formdata.append('image', $file);
			// let $vm = this.$refs.md
			uploadImage(formdata).then((res) => {
					// console.log(url)
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
			// delete this.$refs.md.$
		}
	}
}
</script>
<style scoped>
.edit{
	margin:20px 0;
}

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

.category{
	margin-left: 5%;
	width: 45%;
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
