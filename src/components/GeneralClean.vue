<template>
		<div id="content" class="color_back_gray">
			<div class="pb_40 mb_20 color_back_white border-b">
				<div class="f_content">					
					<div class="server flex-wrap flex-horizontal">
						<div class="flex-con"><img src="../assets/images/pic.png" alt=""></div>
						<div class="flex-con">
							<h1 class="color_blue">一般清洁服务</h1>
							<p class="color_gray">为尊贵的您提供专业可靠的家政清洁服务，请尽早预约，便于我们及早规划安排。</p>
						</div>
					</div>
					<p class="mt_50 mb_20 font_28"><span class="color_regu">剩余权限：</span><span class="color_gray">{{timeLength}}</span></p>
					<p class="font_28"><span class="color_regu">权益有效期：</span><span class="color_gray">{{rightsValidity}}</span></p>
					<div class="font_28 mt_40 flex-wrap flex-horizontal flex-align-center">
						<span class="color_regu">
	        				服务时长：
	        			</span>	        			
						<div class="inputbox flex-wrap flex-horizontal">
							<div class="pre flex-wrap flex-justify-center flex-align-center" @click="prenum"><span class="sets">-</span></div>
							<div class="num flex-wrap flex-justify-center flex-align-center"> <span class="sets">{{grneralSerLen}}</span></div>
							<div class="add flex-wrap flex-justify-center flex-align-center" @click="addnum"><span class="sets">+</span></div>
						</div>
					</div>
				</div>
			</div>

			<div class="second mb_20 color_back_white border-b border-t font_28">
				<div class="f_content">
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>日期选择：</span>
						<div class="datay input-b flex-con" @click="openPicker">						
							<input class="input_border font_28 color_regu" type="text"  v-model="pickerdata" placeholder="请选择您需要服务的日期" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div class="flex-wrap flex-horizontal flex-align-center">
						<span>选择时间：</span>
						<div class="datay input-b flex-con" @click="openPickerTime">						
							<input class="input_border font_28 color_regu" type="text" v-model="pickertime" placeholder="上门时间每日早8点到晚18点" />
							<div class="arrowup"><img src="../assets/images/uparrow.png" alt="" /></div>
						</div>
					</div>	
					
					<div>	
						<mt-datetime-picker						 
						  type="date"
						  ref="picker"
						  year-format="{value} 年"
						  month-format="{value} 月"
						  date-format="{value} 日"
						  :startDate="startDate"
						  @confirm="dataConfirm">
						</mt-datetime-picker>	

						  <mt-datetime-picker						 
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

			<div class=" pb_30 mb_20 color_back_white border-bot border-t">

				<div class="address pt_20 pb_30 flex-wrap flex-horizontal flex-justify-between flex-align-center"
				 v-if="addressListLength == 0" @click="setAddress">
					<div class="color_regu">
						<h1 class="name font_28">请设置服务地址</h1>						
					</div>
					<div>
						<img class="addresarrow" src="../assets/images/arrow.png" alt="" />
					</div>
				</div>

				<div class="address pt_40 pb_30 flex-wrap flex-horizontal flex-justify-between flex-align-center" @click="navAddList" v-else>
					<div class="color_regu">
						<h1 class="name font_28"><span>{{addressUserName}}</span><span class="ml_20">{{phone}}</span></h1>
						<h2 class="addre font_28">{{address}}</h2>
					</div>
					<div>
						<img class="addresarrow" src="../assets/images/arrow.png" alt="" />
					</div>
				</div>

				
				
				<div class="meet actived jianBian_blue flex-wrap flex-align-center flex-justify-center" @click="creatOrder"><span>立即预约</span></div>
			</div>

			<div class="pt_40 pb_40 color_back_white border-t">
				<div class="f_content">
					<h1 class="serverdetail">服务说明：</h1>
					<p class="houseserver" style="text-align:justify;">
						家政服务，为尊贵的您提供专业可靠的家政清洁服务和家电清洗服务。家政清洁服务包括墙面、地面、厨房卫生间以及玻璃清洁等，您仅需自行准备相关工具和清洁剂；
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
import { Toast } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex';
	export default {
		data() {
			return {
				startDate:new Date()				
			}
		},
		methods: {
			...mapActions([
			'addnum','prenum'
			]),
			openPicker() {//打开年月日选择器
		        this.$refs.picker.open();
		     },
		     openPickerTime(){//打开时分选择器
		     	this.$refs.pickertime.open();
		     },
		     dataConfirm(val){
				 this.$store.commit('dataConfirm',{pickerdata:val})				
		     },
		     timeConfirm(val){
				 this.$store.commit('timeConfirm',{pickertime:val})	
		     },	    
		    
			setAddress(){
				// 如果地址列表有数据跳转到我的，否则跳转到地址表单页
				if(this.addressListLength > 0){
					this.$router.push({path:'/My',query:{type:1}});	
					this.$store.commit('setAddActive',{addressActive:true});				
				}else{
					this.$router.push({path:'/Addaddress',query:{type:1}});
				}
			},
			navAddList(){
				this.$router.push({path:'/My',query:{type:1}});
				this.$store.commit('setAddActive',{addressActive:true});
			},
			creatOrder(){
				if(!this.pickerdata){
					Toast('请填写预约日期');
					return false;
				}
				if(!this.pickertime){
					Toast('请填写预约时间');
					return false;
				}
				if(this.showSetAddress || !this.address){
					Toast('请设置服务地址');
					return false;
				}
				
				let bar = this.pickerdata.split('-');
				let foo = this.pickertime.split(':');
				let y = Number(bar[0]);
				let m = Number(bar[1])-1;
				let d = Number(bar[2]);
				let h = Number(foo[0]);
				let t = Number(foo[1]);
				console.log(y,m,d,h,t);
				let result = new Date(y,m,d,h,t).getTime();
				console.log(result)			
				let resultTime = this.pickerdata + ' ' + this.pickertime;
				this.$post('/api/sp/order/createOrder',{
					address:this.address,
					appointmentTime:result,
					type:'1',
					userId:this.userId
					// userName:''
				}).then(data=>{
					if(data.errcode == 200){
						Toast('下单成功');
						 this.$router.replace('/Order');
					}
				}).catch(err=>{
						Toast('下单失败')
				})
			}
		   
		},
		
		computed:{
			...mapGetters([
				'timeLength','rightsValidity','grneralSerLen','userId','pickerdata','pickertime'
			])
		},
		created(){
			
		},
		mounted(){
			
		},	
		components: {
			
		},
		props:['addressListLength','addressUserName','phone','address']
	}
</script>

<style scoped>
	#content {width:100%;}	
	#top {height: 0.88rem;line-height: 0.88rem;width: 100%;	position: relative;	}	
	#bottom {background-color: #88D6E9;height: 0.98rem;	line-height: 0.98rem;width: 100%;font-size: 0.28rem;}	
	.f_content,.address {width: 6.7rem;	margin:0 auto;}	
	.server {width: 100%;}	
	.server div:nth-child(1) {width: 3.35rem;height: 2.05rem;}	
	.server div:nth-child(1) img {width: 100%;height: 100%;}	
	.server div:nth-child(2) p {font-size: 0.28rem;	line-height: 0.4rem;text-align: justify;text-indent: 0.54rem;padding-left:0.28rem;}	
	.server div:nth-child(2) h1 {font-size: 0.28rem;line-height: 0.5rem;font-weight: 700;padding-left:0.28rem;}	
	.auth {	margin-top: 0.5rem;	margin-bottom: 0.3rem;}		
	.addre,	.name {	line-height: 0.52rem;}	
	.addresarrow{width:0.33rem;height:0.62rem;}	
	.serverdetail{font-size:0.3rem;font-weight:bolder;color:#333;margin-bottom:0.2rem;}
	.houseserver{line-height:0.38rem;color:#666;font-size:0.28rem;}		
	/*input::-webkit-input-placeholder{color:#999;}*/	
	.border-top,.border-bot{ position:relative; }
	.border-top:before,.border-bot:after{content: ''; position: absolute; left: 0;right:0;background: #ddd;height: 0.02rem;-webkit-transform: scaleY(0.5);transform: scaleY(0.5); }
	.border-bot:after{ bottom:-0.02rem;-webkit-transform-origin: 0 0;transform-origin: 0 0;}
	.border-top:before{top:0;-webkit-transform-origin: 0 0;transform-origin: 0 0;}
</style>