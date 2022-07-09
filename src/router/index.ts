import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { HomeView } from '@/views/home-view'
import { StartView } from '@/views/start-view'
import { RecordWordsView } from '@/views/record-words-view'
import { ErrorView } from '@/views/error-view'
import { TeamsView } from '@/views/teams-view'
import { ReadyView } from '@/views/ready-view'
import { MoveView } from '@/views/move-view'
import { MoveEndView } from '@/views/move-end-view'
import { StageEndView } from '@/views/stage-end-view'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/start',
		name: 'start',
		component: StartView,
	},
	{
		path: '/record-words/:player',
		name: 'record-words',
		component: RecordWordsView,
	},
	{
		path: '/teams',
		name: 'teams',
		component: TeamsView,
	},
	{
		path: '/ready',
		name: 'ready',
		component: ReadyView,
	},
	{
		path: '/move',
		name: 'move',
		component: MoveView,
	},
	{
		path: '/move-end',
		name: 'move-end',
		component: MoveEndView,
	},
	{
		path: '/stage-end',
		name: 'stage-end',
		component: StageEndView,
	},
	{
		path: '/error',
		name: 'error',
		component: ErrorView,
	},
	{
		path: '*',
		redirect: 'error',
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
