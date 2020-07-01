<template>
		<div class="category">
			<div class="header">分类</div>
			<el-row v-for="(item,index) in categories" :key="index" type="flex"
				 justify="space-between" class="item"
				 @click.native="itemClick(item.name)">
				<el-col :span="16" >{{item.name}}</el-col>
				<el-col :span="6" align="right">{{item.count}} 篇</el-col>
			</el-row>
		</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	name: 'Category',
	props: {
		categories: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data(){
		return {}
	},
	components: {},
	methods: {
		...mapMutations(['changeType']),
		itemClick(type) {
			// console.log(type)
			this.changeType(type)
			this.$bus.$emit('categoryClick')
			if (this.$route.path.indexOf('/home') === -1){
				this.$router.push('/home')
			}
			console.log('emit')
		},
		handleChange() {
			console.log()
		}
	}
}
</script>
<style scoped>
	.category{
		background-color: #fff;
		
	}

	.header{
		line-height: 30px;
		padding: 10px 20px;
		border-bottom: 1px solid #eee;
	}

	.item {
		font-size: 16px;
		position: relative;
		padding: 5px 20px;
		/* margin-bottom: 15px; */
		line-height: 30px;
		cursor:pointer
	}

	.item:hover{
		color: deepskyblue;
		background-color: rgb(240, 245, 247);
	}

	
</style>
