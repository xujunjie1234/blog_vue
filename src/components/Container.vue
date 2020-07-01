<template>
	<el-container style="height: 100%;">
		<el-backtop ref="backtop"></el-backtop>
		<el-container  class="container">
			<el-row class="sort" >
				<el-col :span="2" align="center" :class="{active:currentIndex === index, middle:index > 0}"
					v-for="(item,index) in ['热门','最新','最早']" :key="index"
					@click.native="sortClick(index)">
					{{item}} 
				</el-col>
				<el-col :span="10" :offset="5">
					<el-dropdown trigger="click">
						<el-button type="text" size="mini">
							分类<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-circle-check"
								v-for="(item,index) in getCategories" :key="index"
								@click.native="itemClick(item.name)"
							>{{item.name}}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<el-tag size="small" style="margin-left:15px">{{getType}}</el-tag>
				</el-col>
			</el-row>
			<post-item :post="post" 
				v-for="(post,index) in this.posts.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
				:key="index"></post-item>
			
			<el-pagination @size-change="handleSizeChange" @current-change="handlePageChange"
				:current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[5,10,20,30]"
				layout="total, sizes, prev, pager, next, jumper" :total="this.posts.length"
				class="pagination">
			
			</el-pagination>
			<el-footer></el-footer>
			
		</el-container>
		
	</el-container>
</template>

<script>
import PostItem from "./PostItem"
import {getPostsData} from "network/home"
import {mapMutations, mapGetters} from "vuex"

export default {
	name: 'Container',
	data(){
		return {
			posts:[],
			currentPage: 1,
			pageSize: 10,
			currentIndex: 0,
		}
	},
	components: {
		PostItem,
	},
	created() {
		this._getPosts()
	},
	mounted(){
		this.$bus.$on('categoryClick',() => {
				this.$refs.backtop.handleClick()
				this.sortClick(this.currentIndex)
			})

		this.$bus.$on('search',(keyword) => {
			this.posts = this.getPosts.filter(x => {
				let key = keyword.toLowerCase()
				if (x.title.toLowerCase().includes(key) || x.body.toLowerCase().includes(key)){
					return true
				}
			})
		})
	},
	computed:{
		...mapGetters(['getPosts','getCategories','getType']),
	},
	methods: {
		...mapMutations(['addPosts','addCategories','changeType']),
		_getPosts(){
			if (this.posts.length) return
			getPostsData().then(res => {
				this.addPosts(res['posts'])
				this.sortClick(this.currentIndex)
			})
		},
		
		handleSizeChange(size){
			this.pageSize = size
		},
		handlePageChange(page){
			this.currentPage = page
			this.$refs.backtop.handleClick()
		},
		sort_hot(){
			this.posts = this.getPosts.sort((a,b) => b.view - a.view)
		},
		sort_new(){
			this.posts = this.getPosts.sort((a,b) => b.timestamp - a.timestamp)
		},
		sort_old(){
			this.posts = this.getPosts.sort((a,b) => a.timestamp - b.timestamp)
		},
		sortClick(index){
			this.currentIndex = index
			switch (index){
				case 0:
					this.sort_hot()
					break
				case 1:
					this.sort_new()
					break
				case 2:
					this.sort_old()
					break
			}
		},
		itemClick(type){
			// console.log(type)
			this.changeType(type)
			this.sortClick(this.currentIndex)
		},
	}
}
</script>
<style scoped>
	.sort{
		background-color: #fff;
		height: 40px;
		padding: 5px 0;
		border-bottom: 1px solid #eee;
		margin: 2px 0 5px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.middle{
		border-left:1px solid #eee;
		
	}

	.active{
		color: deepskyblue;
	}

	.container {
		margin-left: 10px;
		background-color: rgb(247, 248, 248);
	}

	.pagination {
		margin-bottom: 10px;
		height: 20px;
		display: flex;
		justify-content: center;
	}
</style>
