<template>
	<el-card class="frameworklist">
		<div slot="header" class="clearfix">
			<span>物资架构</span>
		</div>
		<el-tree :data="data">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span> {{ node.label }}</span>
				<span>
					<el-button style="margin-right: 10px;" type="text" size="mini" @click.stop="() => openEditModal(node,data)" icon="el-icon-edit">
						编辑
					</el-button>
					<el-button style="margin-right: 10px;" type="text" size="mini" @click.stop="() => openAddModal(node,data)" icon="el-icon-plus">
						添加下级
					</el-button>
					<el-button type="text" size="mini" @click.stop="() => remove(node, data)" icon="el-icon-delete">
						删除
					</el-button>
				</span>
			</span>
		</el-tree>
		<!-- 添加节点 -->
		<el-dialog title="添加下级" :visible.sync="addModal" :show-close='false' :closeOnClickModal='false'>
			<el-form :model="addForm" :rules="rules" ref="addForm">
				<el-form-item label="名称" prop="label">
					<el-input v-model="addForm.label"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeAddModal">取 消</el-button>
				<el-button type="primary" @click="addFormCom">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑节点 -->
		<el-dialog title="编辑名称" :visible.sync="editModal" :show-close='false' :closeOnClickModal='false'>
			<el-form :model="editForm" :rules="rules" ref="editForm">
				<el-form-item label="名称" prop="label">
					<el-input v-model="editForm.label"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeEditModal">取 消</el-button>
				<el-button type="primary" @click="editFormCom">完 成</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				Name: "",
				ID: 20,
				nodeData: "",
				nodeData1: "",
				// 添加节点
				addModal: false,
				addForm: {
					id: "",
					label: "",
				},
				// 编辑节点
				editModal: false,
				editForm: {
					id: "",
					label: "",
				},
				data: [{
					id: 1,
					label: "防护用品",
					children: [{
						id: 6,
						label: "防护衣",
					}, {
						id: 7,
						label: "护目镜",
					}, {
						id: 8,
						label: "口罩",
					}]
				}, {
					id: 2,
					label: "药品",
					children: []
				}, {
					id: 3,
					label: "消毒用品",
					children: [{
						id: 9,
						label: "酒精",
					}, {
						id: 10,
						label: "消毒液",
					}]
				}, {
					id: 4,
					label: "生活用品",
					children: [{
						id: 11,
						label: "洗手液",
					}, {
						id: 12,
						label: "消毒湿巾",
					}]
				}, {
					id: 5,
					label: "食品",
					children: [{
						id: 13,
						label: "饮料",
					}, {
						id: 14,
						label: "水",
					}]
				}],
				rules: {
					label: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
					]
				}
			}
		},
		methods: {
			// 删除节点
			remove(node, data) {
				let num = (node.childNodes.length)
				// // 未判定子节点
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (num > 0) {
						this.$message.info("请先清空子级")
					} else {
						node.remove();
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			// 编辑节点
			openEditModal(node, data) {
				this.editModal = true
				this.editForm = data
				this.Name = data.label
			},
			closeEditModal() {
				this.editModal = false
				this.editForm.label = this.Name
			},
			editFormCom() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.editModal = false
					}
				})
			},
			// 添加节点
			openAddModal(node, data) {
				this.addModal = true
				this.nodeData = data
			},
			closeAddModal() {
				this.addModal = false
				this.addForm.label = ''
			},
			addFormCom() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.ID = this.ID + 1
						this.addForm.id = this.ID
						if (!this.nodeData.children) {
							this.$set(this.nodeData, 'children', [])
						}
						this.nodeData.children.push({ ...this.addForm })
						this.addModal = false
						this.addForm.label = ""
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.frameworklist {
		.custom-tree-node {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
		}
	}
</style>
