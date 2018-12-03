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
	addressActive:false,
	grneralSerLen:2,//一般清洁预约时长
	pickerdata:'',//一般清洁日期
	pickertime:'',//一般清洁时间
	pickerdatas:'',//家电清洁日期
	pickertimes:'',//家电清洁时间
	Project:[],//服务项目数组
	serviceLength:0,//家电预约服务时长
	orderNum:'',//用户订单总数
	addressUserName:'',//服务人
	phone:'',//电话
	address:'',//服务地址
	id:'',//地址id
	addressListLength:''//地址列表数量

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
		console.log(openId)
		state.openId = openId;		
		httpPost('sp/appUser/getUserId',{
			openId:openId
		}).then(data=>{
			console.log('用户标示' + data.data.userId)
			state.userId = data.data.userId;			
			return data.data.userId;
		}).then(data=>{//userId
			return httpPost('sp/appUser/queryUser',{
				id:data
			})
		}).then(data=>{	
			// console.log(data)					
			state.rightsValidity = data.data[0].rightsValidity;
			state.timeLength = data.data[0].timeLength;
			state.bjUserId = data.data[0].bjUserId;
			// console.log('权益有效期' + state.rightsValidity)
			// console.log('剩余权益时长' + state.timeLength)
		})
	},
	setAddActive(state,{addressActive}){//控制地址列表是否可点击		
		state.addressActive = addressActive;		
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
	},
	prenum(state){
		if(state.grneralSerLen == 2) {
			Toast('时长不少于2小时');
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
			if(state.timeLength < 4){
				Toast('剩余权限不足');
				return false;
			}	
	
		 let Project = state.Project;
    //    如果总服务数量已经等于3，返回
      let result = Project.reduce(function(pre, next) {
        return pre + next.num;
			}, 0);
			if(state.timeLength < 8 && result ==1){
				Toast('剩余权限不足');
				return false;
			}
			if(state.timeLength < 10 && result ==2){
				Toast('剩余权限不足');
				return false;
			}
      if (result == 3) {// 选择台数等于3        
        Toast("不能超过3台");
        return false;
      }
    //   否则当前服务项目加1
      for (let i = 0, len = Project.length; i < len; i++) {
        if (Project[i].id == id) {
          Project[i].num++;
        }
      }    
      if (result + 1 < 3) {
        state.serviceLength = (result + 1) * 4;
      } else {
        state.serviceLength = 10;
      }
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
		state.serviceLength = totalnum * 4;
		state.Project = Project;
	},
	setAddLen(state,{addressListLength}){//地址为空addressListLength为0
		state.addressListLength = addressListLength
	},
	setJerAdd(state,{addressUserName,address,phone,id,addressListLength}){//用户有地址设置默认地址
		state.addressUserName = addressUserName;
		state.address = address;
		state.phone = phone;
		state.id = id;
		state.addressListLength = addressListLength;	
	},
	userChioceAdd(state,{addressUserName,address,phone,id}){//用户切换地址
		state.addressUserName = addressUserName;
		state.address = address;
		state.phone = phone;
		state.id = id;
	},
	setRightsValidity(state){
		console.log('qidongle')
			httpPost('sp/appUser/queryUser',{
				id:state.userId
			})
		.then(data=>{	
			console.log(data)						
			state.rightsValidity = data.data[0].rightsValidity;
			state.timeLength = data.data[0].timeLength;
			state.bjUserId = data.data[0].bjUserId;		
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
	addressActive(state){
		return state.addressActive
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
	addressUserName(state){//服务人
		return state.addressUserName
	},
	address(state){//服务地址
		return state.address
	},
	phone(state){//服务电话
		return state.phone
	},
	addressListLength(state){//地址length
		return state.addressListLength
	},
	id(state){//服务地址id
		return state.id
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