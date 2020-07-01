<template>
	<div class="nav-bar">
		<div  mode="horizontal" class="menu">
			<div style="width:23%">
				<slot name="logo"></slot>
			</div>
			<div  class="item" @click="homeClick">
				<i class="el-icon-s-home" style="padding-bottom:3px"></i> 首页
			</div>
			
			<div  class="item" @click="summaryClick">
				<i class="el-icon-s-operation" ></i> 归档
			</div>
			<div  class="item" @click="aboutClick">
				<i class="el-icon-info" style="padding-bottom:3px"></i> 关于我
			</div>
			<div class="search">
				<el-input v-model="keyword" placeholder="请输入关键词" size="small" clearable
					  @keyup.enter.native="searchSubmit">
					<i slot="prefix" class="el-icon-search" style="position:relative;top:10px;left:5px;"></i>
				</el-input>
				<!-- <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left:10px;" ></el-button> -->
			</div>
			<div  class="setting" v-if="isLogin">
				<el-row :gutter="30" justify="space-around" align="middle" >
					<el-col :span=8 @click.native="editClick" style="position:relative;top:7px;cursor:pointer;">
						<i class="el-icon-edit-outline" style="font-size:26px;color:deepskyblue;"></i>
					</el-col>
					<el-col :span=8 @click.native="infoClick()" style="position:relative;top:10px;cursor:pointer;">
							<el-badge :value="news" :max="99" :hidden="news == 0" >
								<i class="el-icon-bell" style="font-size:22px;"></i>
							</el-badge>
					</el-col>
					<el-col :span=8 style='cursor:pointer'>
						<el-dropdown trigger="click" placement="bottom" >
							<span class="el-dropdown-link" >
								<el-avatar size="medium" > admin </el-avatar>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="adminPage('post')">管理文章</el-dropdown-item>
								<el-dropdown-item @click.native="adminPage('comment')">管理评论</el-dropdown-item>
								<el-dropdown-item @click.native="adminPage('category')">管理分类</el-dropdown-item>
								<el-dropdown-item @click.native="adminPage('new')">管理通知</el-dropdown-item>
								<!-- <el-dropdown-item @click.native="adminPage('about')">关于我</el-dropdown-item> -->
								<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-row>
			</div>
			<div class="login" @click="login" v-else>
				<i class="el-icon-user" style="padding-bottom:3px"></i>登陆
			</div>

		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import {getNews} from "network/admin"

export default {
	name: 'NavBar',
	data(){
		return {
			activeIndex: '1',
			keyword: '',
			news:0,
		}
	},
	components: {},
	created(){
		this._get_news()
		
	},
	computed:{
		...mapGetters(['isLogin'])
	},
	methods: {
		
		...mapMutations(['logouting']),
		_get_news(){
			getNews().then(res => {
				this.news = res.news.filter(x => !x.reviewed).length
			})
		},
		handleSelect(key,keypath) {
			// console.log(key,keypath)
		},
		homeClick(){
			if (this.$route.path.indexOf('/home') === -1){
				this.$router.push('/home')
			}
		},
		summaryClick(){
			if (this.$route.path.indexOf('/summary') === -1){
				// this.$router.push('/summary')
			}
		},
		aboutClick(){
			if (this.$route.path.indexOf('/about') === -1){
				this.$router.push('/about')
				// this.activeIndex = '1'
			}
		},
		login() {
			this.$router.push('/login')
		},
		logout() {
			sessionStorage.removeItem('token')
			this.logouting()
			if (this.$route.meta.needLogin){
				this.$router.push('/home')
			}
			// this.$router.back()
			this.$message({
				showClose:true,
				message:"退出成功",
				duration:2000,
				center:true,
			})
		},
		adminPage(type){
			if (this.$route.path.indexOf('admin') !== -1){
				if (this.$route.path.indexOf(type) === -1){
					// console.log(type)
					this.$router.replace('/admin/' + type)
					this.changeType(type)
				}
			}else{
				this.$router.push('/admin/' + type)
			}
		},
		changeType(type){
			this.$emit('typeChanged', type)
		},
		infoClick(){
			if (this.$route.path.indexOf('new') === -1){
				this.$router.replace('/admin/new')
			}
		},
		searchSubmit(){
			if (this.$route.path.indexOf('/home') !== -1){
				// console.log(this.keyword)
				this.$bus.$emit('search',this.keyword)
			}
		},
		editClick(){
			this.$router.push('/newPost')
		}
	},
}
</script>
<style scoped>
	
	.menu{
		display: flex;
		align-items: center;
		height: 50px;
		color: rgb(139, 134, 134);
	}

	.item {
		margin:0 20px 0 10px; 
		padding:10px;
		/* width: 5%; */
		text-align: center;
		cursor: pointer;
	}

	.item:hover{
		color: deepskyblue;
	}

	.search{
		width: 20%;
	}

	.icon {
		font-size: 20px;
	}

	.login {
		position: absolute;
		right: 10px;
		cursor: pointer;
	}

	.setting {
		flex: 1;
		position: absolute;
		right:35px;
		padding:0;
	}

	.badge {
		position: relative;
		margin-top: -30px;
	}
</style>
