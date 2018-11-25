import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'mint-ui';
import {httpPost} from './assets/common.js'

Vue.use(Vuex)

var state = {	
	openId:'',
	rightsValidity:'',
	timeLength:0,
	addressActive:false,
	grneralSerLen:2
};

const actions = {
	increment:({commit})=>{		
		commit('increment');
	},
	addnum:({commit})=>{
		commit('addnum');
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
	},
	addnum(state){
		if(state.grneralSerLen >= state.timeLength){
			Toast('剩余权限不足');
			return false;
		}
		if(state.grneralSerLen == 10){
			Toast('时长不超过10小时');
			return false;
		}
		state.grneralSerLen++
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
	},
	grneralSerLen(state){
		return state.grneralSerLen
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})