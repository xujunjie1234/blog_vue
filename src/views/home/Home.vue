<template>
	<div class="home">
		<nav-bar class="nav-bar"></nav-bar>
		<el-container>
			<aside-bar ></aside-bar>
			<container ></container>
		</el-container>
		
	</div>
</template>

<script>
import NavBar from 'components/NavBar.vue';
import Container from 'components/Container'
import AsideBar from "components/AsideBar"

export default {
	name: 'Home',
	data(){
		return {}
	},
	components: {
		NavBar,
		Container,
		AsideBar
	},
	created(){
	},
	methods: {
	}
}
</script>
<style scoped>
</style>
