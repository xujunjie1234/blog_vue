<template>
	<div class="bgc">
		<div class="login-box">
			<el-form label-position="left" label-width="80px" :rules="loginFormRules" ref="loginForm" :model="loginForm" 
					class="demo-ruleForm" status-icon>
					<h3 class="login-title">欢迎登录</h3>
					<el-form-item label="用户名" prop="username">
							<el-input type="username" v-model="loginForm.username" clearable placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="loginForm.password" show-password clearable placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item class="submit">
							<el-button type="primary" @click="loginSubmit('loginForm')" >登录</el-button>
							<el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
					</el-form-item>
			</el-form>
			
		</div>

	</div>

</template>


<script>
	// import axios from "axios"
	import {login} from "network/login"
import { mapMutations } from 'vuex'
    export default {
        name: "Login",
        data() {
            return {
							loginForm: {
									username: '',
									password: ''
							},
							// 表单验证，需要在 el-form-item 元素中增加 prop 属性
							loginFormRules: {
								username: [
									{required: true, message: '账号不可为空', trigger: 'blur'}
								],
								password: [
									{required: true, message: '密码不可为空', trigger: 'blur'}
								]
							}
            }
        },
        methods: {
					...mapMutations(['logining']),
					loginSubmit(formName) {
							 this.$refs[formName].validate(valid => {
								// console.log(this.loginForm)
								// axios.post('http://127.0.0.1:5000/api/login', this.loginForm).then(res => {
								// 	// console.log(res)
								// 	if (res.data.status == 'ok'){
								// 		this.$router.push('/home')
								// 	}
								// 	// return res
								// }).catch(err => console.log(err))
								login(this.loginForm).then(res => {
									// console.log(res)
									if (res.data.status == 'ok'){
											sessionStorage.setItem('token','isLogin')
											console.log('token')
											this.logining()
											// this.$router.push('/home')
											this.$router.back()
											this.$message({
												showClose:true,
												message:"登陆成功，欢迎回来！",
												center:true,
												duration:1500,
												type:"success"
											})
										}else{
											this.$message({
												showClose: true,
												message: '账号或密码错误',
												center:true,
												duration:1500,
												type: 'error'
											});
										}
									}).catch(err => console.log(err))
								})
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
    }
</script>
<style scoped>
	.bgc{
		position: absolute;
		width: 99vw;
		height: 100vh;
		left: 0;
		top: 0%;
		margin:auto -100px;
		background-color: #fff;
	}

	.login-box {
			border: 1px solid #DCDFE6;
			width: 400px;
			margin: 150px auto;
			padding: 35px 35px 15px 35px;
			border-radius: 5px;
			text-align: center;
			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			box-shadow: 0 0 25px palegreen;
			background-color: #fff;
	}
	.login-title {
			text-align: center;
			margin: 0 auto 20px auto;
			color: rgb(66, 207, 101);
			font-size: 30px;
			font-weight: bold;
	}

	.submit {
		position: relative;
		left:-35px;
	}

</style>
