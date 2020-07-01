<template>
  <div>
    <el-table ref="multipleTable"
      :data="comments.filter(data => filter_method(data))"
      :default-sort = "{prop: 'id', order: 'ascending'}"
      style="width: 100%" max-height="450" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="ID" sortable 
        prop="id" width="60px">
      </el-table-column>
      
      <el-table-column
        label="日期" sortable show-overflow-tooltip
        prop="time"  width="120px">
      </el-table-column>
      <el-table-column
        label="昵称" sortable
        prop="author" width="80px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="文章ID" sortable align="center"
        prop="post_id" width="100px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="文章标题"
        prop="post_title" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="内容" 
        prop="body" show-overflow-tooltip>
      </el-table-column>
      <el-table-column width="150px"
        align="right" fixed="right">
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
						title="确定删除此评论吗？">
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
      <el-button type="primary" size="small">共{{comments.length}}条评论</el-button>
    </div>
  </div>
  
</template>

<script>
  import {getComments, deleteComments} from "network/admin"
  
  export default {
		name: 'AdminComments',
    data() {
      return {
        comments: [],
        search: '',
        multipleSelection: [],
        visible:false
      }
    },
    created(){
      this._get_comments()
    },
    methods: {
      _get_comments(){
        getComments().then(res => {
          this.comments = res.comments
        })
      },
      filter_method(data){
        if (!this.search.length) return true
        let arr = [data.author, data.post_title,data.body, data.time]
        for (let x of arr){
          if (x.toLowerCase().includes(this.search.toLowerCase())){
            return true
          }
        }
        return false
        // return !this.search.length || data.author.toLowerCase().includes(this.search.toLowerCase())
      },
      handleVisite(index, row) {
        // console.log(index, row);
        this.$router.push('/post/' + row.post_id)
      },
      handleDelete(index, row) {
        // console.log(index, row);
        deleteComments({'comments':[row]}).then(res => {
          // console.log(res)
          this.comments = this.comments.filter(x => x.id !== row.id)
        })
      },
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      },
      DeleteSelection(){
        deleteComments({'comments':this.multipleSelection}).then(res => {
          this.comments = this.comments.filter(x => !this.multipleSelection.includes(x))
          // console.log(res)
        })
      },
    },
  }
</script>

<style scoped>
</style>
