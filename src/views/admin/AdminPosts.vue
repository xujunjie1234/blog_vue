<template>
	<div>
		<el-table ref="multipleTable" @selection-change="handleSelectionChange"
    :data="posts.filter(data => filter_method(data))"
    style="width: 100%" max-height="450">
			<el-table-column
					type="selection"
					width="50">
				</el-table-column>
			<el-table-column sortable
				label="ID" width="60px" fixed="left"
				prop="id">
			</el-table-column>
			<el-table-column width="120px"
				label="日期" sortable
				prop="time">
			</el-table-column>
			<el-table-column show-overflow-tooltip
				label="标题" width="200px"
				prop="title">
			</el-table-column>
			<el-table-column
				label="点赞" sortable
				prop="like">
			</el-table-column>
			<el-table-column width="120px"
				label="阅读量" sortable 
				prop="view">
			</el-table-column>
			<el-table-column
				label="分类"
				prop="category">
			</el-table-column>
			<el-table-column
				label="评论权限" align="center"
				prop="can_comment">
				<template slot-scope="scope">
					<el-switch @change="handleSwitch(scope.row)"
						v-model="scope.row.can_comment"
						active-color="#13ce66"
						inactive-color="#ff4949">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column width="220px"
				fixed="right" align="right">
				<template slot="header" slot-scope="">
					<el-input
						v-model="search"
						size="mini"
						placeholder="输入关键字搜索"/>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" type="primary"
						@click="handleVisited(scope.$index, scope.row)">查看
					</el-button>
					<el-button size="mini" type="info"
						@click="handleEdit(scope.$index, scope.row)">编辑
					</el-button>
					<el-popconfirm 
						@onConfirm="handleDelete(scope.$index, scope.row)"
						icon="el-icon-info"
						iconColor="red"
						title="确定删除此文章吗？">
						<el-button slot="reference" size="mini" type="danger" style="margin-left:10px;">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin:20px 0 0 20px">
			<el-popconfirm 
				@onConfirm="DeleteSelection()"
				icon="el-icon-info"
				iconColor="red"
				title="确定删除所有选中吗？">
				<el-button slot="reference" size="small" type="danger" style="margin-right:10px;">删除所有选中</el-button>
			</el-popconfirm>
      <el-button @click="toggleSelection()" type="primary" size="small">取消选择</el-button>
      <el-button type="primary" size="small">共{{posts.length}}篇文章</el-button>
    </div>
	</div>
</template>

<script>
import {getPostsData} from "network/home"
import {deletePosts, PostCanOrNot} from "network/admin"

export default {
	name: 'AdminPosts',
	data(){
		return {
			posts:[],
			search:'',
			selected: [],
		}
	},
	components: {},
	created(){
		this._get_post_data()
	},
	methods: {
		_get_post_data(){
			getPostsData().then(res => {
				this.posts = res.posts
			})
		},
		filter_method(data){
			if (!this.search.length) return true
			let arr = [data.title,data.category, data.time]
        for (let x of arr){
          if (x.toLowerCase().includes(this.search.toLowerCase())){
            return true
          }
        }
        return false
		},
		DeleteSelection(){
			deletePosts({'posts':this.selected}).then(res => {
				this.posts = this.posts.filter(x => !this.selected.includes(x))
			})
		},
		toggleSelection(){
			this.$refs.multipleTable.clearSelection();
		},
		handleSelectionChange(val){
			this.selected = val
		},
		handleVisited(index,row){
			this.$router.push('/post/' + row.id)
		},
		handleDelete(index,row){
			deletePosts({'posts':[row]}).then(res => {
				this.posts = this.posts.filter(x => x.id !== row.id)
			})
		},
		handleEdit(index, row){
			// console.log(row)
			this.$router.push('/editPost/' + row.id)
		},
		handleSwitch(row){
			PostCanOrNot(row.id).then(res => {
				// console.log(res)
				for (let post in this.posts){
					if (post.id === row.id){
						post.can_comment = !post.can_comment
					}
				}
			})
		}
	}
}
</script>
<style scoped>
</style>
