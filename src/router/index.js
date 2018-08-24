import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Battery from '@/components/Battery'
import Story from '@/components/Story'
import Load from '@/components/Load'
import Contant from '@/components/Contant'

Vue.use(Router)

export default new Router({
	
	routes: [
		{
			path: '/',	
			redirect: '/Home'		
	
		},
		{
			path:'/Home',
			component: Main,
			children:[
				{
					path:'',
					component:Home
				},
				{
					path:'Battery',
					component:Battery
				},
				{
					path:'Load',
					component:Load
					
				},
				{
					path:'Story',
					component:Story
					
				},
				{
					path:'Contant',
					component:Contant
					
				}
			]
	
		}
	]
})