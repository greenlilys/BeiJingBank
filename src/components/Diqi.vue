<template>
	<div class="dianqi color_back_gray">
		<div class="contentBox border-b color_back_white">
			<div class="content pb_40">			
				<div class="server flex-wrap flex-horizontal">
					<div class="flex-con"><img src="../assets/images/dianqi.png" alt=""></div>
					<div class="flex-con">
						<h1 class="color_blue">家电清洗服务</h1>
						<p class="color_gray">为尊贵的您提供专业可靠的家电清洗服务，请尽早预约，便于我们及早规划安排。</p>
					</div>
				</div>
				
				<p class="mt_50 mb_20 font_28"><span class="color_regu">剩余权限：</span><span class="color_gray">{{timeLength}}</span></p>
				<p class="font_28"><span class="color_regu">权益有效期：</span><span class="color_gray">{{rightsValidity}}</span></p>
				<div class="font_28 mt_40 flex-wrap flex-horizontal mr_20">				
					<div><span class="servertitle color_regu">服务项目：</span></div>
					<div class="flex-wrap flex-vertical">
						<div class="mb_10 flex-wrap flex-horizontal flex-align-center" v-for="(item,index) in Project">
							<span class="color_gray flex-con">{{item.name}}</span>
							<div class="inputbox ml_20 flex-wrap flex-horizontal">
								<div class="pre flex-wrap flex-justify-center flex-align-center" @click="prenum(item.id)"><span class="sets">-</span></div>
								<div class="num flex-wrap flex-justify-center flex-align-center"> <span class="sets">{{item.num}}</span></div>
								<div class="add flex-wrap flex-justify-center flex-align-center" @click="addnum(item.id)"><span class="sets">+</span></div>
							</div>
							
						</div>
						<!-- <div class="mb_10 flex-wrap flex-horizontal flex-align-center"><span class="color_gray flex-con">冰箱</span><Inputnumber class="ml_20"></Inputnumber></div> -->
						<!-- <div class="mt_10 flex-wrap flex-horizontal flex-align-center"><span class="color_gray flex-con">洗衣机</span><Inputnumber class="ml_20"></Inputnumber></div>
						<div class="mt_10 flex-wrap flex-horizontal flex-align-center"><span class="color_gray flex-con">空调</span><Inputnumber class="ml_20"></Inputnumber></div>
						<div class="mt_10 flex-wrap flex-horizontal flex-align-center"><span class="color_gray flex-con">热水器</span><Inputnumber class="ml_20"></Inputnumber></div> -->
						
					</div>				
				</div>
				<p class="mt_40 font_28"><span class="color_regu">服务时常：</span><span class="color_gray"><span style="color:#0099ff;">{{serviceLength}}</span>小时</span></p>
			</div>
		</div>
		
		<div class="border-b w_100 color_back_white mb_20">
			<div class="content" style="color:#ff6600;">
				<p class="font_28 pt_30" style="line-height: 0.5rem;">1、任选1台折合权益时间为4小时</p>
				<p class="font_28" style="line-height: 0.5rem;padding-bottom:0.24rem">2、任选3台折合权益时间为10小时（推荐）</p>
			</div>
		</div>
		
		<div class="second mb_20 color_back_white border-b border-t font_28">
				<div class="f_content">
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>日期选择：</span>
						<div class="datay input-b flex-con" @click="openPicker">						
							<input class="input_border font_28 color_regu" type="text" placeholder="请选择您需要服务的日期" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>选择时间：</span>
						<div class="datay input-b flex-con" @click="openPickerTime">						
							<input class="input_border font_28 color_regu" type="text" placeholder="上门时间每日早8点到晚18点" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div>					
						 <mt-datetime-picker
						  v-model="pickerdata"
						  type="date"
						  ref="picker"
						  year-format="{value} 年"
						  month-format="{value} 月"
						  date-format="{value} 日"
						  :startDate="startDate"
						  @confirm="dataConfirm">
						</mt-datetime-picker>	

						  <mt-datetime-picker
						  v-model="pickertime"
						  type="time"
						  ref="pickertime"
						  hour-format="{value} 时"
						  minute-format="{value} 分"
						  @confirm="timeConfirm"
						  >
						</mt-datetime-picker>					
					</div>
				</div>				
			</div>

	<div class="mb_20 color_back_white border-b border-t pt_40 pb_40">
		<div class="address flex-wrap flex-horizontal flex-justify-between flex-align-center">
			<div class="color_regu">
				<h1 class="name font_28"><span>李明 </span><span>17300130100</span></h1>
				<h2 class="addre font_28">北京市东城区张自忠路15号</h2>
			</div>
			<div>
				<img class="addresarrow" src="../assets/images/arrow.png" alt="" />
			</div>
		</div>

		<div class="meet jianBian_blue flex-wrap flex-align-center flex-justify-center"><span>立即预约</span></div>
	</div>

	<div class="pt_40 pb_40 color_back_white border-t">
		<div class="f_content">
			<h1 class="serverdetail">服务说明：</h1>
			<p class="houseserver" style="text-align:justify;">家政服务，为尊贵的您提供专业可靠的家政清洁服务和家电清洗服务。家政清洁服务包括墙面、地面、厨房卫生间以及玻璃清洁等，您仅需自行准备相关工具和清洁剂；
				家电清洗包括抽油烟机、空调、冰箱、洗衣机等，清洗工携带专用清洁剂和专业工具上门服务，您只需保证水、电正常即可。
			</p>
			<p class="houseserver mt_20" style="text-align:justify;">
				名士卡和私行卡持卡且达标者，作为北京银行高端客户，您可在我行签约的家政公司享受每年10小时免费的家政服务。
			</p>
		</div>
	</div>
</div>
</template>

<script>
	import Inputnumber from './Inputnumber'
	import { Toast } from 'mint-ui';
	export default{		
		data(){
			return{
				pickerdata:'',
				pickertime:'',				
				startDate:new Date(),
				Project:[],
				num1:'',
				serviceLength:0//服务时长
				
			}			
		},
		methods: {
			openPicker() {//打开年月日选择器
		        this.$refs.picker.open();
		     },
		     openPickerTime(){//打开时分选择器
		     	this.$refs.pickertime.open();
		     },
		     dataConfirm(val){//确定年月日
		     	console.log(new Date(val).getTime())
		     },
		     timeConfirm(){//确定时分

		     },
		     //获得服务项目
		     serviceProject(){
		     	this.$post('/api/sp/serviceItem/queryServiceItem',{

		     	}).then(data=>{
		     		let foo = data.data;
		     		for(let i =0,len=foo.length;i<len;i++){
		     			foo[i].num = 0;
		     		}
		     		this.Project = foo;
		     	})
		     },
		     prenum(id){
		     	let Project = this.Project;
		     	for(let i =0,len=Project.length;i<len;i++){
		     		if(Project[i].id == id){
		     			if(Project[i].num == 0){
		     				return false;
		     			}else{
		     				Project[i].num--;
		     			}
		     		}
		     	}
		     	let totalnum = Project.reduce(function(pre,next){
					     		return pre+next.num;
					     	},0);		     	
		     	this.serviceLength = totalnum * 4;		     	
		     	this.Project = Project;
		     },
		     addnum(id){

		     	let Project = this.Project;		     	
		     	let result = Project.reduce(function(pre,next){
					     		return pre+next.num;
					     	},0);
		     	if(result == 3){//选择台数等于3		     		
		     		Toast('不能超过3台');
		     		return false;
		     	}
		     	for(let i =0,len=Project.length;i<len;i++){
		     		if(Project[i].id == id){
		     			Project[i].num++;
		     		}
		     	}
		     	let totalnum = Project.reduce(function(pre,next){
					     		return pre+next.num;
					     	},0);
		     	if(totalnum < 3){
		     		this.serviceLength = totalnum * 4;
		     	}else{
		     		this.serviceLength = 10;
		     	}
		     	
		     	this.Project = Project;
		     },
		     handleChange(val){
		     	
		     },
		     caculateTotal(arr){
		     	let result = arr.reduce(function(pre,next){
					     		return pre+next.num;
					     	},0);
		     	if(result == 3){//选择台数等于3
		     		this.serviceLength = 10;
		     		Toast('不能超过3台');
		     		return false;
		     	}else{
		     		this.serviceLength = result * 4;
		     	}		     	
		     	
		     }
		   
		},
		created(){
			this.serviceProject();
			
		},
		mounted(){

		},
		props:['rightsValidity','lastTime'],
		components:{
			Inputnumber
		}
	}
</script>

<style scoped>
	.dianqi{width:100%;}
	.contentBox{width:100%;}
	.content{width: 6.7rem;	margin: auto;}
	.server {width: 100%;}	
	.server div:nth-child(1) {width: 3.35rem;height: 2.05rem;}	
	.server div:nth-child(1) img {width: 100%;height: 100%;}
	.server div:nth-child(2) p {font-size: 0.28rem;	line-height: 0.4rem;text-align: justify;text-indent: 0.54rem;padding-left:0.28rem;}	
	.server div:nth-child(2) h1 {font-size: 0.28rem;line-height: 0.5rem;font-weight: 700;padding-left:0.28rem;}	
	.servertitle{padding-top:0.16rem;display:block;}
	.mt_10{margin-top:0.1rem;}			
	.f_content,.address {width: 6.7rem;	margin: auto;}		
		
	.addre,	.name {	line-height: 0.52rem;}	
	.addresarrow{width:0.33rem;height:0.62rem;}
	.meet{
		margin:auto;		
		width: 6.7rem;		
		height:0.82rem;
		box-shadow: 0px 0px 8px #a5a5a5;
		color:#fff;
		border-radius:0.1rem;
		margin-top:0.3rem;
		text-align:center;		
	}
	.meet span{font-size:0.6rem;transform: scale(0.5);}
	.serverdetail{font-size:0.3rem;font-weight:bolder;color:#333;margin-bottom:0.2rem;}
	.houseserver{line-height:0.38rem;color:#666;font-size:0.28rem;}
	.inputboxs{width:2rem;height:0.64rem;}
		
	
</style>