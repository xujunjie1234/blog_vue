<template>
	<el-card shadow="hover" class="post" @click.native="itemClick(post)">
		<div class="title"><strong>{{ post.title }}</strong></div>
		<div class="body" >{{ post.body }}</div>
		<el-row :gutter="20">
			<el-col :span="5">{{ post.time}}</el-col >
			<el-col :span="4"> <i class="el-icon-view"></i> {{ post.view }}</el-col >
			<el-col :span="3">
				<img src="~assets/like.svg" alt="" style="position:relative;top:1px;">
			  {{ post.like }}</el-col >
			<el-col :span="8">
				<el-tag size="mini">{{post.category}}</el-tag>
			</el-col>
		</el-row>

	</el-card>
</template>

<script>
export default {
	name: 'PostItem',
	props:{
		post:{
			type: Object,
			default(){
				return {}
			}
		}
	},
	data(){
		return {}
	},
	components: {},
	methods: {
		itemClick(post) {
			this.$router.push('/post/' + post.id)
		}
	}
}
</script>
<style scoped>
	.title {
		font-size: 18px;
		/* margin-top: 5px; */
		margin-bottom: 10px;
	}

	.post {
		margin-bottom: 5px;
		cursor: pointer;
	}

	.post:hover{
		background-color: rgb(247, 252, 252);
		/* background-color: deepskyblue;
		opacity: 0.5;
		color:#fff; */
	}

	.body {
		margin-bottom: 5px;
		font-size:16px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		margin-bottom: 10px;
	}
</style>


