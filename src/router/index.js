import Vue from 'vue'
import Router from 'vue-router'

import Order from '@/components/Order'
import My from '@/components/My'
import Orderdetail from '@/components/Orderdetail'
import Addaddress from '@/components/Addaddress'

import Home from '@/components/Home'
import GeneralClean from '@/components/GeneralClean'
import Diqi from '@/components/Diqi'
Vue.use(Router)

export default new Router({
	// mode:history,
	routes: [
		{
			path: '/',	
			redirect: '/Home'		
	
		},
		{
			name:'Home',
			path:'/Home',
			component:Home
		},
		{
			name:'Order',
			path:'/Order',
			component:Order
		},
		{
			name:'My',
			path:'/My',
			component:My
		},
		{
			name:'Orderdetail',
			path:'/Orderdetail',
			component:Orderdetail
		},
		{
			name:'Addaddress',
			path:'/Addaddress',
			component:Addaddress
		}
		
	]
})