import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'mint-ui';
import {httpPost} from './assets/common.js'

Vue.use(Vuex)

var state = {	
	openId:'',
	userId:'',
	rightsValidity:'',//权益有效期
	timeLength:0,//剩余权益时长
	bjUserId:0,//权益码	
	grneralSerLen:3,//一般清洁预约时长
	pickerdata:'',//一般清洁日期
	pickertime:'',//一般清洁时间
	pickerdatas:'',//家电清洁日期
	pickertimes:'',//家电清洁时间
	Project:[],//服务项目数组
	serviceLength:0,//家电预约服务时长
	orderNum:'',//用户订单总数	
	

};

const actions = {
	addnum:({commit})=>{
		commit('addnum');
	},
	prenum:({commit})=>{
		commit('prenum')
	},
	dataConfirm:({commit})=>{
		commit('dataConfirm')
	},
	serviceProject:({commit})=>{//触发获取服务项目列表
		commit('serviceProject')
	},
	prenums:({commit})=>{
		commit('prenums')
	}
};

const mutations = {	
	getmsg(state,{openId}){		
		// console.log(openId)
		state.openId = openId;		
		httpPost('sp/appUser/getUserId',{
			openId:openId
		}).then(data=>{	
			// console.log(data)	
			// console.log('用户标示' + data.data.userId)
			state.rightsValidity = data.data.rightsValidity;
			state.timeLength = data.data.rightsNum;
			state.bjUserId = data.data.consumerId;					
			state.userId = data.data.userId;
		})		
	},
	
	addnum(state){
		if(state.grneralSerLen >= state.timeLength){
			Toast('剩余权限不足');
			return false;
		}		
		state.grneralSerLen++
	},
	prenum(state){
		if(state.grneralSerLen == 3) {
			Toast('时长不少于3小时');
			return false;
		}
		state.grneralSerLen--;
	},
	dataConfirm(state,{pickerdata}){
		 let dataTime = new Date(pickerdata);
				 let y = dataTime.getFullYear();
				 let m = dataTime.getMonth() + 1;
				 let d = dataTime.getDate();
				 let setzero = function(str){
					 return str < 10 ? '0' + str : str;
				 }
				 let result = y + '-' +setzero(m) + '-' + setzero(d);
				 state.pickerdata = result;					
	},
	timeConfirm(state,{pickertime}){		 
				 state.pickertime = pickertime;				
	},
	dataConfirms(state,{pickerdatas}){//家电清洁日期计算
		let dataTime = new Date(pickerdatas);
				 let y = dataTime.getFullYear();
				 let m = dataTime.getMonth() + 1;
				 let d = dataTime.getDate();
				 let setzero = function(str){
					 return str < 10 ? '0' + str : str;
				 }
				 let result = y + '-' +setzero(m) + '-' + setzero(d);
				 state.pickerdatas = result;	
	},
	timeConfirms(state,{pickertimes}){//家电清洁时间计算		
			state.pickertimes = pickertimes;		 	 
	},
	//获得服务项目列表，每个列表对象增加计数属性num，初始值为0
	serviceProject(state){
		console.log('success')		
		httpPost("sp/serviceItem/queryServiceItem", {}).then(data => {
			    let foo = data.data;
			    for (let i = 0, len = foo.length; i < len; i++) {
			      foo[i].num = 0;
			    }
			    state.Project = foo;
			  });
	},
	addnums(state,{id}){	
		 let Project = state.Project;
		 //计算服务项目    
      		 let result = Project.reduce(function(pre, next) {
        	 		return pre + next.num;
			}, 0) || 0;
		if(state.timeLength < (result+1) * 10){
			Toast('剩余权限不足');
			return false;
		}
    		//   否则当前服务项目加1
		for (let i = 0, len = Project.length; i < len; i++) {
			if (Project[i].id == id) {
			Project[i].num++;
			}
		}    
		state.serviceLength = (result+1) * 10;		
     	        state.Project = Project;
	},
	prenums(state,{id}){
		let Project = state.Project;
		//  如果当前项目num为0，返回，否则减1
		for (let i = 0, len = Project.length; i < len; i++) {
		  if (Project[i].id == id) {
			if (Project[i].num == 0) {
			  return false;
			} else {
			  Project[i].num--;
			}
		  }
		}
		//  重新计算总服务数量，服务时长
		let totalnum = Project.reduce(function(pre, next) {
		  return pre + next.num;
		}, 0);
		state.serviceLength = totalnum * 10;
		state.Project = Project;
	},
	
	userChioceAdd(state,{addressUserName,address,phone,id}){//用户切换地址
		state.addressUserName = addressUserName;
		state.address = address;
		state.phone = phone;
		state.id = id;
	},
	setRightsValidity(state){//订单创建成功或者取消订单，重新获取用户剩余权限	
			httpPost('sp/appUser/getUserId',{
				openId:state.openId
			})
		.then(data=>{									
			state.rightsValidity = data.data.rightsValidity;
			state.timeLength = data.data.rightsNum;
			state.bjUserId = data.data.consumerId;		
		})		
	}
};

const getters = {	
	timeLength(state){//剩余权益时长
		return state.timeLength
	},
	rightsValidity(state){//权益有效期
		return state.rightsValidity
	},
	
	grneralSerLen(state){//一般清洁服务时长
		return state.grneralSerLen
	},
	userId(state){//用户userId
		return state.userId
	},
	bjUserId(state){//用户权益码
		return state.bjUserId
	},
	pickerdata(state){//一般清洁预约日期
		return state.pickerdata
	},
	pickertime(state){//一般清洁预约时间
		return state.pickertime
	},
	pickerdatas(state){//家电清洁预约日期
		return state.pickerdatas
	},
	pickertimes(state){//家电清洁预约时间
		return state.pickertimes
	},
	Project(state){//家电清洁服务项目列表
		// console.log(JSON.stringify(state.Project))
		return state.Project
	},
	serviceLength(state){//家电预约选择服务时长
		return state.serviceLength
	},	
	appointmentTimeLength(state){//一般清洁时长
		return state.grneralSerLen
	},
	serviceLength(state){//家电清洁时长
		return state.serviceLength
	}

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})