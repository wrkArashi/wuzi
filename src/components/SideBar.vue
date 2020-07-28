<template>
	<div class="sidebar">
		<el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :default-openeds="['1']">
			<el-menu-item index="10">
				<div v-show="show" @click="fold()"><i class="el-icon-s-fold"></i></div>
				<div v-show="cover" @click="unfold()"><i class="el-icon-s-unfold"></i></div>
			</el-menu-item>
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-folder-opened"></i>
					<span>物资管理</span>
				</template>
				<router-link to="/Materials/list">
					<el-menu-item index="1-1">物资列表</el-menu-item>
				</router-link>
				<router-link to="/Materials/out">
					<el-menu-item index="1-2">出库列表</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-user"></i>
					<span>用户管理</span>
				</template>
				<router-link to="/User/list">
					<el-menu-item index="2-1">用户列表</el-menu-item>
				</router-link>
				<router-link to="/User/personal">
					<el-menu-item index="2-2">个人信息</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-office-building"></i>
					<span>架构管理</span>
				</template>
				<router-link to="/Framework/list">
					<el-menu-item index="3-1">物资架构</el-menu-item>
				</router-link>>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				cover: false,
				isCollapse: false,
			}
		},
		methods: {
			fold() {
				this.isCollapse = true
				this.show = false
				this.cover = true
			},
			unfold() {
				this.isCollapse = false
				this.show = true
				this.cover = false
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		.el-menu-item i {
			color: white
		}

		.side-bar .el-menu-item.is-active {
			color: white;
		}

		.el-menu-item.is-active {
			color: rgb(255, 99, 103);
		}

		.el-menu-item:focus,
		.el-menu-item:hover {
			outline: 0;
			background-color: rgb(87, 96, 161);
		}

		.el-menu-item {
			color: white;
			text-align: center;
		}

		a {
			text-decoration: none;
			color: white;
		}

		.el-submenu__title {
			color: white;
		}

		.el-submenu__title i {
			color: white;
		}

		.el-menu {
			border: 0;
			background-color: #434979;

			span {
				margin-right: 75px;
			}
		}

		.el-submenu__title:hover {
			background-color: rgb(87, 96, 161);
		}

	}
</style>
