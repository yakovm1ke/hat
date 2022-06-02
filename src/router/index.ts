import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { HomeView } from '@/views/home-view'
import { StartView } from '@/views/start-view'
import { InputWordsView } from '@/views/input-words-view'
import { ErrorView } from '@/views/error-view'
import { TeamsView } from '@/views/teams-view'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/start',
		name: 'start',
		component: StartView
	},
	{
		path: '/input-words',
		name: 'input-words',
		component: InputWordsView
	},
	{
		path: '/teams',
		name: 'teams',
		component: TeamsView
	},
	{
		path: '/error',
		name: 'error',
		component: ErrorView
	},
	// {
	// 	path: '/about',
	// 	name: 'about',
	// route level code-splitting
	// this generates a separate chunk (about.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	// component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	// }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
