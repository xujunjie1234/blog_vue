<template>
	<div class="news" v-if="news.length">
		<el-tabs tab-position="left" >
			<el-tab-pane label="全部">
				<el-row v-if="news.length">
					<el-col align="right" style="margin-bottom:10px">
						<el-button type="danger" size="mini" @click="allDelete">全部删除</el-button>
					</el-col>
				</el-row>
				<div class="item" v-for="(item,index) in news" :key="index">
					<el-row type="flex" justify="space-between">
						<el-col :span="16">
							<span class="author">{{item.author}}</span>
								回复了文章  
							<span class="title">{{item.post_title}}</span>
						</el-col>
						<el-col :span="6" align="center">{{item.timestamp | timeFormatter}}</el-col>
						<el-col :span="2" align="right">
							<el-button type="danger" plain size="mini" @click="deleteClick(item)">
								<i class="el-icon-delete"></i>
							</el-button>
						</el-col>
					</el-row>
					<div class="body">{{ item.body }}</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="未读">
				<el-row v-if="unread.length">
					<el-col align="right" style="margin-bottom:10px">
						<el-button type="primary" size="mini" @click="allClick">全部已读</el-button>
					</el-col>
				</el-row>
				<div class="item" v-for="(item,index) in unread" :key="index">
					<el-row type="flex" justify="space-between">
						<el-col :span="16">
							<span class="author">{{item.author}}</span>
								回复了文章  
							<span class="title">{{item.post_title}}</span>
						</el-col>
						<el-col :span="6" align="center">{{item.timestamp | timeFormatter}}</el-col>
						<el-col :span="2" align="right">
							<el-button type="primary" plain size="mini" @click="readClick(item)">
								<i class="el-icon-check"></i>
							</el-button>
						</el-col>
					</el-row>
					<div class="body">{{ item.body }}</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="已读">
				<div class="item" v-for="(item,index) in readed" :key="index">
					<el-row type="flex" justify="space-between">
						<el-col :span="12">
							<span class="author">{{item.author}}</span>
								回复了文章  
							<span class="title">{{item.post_title}}</span>
						</el-col>
						<el-col :span="6" align="right">{{item.timestamp | timeFormatter}}</el-col>
					</el-row>
					<div class="body">{{ item.body }}</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		
	</div>
</template>

<script>
import {getNews,readNews,deleteNews} from "network/admin"

export default {
	name: 'AdminNews',
	data(){
		return {
			news: []
		}
	},
	components: {},
	created(){
		this._get_news()
	},
	computed:{
		unread(){
			return this.news.filter(x => !x.reviewed)
		},
		readed(){
			return this.news.filter(x => x.reviewed)
		}
	},
	methods: {
		_get_news(){
			getNews().then(res => {
				this.news = res.news
				this.news.sort((a,b) => b.timestamp - a.timestamp)
				// console.log(this.news)
			})
		},
		readClick(item){
			readNews([item.id]).then(res => {
				// console.log(res)
				item.reviewed = true
			})
		},
		allClick(){
			readNews(this.unread.map(x => x.id)).then(res => {
				// console.log(res)
				this.unread.forEach(x => x.reviewed = true)
			})
		},
		deleteClick(item){
			deleteNews([item.id]).then(res => {
				// console.log(res)
				this.news = this.news.filter(x => x.id != item.id)
			})
		},
		allDelete(){
			deleteNews(this.news.map(x => x.id)).then(res => {
				// console.log(res)
				this.news = []
			})
		}
	},
	filters:{
		timeFormatter(timestamp){
			let date = new Date(timestamp)
			// let year = date.getFullYear()
			// let month = date.getMonth() + 1
			// let day = date.getDate()
			// let hour = date.getHours()
			// let minute = date.getMinutes()
			return date.toLocaleString()
		}
	}
}
</script>
<style scoped>

	.item{
		border: 1px solid #eee;
		border-bottom: 1px solid #eee;
		/* margin:10px auto; */
		padding: 10px;
	}

	.body{
		/* width: 100%; */
		word-wrap: break-word;;
		word-break: break-all;
		/* margin: 5px 0; */
		font-size:16px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* margin-bottom: 10px; */
	}

	.author, .title{
		color: deepskyblue;
		font-size: 16px;
	}
	
</style>
