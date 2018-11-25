import Vue from 'vue'
import Vuex from 'vuex'
import {httpPost} from './assets/common.js'

Vue.use(Vuex)

var state = {	
	openId:'',
	rightsValidity:'',
	timeLength:'',
	addressActive:false
};

const actions = {
	increment:({commit})=>{		
		commit('increment');
	}
};

const mutations = {
	
	getmsg(state,{openId}){		
		state.openId = openId;
		console.log(state.openId);
		// httpPost('/api/sp/appUser/getUserId',{
		// 	openId:openId
		// }).then(data=>{
		// 	return data.data.userId
		// }).then(data=>{
		// 	return httpPost('/api/sp/appUser/queryUser',{
		// 				id:data
		// 			})
		// }).then(data=>{
		// 	console.log(data.data)			
		// 	this.state.rightsValidity = data.data[0].rightsValidity;
		// 	this.state.timeLength = data.data[0].timeLength;
		// 	console.log(this.state.rightsValidity)
		// })
	},
	setAddActive(state,{addressActive}){		
		state.addressActive = addressActive;
		console.log(state.addressActive)
	}
};

const getters = {	
	timeLength(state){
		return state.timelength
	},
	rightsValidity(state){
		return state.rightsValidity
	},
	addressActive(state){
		return state.addressActive
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})