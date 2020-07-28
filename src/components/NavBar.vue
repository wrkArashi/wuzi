<template>
	<div class="navbar">
		<div></div>
		<el-menu class="el-menu-demo" mode="horizontal" background-color="white" text-color="black" active-text-color="rgb(255,99,103)">
			<el-submenu index="1">
				<template slot="title">{{name}}</template>
				<router-link to="/user/personal" style="color: #000000;">
					<el-menu-item index="1-2">
						个人信息
					</el-menu-item>
				</router-link>
				<router-link to="/login" style="color: #000000;">
					<el-menu-item index="1-3">
						退出登录
					</el-menu-item>
				</router-link>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: localStorage.Name
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		display: flex;
		justify-content: space-between;
	}
</style>
