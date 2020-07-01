<template>
	<div>
		<el-table ref="multipleTable"
			:data="categories.filter(x => !search.length || x.name.toLowerCase().includes(search.toLowerCase()))"
			style="width: 100%"
			:default-sort = "{prop: 'id', order: 'ascending'}"
			@selection-change="handleSelectionChange"
			height="450">
			<el-table-column
					type="selection"
					width="50">
				</el-table-column>
			<el-table-column
				prop="id" sortable
				align="center"
				label="ID">
			</el-table-column>
			
			<el-table-column
				prop="count" sortable
				align="center"
				label="文章数量">
			</el-table-column>
			<el-table-column
				prop="name" 
				align="center"
				label="名称">
			</el-table-column>
			<el-table-column width="150px"
					align="right">
					<template slot="header" slot-scope="">
						<el-input
							v-model="search"
							size="mini"
							placeholder="输入关键字搜索"/>
					</template>
					<template slot-scope="scope">
						<el-button
							size="mini" type="primary"
							@click="handleVisite(scope.$index, scope.row)">查看
						</el-button>
						<el-popconfirm 
							@onConfirm="handleDelete(scope.$index, scope.row)"
							icon="el-icon-info"
							iconColor="red"
							title="确定删除此分类吗？">
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
      <el-button type="primary" size="small">共{{categories.length}}条分类</el-button>
      <el-button type="primary" size="small" >
				<span v-if="!show" @click="new_category()">新建分类</span>
				<span v-else @click="cancelSubmit()">取消</span>
			</el-button>
			<span v-if="show">
				<el-input v-model="id" placeholder="请输入ID" size="small" style="width:150px;margin:0 10px;"
					type="number"	maxlength="10" show-word-limit>
				</el-input>
				<el-input v-model="name" placeholder="请输入名称" size="small" style="width:150px;margin:0 10px;"
					maxlength="10" show-word-limit>
				</el-input>
				<el-button @click="submit()" size="small" type="primary">提交</el-button>
			</span>
			<el-button v-if="!show && !show_rename" size="small" type="primary" @click="rename()">重命名</el-button>
			<el-button v-if="!show && show_rename" size="small" type="primary" @click="cancelRename()">取消重命名</el-button>
			<span v-if="show_rename">
				<el-input v-model="id2" placeholder="请输入ID" size="small" style="width:150px;margin:0 10px;"
					maxlength="10" show-word-limit>
				</el-input>
				<el-input v-model="new_name" placeholder="请输入新名称" size="small" style="width:150px;margin:0 10px;"
					maxlength="10" show-word-limit>
				</el-input>
				<el-button @click="renameSubmit()" size="small" type="primary">提交</el-button>
			</span>
    </div>
	</div>
</template>

<script>
	import {getCategories} from "network/home"
	import {deleteCategories, addCategory, renameCategory} from "network/admin"

  export default {
		name: "AdminCategories",
    data() {
      return {
				categories: [],
				search: '',
				selected:[],
				id:null,
				name:null,
				show:false,
				show_rename:false,
				id2:null,
				new_name:null
      }
		},
		created(){
			this._get_categories()
		},
		methods:{
			_get_categories(){
				getCategories().then(res => {
					this.categories = res.categories
				})
			},
			handleVisite(){

			},
			handleDelete(index,row){
				deleteCategories({'categories':[row]}).then(res => {
					this.categories = this.categories.filter(x => x.id !== row.id)
				})
			},
			DeleteSelection(){
				deleteCategories({'categories':this.selected}).then(res => {
					// console.log(res)
					this.categories = this.categories.filter(x => !this.selected.includes(x))
				})
				
			},
			toggleSelection(){
				this.$refs.multipleTable.clearSelection();
			},
			handleSelectionChange(val){
				this.selected = val
			},
			submit(){
				if (!this.id || !this.name){
					this.$message({
						showClose:true,
						message:"id或名称为空",
						center:true,
						duration:1500,
						type:"error"
					})
				}else{
					for (let item of this.categories){
						// console.log(typeof(this.id))
						if (item.id == this.id || item.name === this.name){
							this.$message({
								showClose:true,
								message:"id或名称重复",
								center:true,
								duration:1500,
								type:"error"
							})
							return
						}
					}
					let categoryForm = {'id':Number(this.id),'name':this.name,'count':0}
					addCategory(categoryForm).then(res => {
						this.categories.push(categoryForm)
						this.id = null
						this.name = null
						console.log(res)
					})
				}
			},
			new_category(){
				this.show_rename = false
				this.show = true
				this.id = null
				this.name = null
			},
			cancelSubmit(){
				this.show = false
				this.id = null
				this.name = null
			},
			rename(id){
				this.show = false
				this.show_rename = true
				this.id2 = id
				this.new_name = null
			},
			cancelRename(){
				this.show_rename = false
				this.id2 = null
				this.new_name = null
			},
			renameSubmit(){
				if (!this.id2 || !this.new_name){
					this.$message({
						showClose:true,
						message:"id或名称错误",
						center:true,
						duration:1500,
						type:"error"
					})
				}else{
					let flag = false
					for (let item of this.categories){
						// console.log(typeof(this.id))
						if (item.name === this.new_name){
							this.$message({
								showClose:true,
								message:"分类名称重复",
								center:true,
								duration:1500,
								type:"error"
							})
							return
						}
						if (item.id == this.id2){
							flag = true
						}
					}
					if (!flag){
						this.$message({
								showClose:true,
								message:"分类ID不存在",
								center:true,
								duration:1500,
								type:"error"
							})
						return
					}
					let categoryForm = {'id':Number(this.id2),'name':this.new_name,'count':0}
					renameCategory(categoryForm).then(res => {
						for (let x of this.categories){
							if (x.id == this.id2){
								x.name = this.new_name
								break
							}
						}
						// })
						this.id2 = null
						this.new_name = null
						console.log(res)
					})
				}
			},
		}
  }
</script>

<style scoped>
</style>
