<template>
	<el-aside class="aside-bar" width="23%">
			<el-card class="data-info">
				<template v-slot:header>
					<div style="text-align:center;padding:0;">发狂的桔子</div>
				</template>
				<div class="info">
					<div class="info-item">
						<div class="info-item-count"><strong>{{ posts_length }}</strong></div> 文章
					</div>
					<div class="info-item">
						<div class="info-item-count"><strong>{{ comments_length }}</strong></div> 评论
					</div>
					<div class="info-item">
						<div class="info-item-count"><strong>{{ views }}</strong></div> 总访问量
					</div>
				</div>
			</el-card>
			
			<div class="calendar">
				<div class="calendar-title">打卡日历  <i class="el-icon-date"></i></div>
				<calendar-bar :data="posts"  style="padding-bottom: 0px;"></calendar-bar>
			</div>
			<category :categories="categories"></category>
			
	</el-aside>
</template>

<script>
import Category from "./Category"
import {getInfo, getCategories} from "network/home"

import CalendarBar from "./CalendarBar"
import { mapMutations } from 'vuex'

export default {
	name: 'AsideBar',
	data(){
		return {
			posts: [],
			posts_length: null,
			comments_length: null,
			views: null,
			categories: [],
		}
	},
	components: {
		Category,
		CalendarBar
	},
	created(){
		this._get_info()
		this._get_categories()
	},
	computed:{
	},
	methods: {
		...mapMutations(['addCategories']),
		_get_info(){
			getInfo().then(res => {
				this.posts_length = res.posts_length
				this.comments_length = res.comments_length
				this.views = res.views
				this.posts = res.posts
			})
		},
		_get_categories(){
			getCategories().then(res => {
				this.categories = res.categories
				this.addCategories(res.categories)
			})
		},
	},
}
</script>
<style scoped>


	.data-info{
		margin-bottom: 5px;
		padding: 0px;
	}

	.info {
		display: flex;
		margin-top: 10px;
		justify-content: space-around;
		font-size: 12px;
		color: rgb(145, 158, 168);

	}

	.info-item {
		text-align: center;
	}

	.info-item-count {
		font-size: 14px;
		padding-bottom: 10px;
		color: deepskyblue;
		
	}

	.dayClass{
		background-color: deepskyblue;
		color:red;
	}

	.calendar{
		background-color: #fff;
		margin-bottom: 5px;
		border: 1px solid #eee;
	}

	.calendar-title{
		line-height: 50px;
		padding: 0 10px;
	}
</style>
