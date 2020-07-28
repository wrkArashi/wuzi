import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout.vue'

Vue.use(Router)
let router = new Router({
	routes: [{
		path: '/login',
		alias: '/',
		name: 'login',
		component: () => import('../views/Login.vue')
	}, {
		path: '/materials/',
		name: 'Materials',
		component: () => import("@/components/Layout.vue"),
		children: [{
			path: 'list',
			name: 'MaterialsList',
			component: () => import('../views/Materials/list.vue'),
		},{
			path: 'out',
			name: 'MaterialsOut',
			component: () => import('../views/Materials/out.vue'),
		}]
	}, {
		path: '/user/',
		name: 'User',
		component: () => import("@/components/Layout.vue"),
		children: [{
			path: 'list',
			name: 'UserList',
			component: () => import('../views/User/list.vue'),
		}, {
			path: 'personal',
			name: 'UserPersonal',
			component: () => import('../views/User/personal.vue'),
		}]
	}, {
		path: '/framework/',
		name: 'Framework',
		component: () => import("@/components/Layout.vue"),
		children: [{
			path: 'list',
			name: 'FrameworkList',
			component: () => import('../views/Framework/list.vue'),
		}]
	}]
});
export default router
