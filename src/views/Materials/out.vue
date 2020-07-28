<template>
	<el-card class="box-card materialsout">
		<div slot="header">
			<span>出库列表</span>
		</div>
		<!-- 筛选表格 -->
		<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))" :row-class-name="tableRowClassName">
			<el-table-column prop="ID" label="编号" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Name" label="名称" sortable :show-overflow-tooltip="true" width="400"></el-table-column>
			<!-- <el-table-column prop="Photo" label="图片" sortable :show-overflow-tooltip="true"></el-table-column> -->
			<el-table-column prop="Category" label="类别" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Num" label="数量" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="People" label="领用人" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Unit" label="领用单位" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="Creator" label="创建者" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="CreateDate" label="创建日期" sortable :show-overflow-tooltip="true"></el-table-column>
			<el-table-column>
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入名称中的关键字搜索" />
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
				currentPage: 1, // 分页
				pagesize: 10, // 分页
				search: '', // 搜索框	
				tableData: [{
					ID: '1',
					Name: '诺仪医用隔离衣',
					Photo: '',
					Category: '防护衣',
					Num: '1套',
					People: '张三',
					Unit: '***单位',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '2020-05-12',
					UpdateDate: '2020-05-12',
				}, {
					ID: '2',
					Name: '振德医用一次性防护服',
					Photo: '',
					Category: '防护衣',
					Num: '3件',
					People: '李四',
					Unit: '***单位',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '2020-05-12',
					UpdateDate: '2020-05-12',
				}, {
					ID: '3',
					Name: '顺博医用隔离眼罩',
					Photo: '',
					Category: '护目镜',
					Num: '4个',
					People: '王五',
					Unit: '***单位',
					CreatorID: '',
					Creator: 'wrk',
					CreateDate: '2020-05-12',
					UpdateDate: '2020-05-12',
				}]
			}
		},
		methods: {
			// 分页
			handleSizeChange: function(size) {
				this.pagesize = size;
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
			},
			// 斑马纹
			tableRowClassName({ row, rowIndex }) {
				if (rowIndex % 2 === 1) {
					return 'blue-row';
				}
				return '';
			}
		}
	}
</script>

<style lang="scss">
	.materialsout {
		.el-table .blue-row {
			background: aliceblue;
		}

		.block {
			margin-top: 20px;
		}
	}
</style>
