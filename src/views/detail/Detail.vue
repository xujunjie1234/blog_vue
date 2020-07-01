<template>
	<div class="detail">
		<nav-bar></nav-bar>
		<el-container>
			<el-backtop ref="backtop"></el-backtop>
			<aside-bar ></aside-bar>
			<post-detail></post-detail>
		</el-container>
	</div>
</template>

<script>
import NavBar from 'components/NavBar.vue';
import AsideBar from "components/AsideBar"

import PostDetail from "./PostDetail"

import {getPost, getCommentsData} from "network/home"

export default {
	name: 'Detail',
	data(){
		return {
		}
	},
	components: {
		NavBar,
		AsideBar,
		PostDetail
	},
	computed:{
	},
	methods: {
	}
}
</script>
<style scoped>
</style>
