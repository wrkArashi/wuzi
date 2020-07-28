<template>
	<el-card class="userpersonal">
		<div slot="header">
			<span>个人信息</span>
		</div>
		<el-form :model="Form" label-width="60px" :rules="rules" ref="Form">
			<el-form-item label="ID" prop="ID">
				<el-input v-model="Form.ID" disabled></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="Name">
				<el-input v-model="Form.Name"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="Password">
				<el-input v-model="Form.Password"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="Email">
				<el-input v-model="Form.Email"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="Sex">
				<el-radio-group v-model="Form.Sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="生日" prop="Birthday">
				<el-date-picker v-model="Form.Birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="电话" prop="Mobile">
				<el-input v-model="Form.Mobile"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="Depict">
				<el-input v-model="Form.Depict"></el-input>
			</el-form-item>
		</el-form>
		<div class="center">
			<div class="dialog-footer">
				<el-button type="primary" @click="editSure">确 定</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				Form: {
					ID: "6",
					Name: "wrk",
					Password: "666",
					Email: "666@qq.com",
					CheckCode: "",
					Date: "",
					Sex: "女",
					Birthday: "1998-02-08",
					Mobile: "13166666666",
					Depict: "学员",
				},
				rules: {
					ID: { required: true, message: '不能为空', trigger: 'blur' },
					Name: { required: true, message: '不能为空', trigger: 'blur' },
					Email: { required: true, message: '不能为空', trigger: 'blur' },
					Sex: { required: true, message: '不能为空', trigger: 'blur' },
					Mobile: { required: true, message: '不能为空', trigger: 'blur' },
				}
			}
		},
		methods: {
			editSure() {
				this.$refs.Form.validate((valid) => {
					if(valid){
						this.$message.success('已完成编辑')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.userpersonal {
		margin: 0 auto;
		width: 50%;

		.center {
			text-align: center;
		}
	}
</style>
