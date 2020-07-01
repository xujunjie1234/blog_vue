<template>
	<div class="home">
		<nav-bar class="nav-bar">
			<template v-slot:admin >
					<el-menu-item  class="setting">
						<el-row :gutter="30" justify="space-around" align="middle">
							<el-col :span=8>
								<i class="el-icon-edit-outline" style="font-size:26px;"></i>
							</el-col>
							<el-col :span=8 >
									<i class="el-icon-bell" style="font-size:22px;">
										<el-badge :value="news" :max="99" :hidden="news == 0" class="item" style="font-size:6px;"></el-badge>
									</i>
							</el-col>
							<el-col :span=8 >
								
								<el-dropdown trigger="click" placement="bottom" >
									<span class="el-dropdown-link" style="display:inline-block;margin-bottom:5px">
										<el-avatar size="medium" > admin </el-avatar>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>管理文章</el-dropdown-item>
										<el-dropdown-item>管理评论</el-dropdown-item>
										<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</el-col>
						
						</el-row>
					</el-menu-item>
			</template>
		</nav-bar>
		<container></container>
	</div>
</template>

<script>
import NavBar from 'components/NavBar.vue';
import Container from 'components/Container'
import Notify from "components/Notify"
export default {
	name: 'AdminHome',
	data(){
		return {
			news:10
		}
	},
	components: {
		NavBar,
		Container,
		Notify
	},
	methods: {
		logout() {
			localStorage.removeItem('token')
			this.$router.replace('/home')
			this.$message({
				showClose:true,
				message:"退出成功",
				duration:2000,
				center:true,
			})
		}
	}
}
</script>
<style scoped>
	.setting {
		position: absolute;
		right:35px;
		padding:0;
	}

	.el-dropdown-link {
		align-items: center;
    cursor: pointer;
    color: #409EFF;
  }

	.item {
		position: relative;
		margin-top: -30px;
	}
</style>
