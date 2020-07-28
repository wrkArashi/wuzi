<template>
	<el-card class="userlist">
		<div slot="header">
			<span>用户列表</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addHandle">添加用户</el-button>
		</div>
		<!-- 编辑弹框 -->
		<el-dialog title="编辑用户" :visible.sync="editDialog" width="600px">
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="60px">
				<el-form-item label="编号" prop="ID">
					<el-input v-model="editForm.ID"></el-input>
				</el-form-item>
				<el-form-item label="名字" prop="Name">
					<el-input v-model="editForm.Name"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="Email">
					<el-input v-model="editForm.Email"></el-input>
				</el-form-item>
				<el-form-item label="来源" prop="Sex">
					<el-radio-group v-model="editForm.Sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="生日" prop="Birthday">
					<el-date-picker v-model="editForm.Birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="电话" prop="Mobile">
					<el-input v-model="editForm.Mobile"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="Depict">
					<el-input v-model="editForm.Depict"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editClose">取 消</el-button>
				<el-button type="primary" @click="editSure">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加弹框 -->
		<el-dialog title="添加用户" :visible.sync="addDialog" width="600px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="60px">
				<el-form-item label="编号" prop="ID">
					<el-input v-model="addForm.ID"></el-input>
				</el-form-item>
				<el-form-item label="名字" prop="Name">
					<el-input v-model="addForm.Name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="Password">
					<el-input v-model="addForm.Password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="Email">
					<el-input v-model="addForm.Email"></el-input>
				</el-form-item>
				<el-form-item label="来源" prop="Sex">
					<el-radio-group v-model="addForm.Sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="生日" prop="Birthday">
					<el-date-picker v-model="addForm.Birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="电话" prop="Mobile">
					<el-input v-model="addForm.Mobile"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="Depict">
					<el-input v-model="addForm.Depict"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addClose">取 消</el-button>
				<el-button type="primary" @click="addSure">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 表格 -->
		<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))"
		 :row-class-name="tableRowClassName">
			<el-table-column prop="ID" label="编号" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Name" label="名字" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Email" label="邮箱" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Sex" label="性别" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Birthday" label="生日" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Mobile" label="电话" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Depict" label="描述" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column align="right" width="200">
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入名字中的关键字搜索" />
				</template>
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain @click="editHandel(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" plain @click='delHandle(scope.$index, scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[5, 10, 20, 30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
			</el-pagination>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				addDialog: false, //添加弹框
				editDialog: false, //编辑弹框
				addForm: {
					ID: "",
					Name: "",
					Password: "",
					Email: "",
					CheckCode: "",
					Date: "",
					Sex: "",
					Birthday: "",
					Mobile: "",
					Depict: "",
				},
				editForm: {
					ID: "",
					Name: "",
					Password: "",
					Email: "",
					CheckCode: "",
					Date: "",
					Sex: "",
					Birthday: "",
					Mobile: "",
					Depict: "",
				},
				currentPage: 1, // 分页
				pagesize: 10, // 分页
				search: '', // 搜索框	
				tableData: [{
						ID: "1",
						Name: "ohno",
						Password: "111",
						Email: "111@qq.com",
						CheckCode: "",
						Date: "",
						Sex: "男",
						Birthday: "1998-01-01",
						Mobile: "13111111111",
						Depict: "经理",
					},
					{
						ID: "2",
						Name: "show",
						Password: "222",
						Email: "222@qq.com",
						CheckCode: "",
						Date: "",
						Sex: "男",
						Birthday: "1998-02-02",
						Mobile: "13122222222",
						Depict: "总经理",
					},
					{
						ID: "3",
						Name: "aiba",
						Password: "333",
						Email: "333@qq.com",
						CheckCode: "",
						Date: "",
						Sex: "男",
						Birthday: "1998-03-03",
						Mobile: "13133333333",
						Depict: "",
					},
					{
						ID: "4",
						Name: "nino",
						Password: "444",
						Email: "444@qq.com",
						CheckCode: "",
						Date: "",
						Sex: "男",
						Birthday: "1998-04-04",
						Mobile: "13144444444",
						Depict: "",
					},
					{
						ID: "5",
						Name: "jun",
						Password: "555",
						Email: "555@qq.com",
						CheckCode: "",
						Date: "",
						Sex: "男",
						Birthday: "1998-05-05",
						Mobile: "13155555555",
						Depict: "",
					},
					{
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
					}
				],
				rules: {
					ID: { required: true, message: '不能为空', trigger: 'blur' },
					Name: { required: true, message: '不能为空', trigger: 'blur' },
					Password: { required: true, message: '不能为空', trigger: 'blur' },
					Email: { required: true, message: '不能为空', trigger: 'blur' },
					Sex: { required: true, message: '不能为空', trigger: 'blur' },
					Mobile: { required: true, message: '不能为空', trigger: 'blur' },
				}
			}
		},
		methods: {
			// 编辑用户确定
			editSure() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$message.success('编辑成功')
						this.tableData[this.editForm.index] = this.editForm
						this.editDialog = false
					}
				})
			},
			// 编辑用户取消
			editClose() {
				this.editDialog = false
			},
			// 点击编辑
			editHandel(index, row) {
				this.editDialog = true
				this.editForm = Object.assign({}, row);
				this.editForm.index = index
			},
			// 添加用户确定
			addSure() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$message.success('添加成功')
						this.tableData.push({ ...this.addForm })
						this.addDialog = false
						this.$refs['addForm'].resetFields()
					}
				})
			},
			// 添加用户取消
			addClose() {
				this.$refs['addForm'].resetFields()
				this.addDialog = false
			},
			// 添加用户
			addHandle() {
				this.addDialog = true
			},
			// 点击删除
			delHandle(index, row) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData.splice(index, 1)
					// 执行删除操作
				}).catch(() => {
					this.$message.info('已取消删除')
				})
			},
			// 斑马纹
			tableRowClassName({ row, rowIndex }) {
				if (rowIndex % 2 === 1) {
					return 'blue-row';
				}
				return '';
			},
			// 分页
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
			},
		}
	}
</script>

<style lang="scss">
	.userlist {
		.el-table .blue-row {
			background: aliceblue;
		}

		.block {
			margin-top: 20px;
		}
	}
</style>
