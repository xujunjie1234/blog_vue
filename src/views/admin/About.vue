<template>
	<div class="about">
		<nav-bar></nav-bar>
		<div class="content">
			<el-row type="flex" justify="space-between" align="center">
				<el-col :span="10" class="title">{{admin.title}}</el-col>
				<el-col align="right" class="time" :offset="6" :span="6" >更新于 {{admin.timestamp | dateFormatter}}</el-col>
				<el-col align="right" v-if="$store.state.islogin" :span="2">
					<el-button type="primary" size="mini" @click="editClick">编辑</el-button>
				</el-col>
			</el-row>
			<div class="markdown-body body" v-html="admin.html"></div>
		</div>
	</div>
</template>

<script>
import NavBar from "components/NavBar"
import {getAbout} from "network/admin"

export default {
	name: 'About',
	data(){
		return {
			admin:{}
		}
	},
	components: {
		NavBar
	},
	created(){
		this._get_admin()
	},
	methods: {
		_get_admin(){
			getAbout().then(res => {
				this.admin = {
					'title':res.title,
					'body':res.body,
					'html':res.html,
					'timestamp':res.timestamp
				}
				console.log(this.admin.timestamp)
			})
		},
		editClick(){
			this.$router.push('/editAbout')
		},
	},
	filters:{
			dateFormatter(timestamp){
			let date = new Date(timestamp)
			let year = date.getFullYear()
			let month = date.getMonth()+1
			let day = date.getDate()
			return year + '年' + month + '月' + day + '日'
		}
	}
}
</script>
<style scoped>


.content{
	background-color: #fff;
	margin:10px auto;
	width:80%;
	height: 100%;
	padding: 20px;
}

.time{
	/* margin:0 20px; */
	padding: 5px 20px;
	font-size: 12px;
	/* line-height: 100%; */
	align-items: center;
	align-content: center;
}

.title{
	font-size: 20px;
}
</style>
