<template>
	<div class="admin">
		<nav-bar @typeChanged="changeType"></nav-bar>
		<el-tabs type="border-card" class="admin-box" 
		 	v-model="activeName" @tab-click="handleClick">
			 <el-tab-pane label="文章管理" name="post">
				<admin-posts></admin-posts>
			</el-tab-pane>
			<el-tab-pane label="评论管理" name="comment">
				<admin-comments></admin-comments>
			</el-tab-pane>
			<el-tab-pane label="分类管理" name="category">
				<admin-categories></admin-categories>
			</el-tab-pane>
			<el-tab-pane label="消息管理" name="new">
				<admin-news></admin-news>
			</el-tab-pane>
			<!-- <el-tab-pane label="关于我" name="about">
				关于我
			</el-tab-pane> -->
		</el-tabs>
		
	</div>
</template>

<script>

import NavBar from "components/NavBar"
import AdminComments from "./AdminComments"
import AdminPosts from "./AdminPosts"
import AdminCategories from "./AdminCategories"
import AdminNews from "./AdminNews"

export default {
	name: 'Admin',
	data(){
		return {
			activeName:'post',
			type:""
		}
	},
	components: {
		NavBar,
		AdminComments,
		AdminPosts,
		AdminCategories,
		AdminNews
	},
	created(){
		this.activeName = this.$route.params.type
		// console.log(this.activeName)
	},
	methods: {
		handleClick(tab,event){
			// console.log(tab,event)
			// this.activeName = tab.name
			if (this.$route.path.indexOf(this.activeName) === -1){
				this.$router.replace('/admin/' + tab.name)
			}
		},
		changeType(type){
			// console.log(type)
			this.activeName = type
		}
	},
	
}
</script>
<style scoped>
	.admin-box{
		width:70vw;
		margin: 20px auto;
	}

</style>
