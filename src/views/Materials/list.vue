<template>
	<el-card class="box-card materialslist">
		<div slot="header">
			<span>物资列表</span>
			<el-button style="float: right; padding: 3px 0" type="text" @click="addHandle">添加物资</el-button>
		</div>
		<!-- 出库弹窗 -->
		<el-dialog title="出库信息" :visible.sync="outDialog" width="600px">
			<el-form :model="outForm" :rules="rules" ref="outForm" label-width="80px">
				<el-form-item label="编号" prop="ID">
					<el-input v-model="outForm.ID" disabled></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="Name">
					<el-input v-model="outForm.Name" disabled></el-input>
				</el-form-item>
				<!-- 				<el-form-item label="图片" prop="Photo">
					<el-input v-model="outForm.Photo" disabled></el-input>
				</el-form-item> -->
				<el-form-item label="来源" prop="Source">
					<el-radio-group v-model="outForm.Source" disabled>
						<el-radio label="库存"></el-radio>
						<el-radio label="捐助"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="类别" prop="Category">
					<el-cascader ref="myCascader" v-model="outForm.Category" :options="options" @change="handleChange" disabled></el-cascader>
				</el-form-item>
				<el-form-item label="数量" prop="Num">
					<el-input v-model="outForm.Num"></el-input>
				</el-form-item>
				<el-form-item label="领用人" prop="People">
					<el-input v-model="outForm.People"></el-input>
				</el-form-item>
				<el-form-item label="领用单位" prop="Unit">
					<el-input v-model="outForm.Unit"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="outClose">取 消</el-button>
				<el-button type="primary" @click="outSure">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加弹窗 -->
		<el-dialog title="添加物资" :visible.sync="addDialog" width="600px">
			<el-form :model="addForm" :rules="rules" ref="addForm" label-width="60px">
				<el-form-item label="编号" prop="ID">
					<el-input v-model="addForm.ID"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="Name">
					<el-input v-model="addForm.Name"></el-input>
				</el-form-item>
				<!-- 				<el-form-item label="图片" prop="Photo">
					<el-input v-model="addForm.Photo"></el-input>
				</el-form-item> -->
				<el-form-item label="数量" prop="Num">
					<el-input v-model="addForm.Num"></el-input>
				</el-form-item>
				<el-form-item label="来源" prop="Source">
					<el-radio-group v-model="addForm.Source">
						<el-radio label="库存"></el-radio>
						<el-radio label="捐助"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="类别" prop="Category">
					<el-cascader ref="myCascader" v-model="addForm.Category" :options="options" @change="handleChange"></el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addClose">取 消</el-button>
				<el-button type="primary" @click="addSure">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑物资" :visible.sync="editDialog" width="600px">
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="60px">
				<el-form-item label="编号" prop="ID">
					<el-input v-model="editForm.ID"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="Name">
					<el-input v-model="editForm.Name"></el-input>
				</el-form-item>
				<!-- 				<el-form-item label="图片" prop="Photo">
					<el-input v-model="editForm.Photo"></el-input>
				</el-form-item> -->
				<el-form-item label="数量" prop="Num">
					<el-input v-model="editForm.Num"></el-input>
				</el-form-item>
				<el-form-item label="来源" prop="Source">
					<el-radio-group v-model="editForm.Source">
						<el-radio label="库存"></el-radio>
						<el-radio label="捐助"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="类别" prop="Category">
					<el-cascader ref="myCascader" v-model="editForm.Category" :options="options" @change="handleChange"></el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editClose">取 消</el-button>
				<el-button type="primary" @click="editSure">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 表格 -->
		<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))"
		 :row-class-name="tableRowClassName">
			<el-table-column prop="ID" label="编号" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Name" label="名称" sortable :show-overflow-tooltip="true" width="400"></el-table-column>
			<!-- <el-table-column prop="Photo" label="图片" sortable :show-overflow-tooltip="true"></el-table-column> -->
			<el-table-column prop="Category" label="类别" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Num" label="数量" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Source" label="来源" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Creator" label="创建者" sortable :show-overflow-tooltip="true"></el-table-column>
			<!-- <el-table-column prop="CreateDate" label="创建日期" sortable :show-overflow-tooltip="true"></el-table-column> -->
			<el-table-column prop="UpdateDate" label="更新日期" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column align="right" width="250">
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入名称中的关键字搜索" />
				</template>
				<template slot-scope="scope">
					<el-button size="mini" type="primary" plain @click="editHandel(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" plain @click='delHandle(scope.$index, scope.row)'>删除</el-button>
					<el-button size="mini" type="success" plain @click='outHandle(scope.$index, scope.row)'>出库</el-button>
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
				// 级联
				options: [{
					value: 1,
					label: "防护用品",
					children: [{
						value: "防护衣",
						label: "防护衣",
					}, {
						value: "护目镜",
						label: "护目镜",
					}, {
						value: "口罩",
						label: "口罩",
					}]
				}, {
					value: 2,
					label: "药品",
					children: []
				}, {
					value: 3,
					label: "消毒用品",
					children: [{
						value: "酒精",
						label: "酒精",
					}, {
						value: "消毒液",
						label: "消毒液",
					}]
				}, {
					value: 4,
					label: "生活用品",
					children: [{
						value: "洗手液",
						label: "洗手液",
					}, {
						value: "消毒湿巾",
						label: "消毒湿巾",
					}]
				}, {
					value: 5,
					label: "食品",
					children: [{
						value: "饮料",
						label: "饮料",
					}, {
						value: "水",
						label: "水",
					}]
				}],
				// 出库表单
				outForm: {
					ID: '',
					Name: '',
					Photo: '',
					Category: '',
					People: '',
					Unit: '',
					Num: '',
					CreatorID: '',
					Creator: '',
					CreateDate: '',
					UpdateDate: '',
				},
				// 编辑表单
				editForm: {
					ID: '',
					Name: '',
					Photo: '',
					Category: '',
					Num: '',
					Source: '',
					CreatorID: '',
					Creator: '',
					CreateDate: '',
					UpdateDate: '',
				},
				// 添加表单
				addForm: {
					ID: '',
					Name: '',
					Photo: '',
					Category: '',
					Num: '',
					Source: '',
					CreatorID: '',
					Creator: '',
					CreateDate: '',
					UpdateDate: '',
				},
				outDialog: false, //出库弹框
				addDialog: false, //添加弹框
				editDialog: false, //编辑弹框
				currentPage: 1, // 分页
				pagesize: 10, // 分页
				search: '', // 搜索框	
				tableData: [{
					ID: '1',
					Name: '诺仪医用隔离衣',
					Photo: '',
					Category: '防护衣',
					Num: '6套',
					Source: '捐助',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '2',
					Name: '振德医用一次性防护服',
					Photo: '',
					Category: '防护衣',
					Num: '30件',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '3',
					Name: '顺博医用隔离眼罩',
					Photo: '',
					Category: '护目镜',
					Num: '49个',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '4',
					Name: '可孚医用口罩',
					Photo: '',
					Category: '口罩',
					Num: '400袋',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '5',
					Name: '友邦医用外科口罩',
					Photo: '',
					Category: '口罩',
					Num: '700只',
					Source: '捐助',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '6',
					Name: '宏枫医用酒精消毒液',
					Photo: '',
					Category: '酒精',
					Num: '200瓶',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '7',
					Name: '瑶台牌消毒液',
					Photo: '',
					Category: '消毒液',
					Num: '200瓶',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '8',
					Name: '徽歌免洗洗手液',
					Photo: '',
					Category: '洗手液',
					Num: '20瓶',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, {
					ID: '9',
					Name: '十月芯晴酒精湿巾',
					Photo: '',
					Category: '消毒湿巾',
					Num: '200片',
					Source: '库存',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '',
					UpdateDate: '2020-05-12',
				}, ],
				rules: {
					ID: { required: true, message: '不能为空', trigger: 'blur' },
					Name: { required: true, message: '不能为空', trigger: 'blur' },
					Num: { required: true, message: '不能为空', trigger: 'blur' },
					Category: { required: true, message: '不能为空', trigger: 'blur' },
					People: { required: true, message: '不能为空', trigger: 'blur' },
					Unit: { required: true, message: '不能为空', trigger: 'blur' },
				}
			}
		},
		methods: {
			// 级联
			handleChange(value) {
				this.editForm.Category = this.$refs.myCascader.getCheckedNodes()[0].pathLabels[value.length - 1]
				this.addForm.Category = this.$refs.myCascader.getCheckedNodes()[0].pathLabels[value.length - 1]
			},
			// 出库确定
			outSure() {
				this.$refs.outForm.validate((valid) => {
					if (valid) {
						this.$message.success('出库成功')
						this.outDialog = false
					}
				})
			},
			// 出库取消
			outClose() {
				this.outDialog = false
			},
			// 点击出库
			outHandle(index, row) {
				this.outDialog = true
				this.outForm = Object.assign({}, row);
			},
			// 编辑物资确定
			editSure() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$message.success('编辑成功')
						var now = new Date(),
							y = now.getFullYear(),
							m = now.getMonth() + 1,
							d = now.getDate()
						var time = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
						this.editForm.UpdateDate = time
						this.tableData[this.editForm.index] = this.editForm
						this.editDialog = false
					}
				})
			},
			// 编辑物资取消
			editClose() {
				this.editDialog = false
			},
			// 点击编辑
			editHandel(index, row) {
				this.editDialog = true
				this.editForm = Object.assign({}, row);
				this.editForm.index = index
			},
			// 添加物资确定
			addSure() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						var now = new Date(),
							y = now.getFullYear(),
							m = now.getMonth() + 1,
							d = now.getDate()
						var time = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
						this.addForm.UpdateDate = time
						this.addForm.Creator='wrk'
						this.tableData.push({...this.addForm})
						this.$refs['addForm'].resetFields()
						this.addDialog = false
					}
				})
			},
			// 添加物资取消
			addClose() {
				this.$refs['addForm'].resetFields()
				this.addDialog = false
			},
			// 点击添加
			addHandle() {
				this.addDialog = true
			},
			// 分页
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
			},
			// 点击删除
			delHandle(index, row) {
				this.$confirm('此操作将永久删除该物品, 是否继续?', '提示', {
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
		}
	}
</script>

<style lang="scss">
	.materialslist {
		.el-table .blue-row {
			background: aliceblue;
		}

		.block {
			margin-top: 20px;
		}
	}
</style>
