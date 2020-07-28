<template>
	<div class="login">
		<el-card class="card">
			<div slot="header">
				<span>欢迎登录</span>
			</div>
			<el-form :model="form" label-width="65px" :rules="rules" ref="form">
				<el-form-item label="账 户 :" prop="ID">
					<el-input v-model="form.ID" placeholder="请输入账号名"></el-input>
				</el-form-item>
				<el-form-item label="密 码 :" prop="Password">
					<el-input v-model="form.Password" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<!-- 验证码 -->
				<div class="flex">
					<el-form-item label="验 证 :" prop="code">
						<el-input v-model="form.code" placeholder="请输入验证码"></el-input>
					</el-form-item>
					<div class="code" @click="refreshCode">
						<s-identify :identifyCode="identifyCode"></s-identify>
					</div>
				</div>
				<el-form-item>
					<el-button type="primary" @click="loginHandle()">登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import SIdentify from '@/utils/Identify';
	export default {
		name: 'App',
		components: {
			SIdentify
		},
		data() {
			var checkCode = (rule, value, callback) => {
				if (value != this.identifyCode) {
					callback(new Error('验证码错误'));
				} else {
					callback();
				}
			};
			return {
				identifyCodes: "1234567890",
				identifyCode: "",
				form: {
					ID: '',
					Password: '',
					code: '',
				},
				rules: {
					ID: { required: true, message: '请输入账号名', trigger: 'blur' },
					Password: { required: true, message: '请输入密码', trigger: 'blur' },
					code: { validator: checkCode, trigger: 'blur' }
				}
			}
		},
		mounted() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		methods: {
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
			},
			loginHandle() {
				let formData = { ...this.form };
				this.$refs.form.validate((valid) => {
					if (valid) {
						if (formData.ID == 'wrk' && formData.Password == '666') {
							this.$message({
								message: '登陆成功',
								type: 'success',
								duration: 1000,
								onClose: () => {
									// 重定向
									let { redirect } = this.$route.query
									if (redirect) {
										this.$router.push(redirect)
										return;
									}
									// 跳转到物资列表 P246
									this.$router.push('/materials/list')
								}
							})
							localStorage.Name = formData.ID
						} else {
							// 返回的数据显示失败了
							this.$message.warning("密码或用户名错误");
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		position: fixed;
		height: 100%;
		width: 100%;
		background: url(../../src/assets/login-bg.jpg) no-repeat center 0 fixed;
		background-size: cover;

		.card {
			width: 550px;
			margin: 0 auto;
			top: 23%;
			left: 15%;
			position: relative;
			border-radius: 10px;

			.flex {
				display: flex;
				justify-content: space-between;

				.el-form-item {
					width: 100%;
				}

				.code {
					margin-left: 10px;
				}
			}
		}

	}
</style>
